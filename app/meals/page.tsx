import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { getMeals } from '@/lib/meals'
import MealsLoading from '@/app/meals/mealsLoading'
import { MealsGrid } from '@/components/meals'
import classes from './page.module.css'

async function FetchMeals() {
  const meals = await getMeals()

  if (!meals) {
    return notFound()
  }

  return <MealsGrid meals={meals} />
}

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
          <Balancer>Choose your favorite recipe and cook it yourself. It is easy and fun</Balancer>
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealsLoading />}>
          <FetchMeals />
        </Suspense>
      </main>
    </>
  )
}
