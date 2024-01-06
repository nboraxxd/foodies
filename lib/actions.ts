'use server'

import slugify from 'slugify'
import { Meal } from '@/types/meal.type'
import { saveMeal } from '@/lib/meals'
import { redirect } from 'next/navigation'

export async function shareMeal(formData: FormData) {
  const meal: Omit<Meal, 'id' | 'image'> & { image: File } = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
    slug: slugify(formData.get('title') as string, { lower: true }),
  }

  await saveMeal(meal)
  redirect('/meals')
}
