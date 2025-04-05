import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'event manage',
  description: 'event manage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
