import { MongoClient, ObjectId } from 'mongodb'
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

export async function getMeals() {
  let client

  try {
    client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.z6qx1gj.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    )
  } catch (error) {
    console.log('connection to db error!')
  }

  if (client) {
    const database = client.db()
    const meals = database.collection<Meal>('meals')
    const mealsArray = await meals.find().toArray()

    return mealsArray
  }
}

export async function getMeal(slug: string) {
  let client

  try {
    client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.z6qx1gj.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    )
  } catch (error) {
    console.log('connection to db error!')
  }

  if (client) {
    const database = client.db()
    const meals = database.collection<Meal>('meals')
    const meal = await meals.find({ slug }).next()

    return meal
  }
}

export async function saveMeal(meal: Omit<Meal, '_id' | 'image' | 'slug'> & { image: File }) {
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

  let client

  try {
    client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.z6qx1gj.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    )
  } catch (error) {
    console.log('connection to db error!')
  }

  if (client) {
    const database = client.db()
    const meals = database.collection<Meal>('meals')

    try {
      await meals.insertOne({
        _id: new ObjectId(),
        title,
        summary,
        instructions,
        slug,
        creator,
        creator_email,
        image: fileName,
      })

      client.close()
    } catch (error) {
      client.close()
      console.log('error saving meal!')
    }
  }
}
