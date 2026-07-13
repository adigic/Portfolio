// migrate-projects.js
// One-off migration, already run against production data: migrates old image
// fields to the new ones and removes the old fields on Sanity "project" documents.
// Kept for reference only — do not re-run against a dataset that has already
// been migrated (it currently reflects the migrated schema, so it would be a no-op
// at best and destructive at worst if the schema changes again).
// Run (from repo root): node scripts/migrate-projects.js


import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Lägg till din token i .env.local
  apiVersion: '2024-12-01',
  useCdn: false,
});

async function migrate() {
  const projects = await client.fetch('*[_type == "project"]{_id, cardImage, foundationImage, uxImages, mainImage, images, foundationImageKey, projectCardImageKey}');

  for (const project of projects) {
    const patch = {};
    let unsetFields = [];

    // Kopiera mainImage till cardImage om cardImage saknas
    if (project.mainImage && !project.cardImage) {
      patch.cardImage = project.mainImage;
    }
    // Kopiera första bilden i images till foundationImage om foundationImage saknas
    if (Array.isArray(project.images) && project.images.length && !project.foundationImage) {
      patch.foundationImage = project.images[0].image;
    }
    // Kopiera övriga images till uxImages[] och lägg till unika _key
    if (Array.isArray(project.images) && project.images.length) {
      patch.uxImages = project.images.map(img => ({
        image: img.image,
        title: img.label || '',
        aspect: img.aspect || '',
        description: '',
        _key: crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(12).toString('hex'),
      }));
    }
    // Om uxImages redan finns men saknar _key, lägg till _key
    if (Array.isArray(project.uxImages)) {
      patch.uxImages = project.uxImages.map(img => ({
        ...img,
        _key: img._key || (crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(12).toString('hex')),
      }));
    }

    // Samla gamla fält som ska tas bort
    [
      'foundationImageKey',
      'projectCardImageKey',
      'mainImage',
      'images',
    ].forEach(fld => {
      if (project[fld] !== undefined) unsetFields.push(fld);
    });

    // Patcha dokumentet
    let p = client.patch(project._id).set(patch);
    if (unsetFields.length) p = p.unset(unsetFields);
    await p.commit();
    console.log(`Migrated: ${project._id}`);
  }
}

migrate().then(() => {
  console.log('Migration klar!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
