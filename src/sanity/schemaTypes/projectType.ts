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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
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
      name: 'figmaImages',
      title: 'Figma / UX images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
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
      media: 'mainImage',
    },
  },
})