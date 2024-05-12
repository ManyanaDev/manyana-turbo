import { AccessArgs, CollectionConfig } from 'payload/types'

async function allowOwnerOrAdmin({ req: { user, payload }, id, data }: AccessArgs<any, any>) {
  if (!id) {
    return false
  }
  try {
    // use id to get the existing document
    const merchant = await payload?.findByID({ collection: 'merchants', id: id as number })

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
    create: allowOwnerOrAdmin,
    read: allowOwnerOrAdmin,
    update: allowOwnerOrAdmin,
    delete: allowOwnerOrAdmin,
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
              type: 'number',
            },
          },
        },
      },
    },
  ],
}
