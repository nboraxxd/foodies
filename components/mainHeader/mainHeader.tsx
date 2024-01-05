import Image from 'next/image'
import Link from 'next/link'

import classes from './mainHeader.module.css'
import logoImg from '@/assets/logo.png'
import { NavLink } from '@/components/mainHeader'

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <Image priority src={logoImg} alt="A plate with food on it" />
        <span>NextLevel Food</span>
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink href="/meals">Browse Meals</NavLink>
          </li>
          <li>
            <NavLink href="/community">Foodies Community</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
