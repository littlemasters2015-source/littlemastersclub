import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'boardMember',
  title: 'Board Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'order (lowest first)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
})
