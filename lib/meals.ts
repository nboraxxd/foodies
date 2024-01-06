import fs from 'node:fs'
import sql from 'better-sqlite3'
import xss from 'xss'
import { v4 as uuidv4 } from 'uuid'

import { Meal } from '@/types/meal.type'

const db = sql('meals.db')

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return db.prepare('SELECT * FROM meals').all() as Meal[]
}

export async function getMeal(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal
}

export async function saveMeal(meal: Omit<Meal, 'id' | 'image'> & { image: File }) {
  const { title, summary, instructions, image, creator, creator_email, slug } = meal

  meal.instructions = xss(meal.instructions)

  const extension = image.name.split('.').pop()
  const fileName = `${meal.slug}-${uuidv4()}.${extension}`

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferedImage = await image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error(`Saving image failed: ${err.message}`)
    }
  })

  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @image,
      @creator,
      @creator_email,
      @slug
    )
  `
  ).run({ title, summary, instructions, creator, creator_email, slug, image: `/images/${fileName}` })
}
