import {defineField, defineType} from 'sanity'

export const detail = defineType({
  name: 'detail',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'value',
      type: 'string',
    }),
  ],
})

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'startTime',
      type: 'datetime',
    }),
    defineField({
      name: 'endTime',
      type: 'datetime',
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'detail'}],
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
