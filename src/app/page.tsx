'use client'

import { useEffect } from "react"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import CountryGrid from "@/components/CountryGrid"
import { useCountries } from "@/hooks/useCountries"

export default function HomePage() {
  const { filteredCountries, loading, handleSearch } = useCountries()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-x-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Explore Countries Around the World</h1>
        <SearchBar onSearch={handleSearch} />
        <CountryGrid countries={filteredCountries} loading={loading} />
      </main>
    </div>
  )
}