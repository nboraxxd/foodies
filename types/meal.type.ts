import { ObjectId } from "mongodb"

export type Meal = {
  _id: ObjectId
  title: string
  slug: string
  image: string
  summary: string
  instructions: string
  creator: string
  creator_email: string
}
