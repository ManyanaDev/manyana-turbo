import { CollectionConfig } from 'payload/types'

export const Merchants: CollectionConfig = {
  slug: 'merchants',
  admin: {
    useAsTitle: 'business_name',
  },
  // auth: true,
  access: {
    create: ({ req: { user } }) => ['admin', 'super_admin'].includes(user?.role),
    read: ({ req: { user } }) => ['admin', 'super_admin'].includes(user?.role),
    update: ({ req: { user } }) => ['admin', 'super_admin'].includes(user?.role),
    delete: ({ req: { user } }) => ['admin', 'super_admin'].includes(user?.role),
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
  ],
}
