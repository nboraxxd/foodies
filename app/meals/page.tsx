import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

import { getMeals } from '@/lib/meals'
import { MealsGrid } from '@/components/meals'
import classes from './page.module.css'

export default async function MealsPage() {
  const meals = await getMeals()

  return (
    <>
      <header className={classes.header}>
        <h1>
          <Balancer>
            Delicious meals, created <span className={classes.highlight}>by you</span>
          </Balancer>
        </h1>
        <p>
          <Balancer>Choose your favorite recipe and cook it yourself. It is easy and fun</Balancer>
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  )
}
