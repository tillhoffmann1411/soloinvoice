import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/ui/header';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main className="py-16 dark:bg-black min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
