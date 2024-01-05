import { ReactNode } from 'react'
import type { Metadata } from 'next'

import { MainHeaderBg, MainHeader } from '@/components/mainHeader'
import './globals.css'

export const metadata: Metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MainHeaderBg />
        <MainHeader />
        {children}
      </body>
    </html>
  )
}
