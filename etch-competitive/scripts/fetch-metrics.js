import "dotenv/config";
import { ApifyClient } from "apify-client";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SNAPSHOTS_PATH = join(__dirname, "../src/data/snapshots.json");

const token = process.env.APIFY_TOKEN;
if (!token || token === "your_token_here") {
  console.error("Missing APIFY_TOKEN in .env file");
  process.exit(1);
}

const client = new ApifyClient({ token });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract Instagram username from URL like https://www.instagram.com/thecornerapp/ */
function igUsername(url) {
  if (!url) return null;
  const m = url.match(/instagram\.com\/([^/?]+)/);
  return m ? m[1] : null;
}

/** Extract TikTok username from URL like https://www.tiktok.com/@thecornerapp */
function tiktokUsername(url) {
  if (!url) return null;
  const m = url.match(/tiktok\.com\/@?([^/?]+)/);
  return m ? m[1] : null;
}

/** Format a raw number into the same style used in snapshots: "78K", "3M", "4,289" */
function formatCount(n) {
  if (n == null) return null;
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return m % 1 === 0 ? `${m}M` : `${parseFloat(m.toFixed(1))}M`;
  }
  if (n >= 10_000) {
    const k = n / 1000;
    return k % 1 === 0 ? `${k}K` : `${parseFloat(k.toFixed(1))}K`;
  }
  return n.toLocaleString("en-US");
}

/** Parse a formatted string like "78K" or "3M" or "4,289" back to a number */
function parseCount(s) {
  if (!s || s === "—" || s === "New" || s === "N/A") return null;
  const clean = String(s).replace(/[~,]/g, "").trim();
  if (clean.endsWith("M")) return parseFloat(clean) * 1_000_000;
  if (clean.endsWith("K")) return parseFloat(clean) * 1000;
  return parseFloat(clean) || null;
}

/** Determine signal level based on percent change */
function signalLevel(oldVal, newVal) {
  if (oldVal == null || newVal == null || oldVal === 0) return "low";
  const pct = Math.abs((newVal - oldVal) / oldVal) * 100;
  if (pct >= 15) return "high";
  if (pct >= 5) return "medium";
  return "low";
}

// ---------------------------------------------------------------------------
// Scraping
// ---------------------------------------------------------------------------

async function scrapeInstagram(usernames) {
  console.log(`\nScraping ${usernames.length} Instagram profiles...`);
  const run = await client.actor("apify/instagram-profile-scraper").call({
    usernames,
  });
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  // Build a map of username -> followerCount
  const map = {};
  for (const item of items) {
    const uname = (item.username || "").toLowerCase();
    const count = item.followersCount ?? item.followerCount ?? item.followers;
    if (uname && count != null) map[uname] = count;
  }
  console.log(`  Got data for ${Object.keys(map).length} profiles`);
  return map;
}

async function scrapeTikTok(usernames) {
  console.log(`Scraping ${usernames.length} TikTok profiles...`);
  const run = await client.actor("clockworks/tiktok-profile-scraper").call({
    profiles: usernames.map((u) => `https://www.tiktok.com/@${u}`),
    resultsPerPage: 1, // minimum allowed — we only need profile info
  });
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  const map = {};
  for (const item of items) {
    const uname = (
      item.uniqueId ||
      item.authorMeta?.name ||
      item.username ||
      ""
    ).toLowerCase();
    const count =
      item.fans ??
      item.followers ??
      item.followerCount ??
      item.authorMeta?.fans;
    if (uname && count != null) map[uname] = count;
  }
  console.log(`  Got data for ${Object.keys(map).length} profiles`);
  return map;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Etch Competitive — Fetch Metrics via Apify\n");

  // Read current snapshots
  const file = JSON.parse(readFileSync(SNAPSHOTS_PATH, "utf-8"));
  const latest = file.snapshots[file.snapshots.length - 1];
  console.log(`Latest snapshot: ${latest.date} (${latest.label})`);

  // Collect usernames to scrape
  const igMap = {}; // competitor id -> ig username
  const ttMap = {}; // competitor id -> tiktok username
  for (const comp of latest.data) {
    const ig = igUsername(comp.igUrl);
    if (ig) igMap[comp.id] = ig;
    const tt = tiktokUsername(comp.tiktokUrl);
    if (tt) ttMap[comp.id] = tt;
  }

  // Scrape both platforms in parallel
  const [igResults, ttResults] = await Promise.all([
    scrapeInstagram(Object.values(igMap)),
    scrapeTikTok(Object.values(ttMap)),
  ]);

  // Build new snapshot
  const today = new Date().toISOString().slice(0, 10);
  const changes = [];
  const newData = latest.data.map((comp) => {
    const updated = { ...comp };

    // Update Instagram
    const igUser = igMap[comp.id]?.toLowerCase();
    if (igUser && igResults[igUser] != null) {
      const oldNum = parseCount(comp.ig);
      const newNum = igResults[igUser];
      updated.ig = formatCount(newNum);
      if (oldNum != null && oldNum !== newNum) {
        const pctChange = (((newNum - oldNum) / oldNum) * 100).toFixed(1);
        const direction = newNum > oldNum ? "+" : "";
        changes.push({
          id: comp.id,
          field: "ig",
          signal: signalLevel(oldNum, newNum),
          context: `Instagram followers: ${comp.ig} -> ${updated.ig} (${direction}${pctChange}%)`,
          sources: [{ label: "Instagram", url: comp.igUrl }],
        });
      }
    }

    // Update TikTok
    const ttUser = ttMap[comp.id]?.toLowerCase();
    if (ttUser && ttResults[ttUser] != null) {
      const oldNum = parseCount(comp.tiktok);
      const newNum = ttResults[ttUser];
      updated.tiktok = formatCount(newNum);
      if (oldNum != null && oldNum !== newNum) {
        const pctChange = (((newNum - oldNum) / oldNum) * 100).toFixed(1);
        const direction = newNum > oldNum ? "+" : "";
        changes.push({
          id: comp.id,
          field: "tiktok",
          signal: signalLevel(oldNum, newNum),
          context: `TikTok followers: ${comp.tiktok} -> ${updated.tiktok} (${direction}${pctChange}%)`,
          sources: [{ label: "TikTok", url: comp.tiktokUrl }],
        });
      }
    }

    return updated;
  });

  // Print summary table
  console.log("\n=== CHANGES DETECTED ===\n");
  if (changes.length === 0) {
    console.log("  No changes detected.");
  } else {
    for (const c of changes) {
      const comp = latest.data.find((d) => d.id === c.id);
      const icon =
        c.signal === "high" ? "!!!" : c.signal === "medium" ? " ! " : "   ";
      console.log(`  [${icon}] ${comp.name}: ${c.context}`);
    }
  }

  // Append new snapshot
  const newSnapshot = {
    date: today,
    label: "Apify automated refresh",
    changes: changes.length > 0 ? changes : undefined,
    data: newData,
  };
  file.snapshots.push(newSnapshot);
  writeFileSync(SNAPSHOTS_PATH, JSON.stringify(file, null, 2) + "\n");

  console.log(`\nNew snapshot "${today}" written to snapshots.json`);
  console.log(
    `Total snapshots: ${file.snapshots.length} | Changes: ${changes.length}`
  );
}

main().catch((err) => {
  console.error("Fatal error:", err.message || err);
  process.exit(1);
});
