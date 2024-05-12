import payload from 'payload'
import dotenv from 'dotenv'
import path from 'path'
import buildConfig from '../payload.config'

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

console.log('process.env.DATABASE_URI :>> ', process.env.DATABASE_URI)

if (!process.env.DATABASE_URI) {
  throw new Error('DATABASE_URI environment variable is missing')
}
if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET environment variable is missing')
}

export const seed = async (): Promise<void> => {
  await payload.init({
    config: buildConfig,
  })

  // create admin
  const user = await payload.create({
    collection: 'users',
    data: {
      email: 'test@manyana.io',
      password: 'Password1!',
      role: 'super_admin',
    },
  })

  // create home page
  await Promise.all([
    await payload.create({
      collection: 'merchants',
      data: {
        title: 'Test Merchant',
        primary_user: user.id,
      },
    }),
  ])
}
