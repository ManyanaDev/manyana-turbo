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
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
    },
  ],
  endpoints: [
    {
      path: '/slug/:slug',
      method: 'get',
      async handler(req) {
        if (!req.routeParams?.slug) {
          return Response.json({ message: 'slug is required' }, { status: 400 })
        }

        try {
          const crops = await req.payload.find({
            collection: 'projects',
            where: {
              slug: {
                equals: req.routeParams?.slug,
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
