import Link from 'next/link'
import Image from 'next/image'

import { Meal } from '@/types/meal.type'
import classes from './mealItem.module.css'

export default function MealItem({ creator, image, slug, summary, title }: Omit<Meal, '_id'>) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={`https://next-level-food-singapore-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/${image}`} alt={title} fill sizes='auto' />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  )
}
