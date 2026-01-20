import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My CV Maker',
  description: 'Create your CV',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
