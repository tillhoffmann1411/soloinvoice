import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './ui/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://soloinvoice.com'),
  title: 'Solo Invoice',
  description: 'Free invoice generator for freelancers',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solo-invoice.vercel.app/',
    siteName: 'Solo Invoice',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
