import sql from 'better-sqlite3'
import xss from 'xss'
import slugify from 'slugify'
import { v4 as uuidv4 } from 'uuid'
import { S3 } from '@aws-sdk/client-s3'

import { Meal } from '@/types/meal.type'

const s3 = new S3({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

const db = sql('meals.db')

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return db.prepare('SELECT * FROM meals').all() as Meal[]
}

export async function getMeal(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal
}

export async function saveMeal(meal: Omit<Meal, 'id' | 'image' | 'slug'> & { image: File }) {
  const { title, summary, instructions, image, creator, creator_email } = meal

  meal.instructions = xss(meal.instructions)
  const slug = `${slugify(meal.title, { lower: true, strict: true })}-${uuidv4()}`

  const extension = image.name.split('.').pop()
  const fileName = `${slug}.${extension}`

  const bufferedImage = await image.arrayBuffer()

  await s3.putObject({
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
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
  ).run({ title, summary, instructions, creator, creator_email, slug, image: fileName })
}
