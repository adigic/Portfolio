import {motion, type Variants} from 'framer-motion'
import Image from 'next/image'

import type {ProjectUXImage} from '@/lib/sanity/types'
import {urlFor} from '@/lib/sanity/imageUrl'

type UxGalleryProps = {
  images: ProjectUXImage[]
  fallbackAlt: string
  itemVariants: Variants
}

export default function UxGallery({images, fallbackAlt, itemVariants}: UxGalleryProps) {
  const validImages = images.filter((ux) => ux.image)
  if (validImages.length === 0) return null

  if (validImages.length === 1) {
    const ux = validImages[0]
    const url = urlFor(ux.image!, 1400)
    if (!url) return null
    const alt = ux.title || fallbackAlt
    const tag = ux.title || 'UX/UI'

    return (
      <motion.article
        className="mx-auto w-full max-w-4xl overflow-hidden border border-white/10 bg-white text-brand shadow-[0_24px_60px_rgba(0,0,0,0.2)]"
        variants={itemVariants}
      >
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/8]">
          <Image
            src={url}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1000px"
          />
        </div>
        <div className="border-t border-brand/8 px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/45">{tag}</p>
          {ux.description ? (
            <p className="mt-2 text-sm leading-relaxed text-brand/76 sm:text-base">{ux.description}</p>
          ) : null}
        </div>
      </motion.article>
    )
  }

  const columnsClass = validImages.length === 2 ? 'columns-1 sm:columns-2' : 'columns-1 sm:columns-2 lg:columns-3'

  return (
    <motion.div className={`${columnsClass} gap-5`} variants={itemVariants}>
      {validImages.map((ux, index) => {
        const img = ux.image
        const url = img ? urlFor(img, 800) : undefined
        if (!url) return null
        const alt = ux.title || fallbackAlt
        const tag = ux.title || 'UX/UI'
        const dimensions = img?.asset?.metadata?.dimensions
        const width = dimensions?.width || 800
        const height = dimensions?.height || 600
        return (
          <motion.article
            key={ux.title || ux.description || ux.aspect || index}
            className="mb-5 break-inside-avoid overflow-hidden border border-white/10 bg-white text-brand shadow-[0_20px_48px_rgba(0,0,0,0.16)]"
            variants={itemVariants}
          >
            <Image
              src={url}
              alt={alt}
              width={width}
              height={height}
              className="block h-auto w-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="border-t border-brand/8 px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/45">{tag}</p>
              {ux.description ? (
                <p className="mt-2 text-sm leading-relaxed text-brand/76">{ux.description}</p>
              ) : null}
            </div>
          </motion.article>
        )
      })}
    </motion.div>
  )
}
