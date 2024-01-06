'use server'

import slugify from 'slugify'
import { Meal } from '@/types/meal.type'

export async function shareMeal(formData: FormData) {
  const meal: Omit<Meal, 'id'> = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as string,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
    slug: slugify(formData.get('title') as string, { lower: true }),
  }

  console.log('🔥 ~ shareMeal ~ meal:', meal)
}
