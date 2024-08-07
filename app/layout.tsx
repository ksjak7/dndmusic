import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  metadataBase: new URL('https://postgres-starter.vercel.app'),
  title: 'D&D Music',
  description:
    '',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <main className="relative flex min-h-screen flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
