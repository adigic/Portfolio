import Image from 'next/image'

import type { ProjectImage } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/imageUrl'

type FoundationImageProps = {
  image?: ProjectImage
  alt: string
}

export default function FoundationImage({ image, alt }: FoundationImageProps) {
  const url = image ? urlFor(image, 1200) : undefined

  return (
    <div className="relative aspect-[16/10] w-full md:aspect-[16/8] flex items-center justify-center bg-brand/10">
      {url ? (
        <Image
          src={url}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
          priority
        />
      ) : (
        <span className="text-brand/30 text-xs">No image</span>
      )}
    </div>
  )
}
