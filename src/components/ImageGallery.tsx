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
                <div className="flex space-x-2">
                    <button
                        onClick={() => setViewType('grid')}
                        className={`p-2 rounded-md flex items-center justify-center ${
                            viewType === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                        title="Grid View"
                        aria-label="Grid View"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewType('carousel')}
                        className={`p-2 rounded-md flex items-center justify-center ${
                            viewType === 'carousel' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                        title="Carousel View"
                        aria-label="Carousel View"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
                            <circle cx="12" cy="17" r="1"></circle>
                            <path d="M5 7v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"></path>
                        </svg>
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}