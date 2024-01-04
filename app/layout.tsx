import { ReactNode } from 'react'
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
