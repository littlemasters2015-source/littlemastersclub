import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'programTile',
  title: 'Program Tiles',
  type: 'document',
  fields: [
    defineField({
      name: 'program',
      title: 'Program',
      type: 'reference',
      to: [{type: 'program'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order (lowest first)',
      type: 'number',
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
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
