import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'order (lowest first)',
      type: 'number',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})
