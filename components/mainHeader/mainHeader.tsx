import Image from 'next/image'
import Link from 'next/link'

import classes from './mainHeader.module.css'
import logoImg from '@/assets/logo.png'

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <Image  priority src={logoImg} alt="A plate with food on it" />
        <span>Foodies</span>
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>
          <li>
            <Link href="/community">Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
