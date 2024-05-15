import { z } from 'zod'

const envVars = z.object({
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: z.string()
})

const validationResult = envVars.safeParse(process.env)
if (!validationResult.success) {
  console.log(validationResult.error.flatten().fieldErrors)
  throw new Error('validate env failed')
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}
