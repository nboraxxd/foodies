import { ReactNode } from 'react'
import type { Metadata } from 'next'

import { MainHeaderBg } from '@/components/mainHeaderBg'
import { MainHeader } from '@/components/mainHeader'
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
