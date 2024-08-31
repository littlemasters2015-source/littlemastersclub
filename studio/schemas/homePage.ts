import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'carousel',
      title: 'Carousel Images',
      type: 'array',
      of: [
        defineField({
          name: 'carouselImage',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Text',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'blockContent',
    }),
    defineField({
      name: 'video',
      title: 'Video Embed',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'supportImage',
      title: 'Support Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'supportText',
      title: 'Support Text',
      type: 'blockContent',
    }),
    defineField({
      name: 'eventsImage',
      title: 'Events Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
