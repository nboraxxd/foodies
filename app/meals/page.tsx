import Link from 'next/link'

import { MealsGrid } from '@/components/meals'
import classes from './page.module.css'
import Balancer from 'react-wrap-balancer'

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          <Balancer>
            Delicious meals, created <span className={classes.highlight}>by you</span>
          </Balancer>
        </h1>
        <p>
        Choose your favorite recipe and cook it yourself. It is easy and fun
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={[]} />
      </main>
    </>
  )
}
