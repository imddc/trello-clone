'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { db } from '~/lib/db'

export type State = {
  errors?: {
    title?: string[]
  }
  message?: string | null
}

const createBoard = z.object({
  title: z.string().min(3)
})

export const create = async (prevState: State, formData: FormData) => {
  const validateFields = createBoard.safeParse({
    title: formData.get('title')
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors
    }
  }
  const { title } = validateFields.data

  try {
    await db.board.create({
      data: {
        title
      }
    })
  } catch (error) {
    return {
      message: 'DataBase Error'
    }
  }

  revalidatePath('/organization/org_2gS7xiPBJfQs3WOHdLCIYQYqtt7')
  redirect('/organization/org_2gS7xiPBJfQs3WOHdLCIYQYqtt7')
}
