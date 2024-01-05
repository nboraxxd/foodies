'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import classes from './navLink.module.css'

type Props = {
  href: string
  children: ReactNode
}

export default function NavLink({ children, href }: Props) {
  const path = usePathname()

  return (
    <Link href={href} className={clsx(classes.navLink, { [classes.active]: path.startsWith(href) })}>
      {children}
    </Link>
  )
}
