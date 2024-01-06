import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { notFound } from 'next/navigation'

import { getMeal } from '@/lib/meals'
import classes from './page.module.css'

type Props = {
  params: {
    mealSlug: string
  }
}

export default async function MealPage({ params: { mealSlug } }: Props) {
  const meal = await getMeal(mealSlug)

  if (!meal) {
    return notFound()
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />')

  return (
    <h1>
      hello world
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            fill
            src={`https://next-level-food-singapore-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/${meal.image}`}
            alt={meal.title}
            sizes="auto"
          />
        </div>
        <div className={classes.headerText}>
          <h1>
            <Balancer>{meal.title}</Balancer>
          </h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      {/* <main className={classes.recipe}>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        />
      </main> */}
    </h1>
  )
}
