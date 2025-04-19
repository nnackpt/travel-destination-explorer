'use client'

import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import CountryGrid from "@/components/CountryGrid"
import RegionFilter from "@/components/RegionFilter"
import CountryComparison from "@/components/CountryComparison"
import { useCountries } from "@/hooks/useCountries"

export default function HomePage() {
  const { filteredCountries, loading, handleSearch } = useCountries()
  const [selectedRegion, setSelectedRegion] = useState('')
  const [displayedCountries, setDisplayedCountries] = useState(filteredCountries)
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    if (!selectedRegion) {
      setDisplayedCountries(filteredCountries)
    } else {
      const regionFilterd = filteredCountries.filter(
        country => country.region === selectedRegion
      )
      setDisplayedCountries(regionFilterd)
    }
  }, [filteredCountries, selectedRegion])

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region)
  }

  const toggleComparisonMode = () => {
    setShowComparison(!showComparison)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-x-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Explore Countries Around the World</h1>
        
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={toggleComparisonMode}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            {showComparison ? 'Hide Comparion' : 'Compare Countries'}
          </button>
        </div>

        {showComparison ? (
          <CountryComparison />
        ) : (
          <>
            <SearchBar onSearch={handleSearch} />
            <RegionFilter onRegionChange={handleRegionChange} currentRegion={selectedRegion} />
            <CountryGrid countries={displayedCountries} loading={loading} />
          </>
        )}
      </main>
    </div>
  )
}