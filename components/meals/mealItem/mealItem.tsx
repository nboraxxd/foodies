import Link from 'next/link'
import Image from 'next/image'

import classes from './mealItem.module.css'
import { Meal } from '@/types/meal.type'

export default function MealItem({ creator, image, slug, summary, title }: Omit<Meal, 'id'>) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
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
