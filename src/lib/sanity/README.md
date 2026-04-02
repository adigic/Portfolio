# Sanity Integration

- Lägg till `.env.local` med:
  - NEXT_PUBLIC_SANITY_PROJECT_ID=din_project_id
  - NEXT_PUBLIC_SANITY_DATASET=production
- Skapa schema för `project` i Sanity Studio:

```js
// schemas/project.js
export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'mainImage', type: 'image', title: 'Main image' },
    { name: 'tags', type: 'array', of: [{type: 'string'}], title: 'Tags' },
    { name: 'type', type: 'string', title: 'Type', options: { list: ['Private', 'Professional'] } },
    { name: 'url', type: 'url', title: 'Project URL' },
  ]
}
```

- Lägg in projekt i Sanity Studio.
- Starta om Next.js-servern vid ändringar i miljövariabler.
