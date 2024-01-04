import Image from 'next/image'
import Link from 'next/link'

import logoImg from '@/assets/logo.png'

export default function MainHeader() {
  return (
    <header>
      <Link href="/" style={{ position: 'relative' }}>
        <Image src={logoImg.src} fill sizes="30px" alt="A plate with food on it" />
        Foodies
      </Link>

      <nav>
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
