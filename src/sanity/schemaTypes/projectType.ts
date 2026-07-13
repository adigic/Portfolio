import {defineField, defineType} from 'sanity'


export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(220),
    }),
    defineField({
      name: 'cardImage',
      title: 'Project Card Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Bild som visas på projektkortet.'
    }),
    defineField({
      name: 'foundationImage',
      title: 'Project Foundation Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Bild som visas i "foundation"-delen av projektet.'
    }),

    defineField({
      name: 'uxImages',
      title: 'UX/UI & Figma Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {hotspot: true},
            },
            {
              name: 'title',
              type: 'string',
              title: 'Titel (t.ex. Logotyp, Mobile, Desktop)',
            },
            {
              name: 'description',
              type: 'string',
              title: 'Beskrivning (valfri)',
            },
            {
              name: 'aspect',
              type: 'string',
              title: 'Aspect',
              options: {
                list: [
                  {title: 'Square', value: 'square'},
                  {title: 'Landscape', value: 'landscape'},
                  {title: 'Portrait', value: 'portrait'},
                ],
                layout: 'radio',
              },
            },
          ],
        },
      ],
      description: 'Ladda upp logotyp, mobil/desktop screenshots etc. med titel och beskrivning.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Personal', value: 'Personal'},
          {title: 'Professional', value: 'Professional'},
          {title: 'Private', value: 'Private'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'client',
      title: 'Client / Context',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'process',
      title: 'Process',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'toolsUsed',
      title: 'Tools used',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'uiSummary',
      title: 'UX/UI summary',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'cardImage',
    },
  },
})