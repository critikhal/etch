import type { Metadata } from 'next'
import { League_Spartan } from 'next/font/google'
import './globals.css'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
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
    <html lang="en" className={leagueSpartan.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
