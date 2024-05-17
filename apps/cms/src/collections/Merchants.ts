import { AccessArgs, CollectionConfig, PayloadRequest } from 'payload/types'

async function allowOwnerOrAdmin({ req: { user, payload }, id, data }: AccessArgs<any, any>) {
  if (!id) {
    return false
  }
  try {
    // use id to get the existing document
    const merchant = await payload?.findByID({ collection: 'merchants', id: id as number })

    console.log('merchant collection :>>', user, merchant.primary_user)
    // @ts-ignore
    if (merchant.primary_user?.id == user.id || ['admin', 'super_admin'].includes(user?.role)) {
      return true
    }
    return false
  } catch (error) {
    console.log('error :>> ', error)
    return false
  }
}

export const Merchants: CollectionConfig = {
  slug: 'merchants',
  admin: {
    useAsTitle: 'business_name',
  },
  // auth: true,
  access: {
    create: () => true, //allowOwnerOrAdmin,
    read: () => true, //allowOwnerOrAdmin,
    update: () => true, //allowOwnerOrAdmin,
    delete: () => true, //allowOwnerOrAdmin,
  },
  fields: [
    {
      name: 'business_name',
      label: 'Business Name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone_number',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
    },
    {
      name: 'primary_user',
      type: 'relationship',
      relationTo: 'users',
      label: 'Primary User',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
    },
    {
      name: 'project_allocations',
      label: 'Project Allocations',
      type: 'json',
      jsonSchema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            project: {
              type: 'relationship',
              relationTo: 'projects',
            },
            allocation: {
              type: 'integer',
            },
          },
        },
      },
    },
  ],
  endpoints: [
    {
      path: '/primary_user/:user_id',
      method: 'get',
      async handler(req) {
        if (!req.routeParams?.user_id) {
          return Response.json({ message: 'user_id is required' }, { status: 400 })
        }

        try {
          const crops = await req.payload.find({
            collection: 'merchants',
            where: {
              primary_user: {
                equals: Number(req.routeParams?.user_id),
              },
            },
            limit: 1,
          })

          if (crops.docs.length === 0) {
            return Response.json({ message: 'No merchant found' }, { status: 404 })
          }

          const crop = crops.docs[0]

          return Response.json(crop)
        } catch (error) {
          console.log('error :>> ', error)
          return Response.json({ error }, { status: 500 })
        }
      },
    },
  ],
}
