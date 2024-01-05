import sql from 'better-sqlite3'
import { Meal } from '@/types/meal.type'

const db = sql('meals.db')

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return db.prepare('SELECT * FROM meals').all() as Meal[]
}

export async function getMeal(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal
}
