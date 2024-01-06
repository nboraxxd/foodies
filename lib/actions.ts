'use server'

import slugify from 'slugify'
import { Meal } from '@/types/meal.type'
import { saveMeal } from '@/lib/meals'
import { redirect } from 'next/navigation'

function isInvalidText(text: string): boolean {
  return !text || text.trim().length === 0
}

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

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    throw new Error('Invalid input')
  }

  await saveMeal(meal)
  redirect('/meals')
}
