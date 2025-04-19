'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';
import ImageGallery from '../../../components/ImageGallery';
import WishlistButton from '../../../components/WishlistButton';
import { getCountryByCode, getCountryImages } from '../../../lib/api';
import { Country, UnsplashImage } from '../../../lib/types';

export default function CountryPage() {
  const router = useRouter();
  const params = useParams();
  const countryCode = params?.id as string;
  
  const [country, setCountry] = useState<Country | null>(null);
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [themeColor, setThemeColor] = useState('#4f46e5'); // Default indigo color

  useEffect(() => {
    async function fetchCountryData() {
      if (!countryCode) return;
      
      try {
        setLoading(true);
        const countryData = await getCountryByCode(countryCode);
        setCountry(countryData);
        setLoading(false);
        
        if (countryData) {
          setImagesLoading(true);
          const countryImages = await getCountryImages(countryData.name.common);
          setImages(countryImages);
          setImagesLoading(false);
          setThemeColor('#4f46e5');
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
        setLoading(false);
        setImagesLoading(false);
      }
    }
    
    fetchCountryData();
  }, [countryCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-16 px-4 text-center">
          <p className="text-xl">Loading country information...</p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-16 px-4 text-center">
          <p className="text-xl">Country not found</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  const languageEntries = Object.entries(country.languages || {});
  const currencyEntries = Object.entries(country.currencies || {});

  return (
    <div className="min-h-screen" style={{ backgroundColor: `${themeColor}10` }}>
      <Navbar />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={country.flags.svg || country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h1 className="text-3xl font-bold mb-2">{country.name.common}</h1>
              <p className="text-lg text-gray-500 mb-4">{country.name.official}</p>
              <WishlistButton countryCode={country.cca3} country={country} />
            </div>
            <div className="md:w-2/3 p-6 bg-gray-50">
              <h2 className="text-2xl font-bold mb-4">Country Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                  <p className="text-gray-700"><strong>Region:</strong> {country.region}</p>
                  <p className="text-gray-700"><strong>Population:</strong> {country.population.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong>Languages:</strong>{' '}
                    {languageEntries.length > 0
                      ? languageEntries.map(([_, name]) => name).join(', ')
                      : 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <strong>Currencies:</strong>{' '}
                    {currencyEntries.length > 0
                      ? currencyEntries.map(([_, { name, symbol }]) => `${name} (${symbol})`).join(', ')
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ImageGallery images={images} loading={imagesLoading} />
      </main>
    </div>
  );
}