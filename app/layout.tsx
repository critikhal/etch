import type { Metadata } from 'next'
import { League_Spartan, Baloo_2 } from 'next/font/google'
import './globals.css'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
  display: 'swap',
})

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-baloo-2',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Etch - Turn posts into real places',
  description: 'Discover and share places with Etch. Import from social apps, create curated lists, and find where to go next.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${baloo2.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
