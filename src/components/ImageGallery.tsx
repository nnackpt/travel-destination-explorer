import Image from "next/image";
import { useState } from "react";
import { UnsplashImage } from "@/lib/types";

interface ImageGalleryProps {
    images: UnsplashImage[]
    loading: boolean
}

export default function ImageGallery({ images, loading }: ImageGalleryProps) {
    const [viewType, setViewType] = useState<'grid' | 'carousel'>('grid')
    const [currentIndex, setCurrentIndex] = useState(0)

    if (loading) {
        return <div className="text-center py-8">Loading images...</div>
    }

    if (images.length === 0) {
        return <div className="text-center py-8">No images found.</div>
    }

    return (
        <div className="my-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Photos</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setViewType('grid')}
                        className={`px-4 py-2 rounded-md ${
                            viewType === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                        }`}
                    >
                        Grid
                    </button>
                    <button
                        onClick={() => setViewType('carousel')}
                        className={`px-4 py-2 rounded-md ${
                            viewType === 'carousel' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                        }`}
                    >
                        Carousel
                    </button>
                </div>
            </div>

            {viewType === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image) => (
                        <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden">
                            <Image 
                                src={image.urls.regular}
                                alt={image.alt_description || 'Country image'}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                Photo by {image.user.name}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative h-96 w-full">
                    <div className="relative h-full w-full rounded-lg overflow-hidden">
                        <Image 
                            src={images[currentIndex].urls.regular}
                            alt={images[currentIndex].alt_description || 'Country image'}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                            Photo by {images[currentIndex].user.name}
                        </div>
                    </div>
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    )
}