'use client'

import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { images as defaultImages, ImageType } from '~/constants/images'
import { unsplash } from '~/lib/unsplash'
import { cn } from '~/lib/utils'

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus()
  const [images, setImages] = useState<ImageType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)

  const fetchImages = async () => {
    try {
      const result = await unsplash.photos.getRandom({
        collectionIds: ['317099'],
        count: 9
      })
      if (result && result.response) {
        setImages(result.response as ImageType[])
      } else {
        console.error('sorry, can not fetch images')
      }
    } catch (error) {
      console.log(error)
      setImages(defaultImages)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchImages()
  }, [])

  if (loading) {
    return (
      <div className="flex-center p-6">
        <Loader2 className="size-6 animate-spin text-sky-700" />
      </div>
    )
  }
  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75',
              pending && 'cursor-auto opacity-50 hover:opacity-50'
            )}
            onClick={() => {
              if (pending) {
                return
              }
              setSelectedImageId(image.id)
            }}
          >
            <input
              readOnly
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.small}
              alt="unsplash image"
              className="rounded-sm object-cover"
              sizes="100px"
              fill
            />
            {selectedImageId === image.id && (
              <div className="flex-center absolute inset-y-0 size-full bg-black/30">
                <Check className="size-4 text-white" />
              </div>
            )}
            <Link
              className="absolute bottom-0 w-full truncate bg-black/10 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
              href={image.links.html}
              target="_blank"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormPicker
