import { CollectionConfig } from 'payload/types'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'project_name',
  },
  // auth: true,
  access: {
    create: ({ req: { user } }) => ['admin', 'super_admin'].includes(user?.role),
    update: ({ req: { user } }) => ['admin', 'super_admin'].includes(user?.role),
    delete: ({ req: { user } }) => ['admin', 'super_admin'].includes(user?.role),
  },
  fields: [
    {
      name: 'project_name',
      label: 'Project Name',
      type: 'text',
      required: true,
    },
    {
      name: 'project_key',
      label: 'Project Key',
      type: 'text',
      required: true,
    },
  ],
}
