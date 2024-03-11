import { Meal } from '@/types/meal.type'
import classes from './mealsGrid.module.css'
import { MealItem } from '@/components/meals'

type Props = {
  meals: Meal[]
}

export default function MealsGrid({ meals }: Props) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => {
        const { _id, ...rest } = meal
        return (
          <li key={_id.toString()}>
            <MealItem {...rest} />
          </li>
        )
      })}
    </ul>
  )
}
