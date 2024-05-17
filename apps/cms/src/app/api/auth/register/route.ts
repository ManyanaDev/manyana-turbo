'use server'
import configPromise from '@payload-config'
import * as Types from '@repo/shared/types'
import { getPayload } from 'payload'
import { ValidationError } from 'payload/errors'

export const POST = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const body = await request.json()

  let { user, merchant } = body

  if (!user || !merchant) {
    return Response.json(
      { error: 'User and Merchant data required' },
      { status: 400, statusText: 'User and Merchant data required' },
    )
  }

  const { email, password, first_name, last_name } = user as Types.IUser

  if (!email || !password || !first_name || !last_name) {
    return Response.json(
      { error: 'Email, password, first name and last name required' },
      { status: 400, statusText: 'Email, password, first name and last name required' },
    )
  }

  const { business_name } = merchant as Types.IMerchant

  try {
    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        first_name,
        last_name,
        role: 'user',
      },
    })

    if (!user) {
      console.log('Payload use error :>> ', user)
      return Response.json(
        { error: 'User not created' },
        { status: 400, statusText: 'User not created' },
      )
    }

    const merchant = await payload.create({
      collection: 'merchants',
      data: {
        business_name,
        primary_user: user.id,
      },
    })

    if (!merchant) {
      console.log('Payload use error :>> ', merchant)
      return Response.json(
        { error: 'Merchant not created' },
        { status: 400, statusText: 'Merchant not created' },
      )
    }

    return Response.json({ user, merchant }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === ValidationError.name) {
        console.log('Payload error :>> ', error)
        return Response.json(
          { error: error.message, data: (error as ValidationError).data },
          { status: (error as ValidationError).status, statusText: error.message },
        )
      }
    }
    return Response.json({ error }, { status: 500, statusText: 'Something went wrong' })
  }
}
