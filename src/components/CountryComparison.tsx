import React, { useState,useEffect } from "react";
import Image from "next/image";
import { Country } from "@/lib/types";
import { getAllCountries } from "@/lib/api";

export default function CountryComparison() {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState(true)
    const [country1, setCountry1] = useState<Country | null>(null)
    const [country2, setCountry2] = useState<Country | null>(null)

    useEffect(() => {
        async function fetchCountries() {
            try {
                setLoading(true)
                const data = await getAllCountries()
                setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)))
                setLoading(false)
            } catch (err) {
                console.error('Failed to fetch countries for comparison')
                setLoading(false)
            }
        }

        fetchCountries()
    }, [])

    if (loading) {
        return <div className="tex-center py-8">Loading countries...</div>
    }

    const handleCountry1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = countries.find(c => c.cca3 === e.target.value) || null
        setCountry1(selectedCountry)
    }

    const handleCountry2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = countries.find(c => c.cca3 === e.target.value) || null
        setCountry2(selectedCountry)
    }

    const formatPopulation = (population: number) => {
        return new Intl.NumberFormat().format(population)
    }

    const getLanguages = (country: Country) => {
        return Object.values(country.languages || {}).join(', ') || 'N/A'
    }

    const getCurrencies = (country: Country) => {
        if (!country.currencies) return 'N/A'
        return Object.values(country.currencies)
            .map(currency => `${currency.name} (${currency.symbol})`)
            .join(', ')
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Compare Countries</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label htmlFor="country1" className="block text-sm font-medium text-gray-700 mb-2">
                        First Country
                    </label>
                    <select 
                        id="country1"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={country1?.cca3 || ''}
                        onChange={handleCountry1Change}
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={`c1-${country.cca3}`} value={country.cca3}>
                                {country.name.common}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="country2" className="block text-sm font-medium text-gray-700 mb-2">
                        Second Country
                    </label>
                    <select 
                        id="country2"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={country2?.cca3 || ''}
                        onChange={handleCountry2Change}
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={`c2-${country.cca3}`} value={country.cca3}>
                                {country.name.common}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {country1 && country2 && (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-3 gap-0">
                        <div className="p-6 bg-gray-50">
                            <h3 className="font-bold text-lg mb-4">Comparison</h3>
                            <div className="space-y-4">
                                <div className="font-medium">Country Name</div>
                                <div className="font-medium">Flag</div>
                                <div className="font-medium">Capital</div>
                                <div className="font-medium">Population</div>
                                <div className="font-medium">Region</div>
                                <div className="font-medium">Languages</div>
                                <div className="font-medium">Currencies</div>
                            </div>
                        </div>

                        <div className="p-6 border-l border-gray-200">
                            <h3 className="font-bold text-lg mb-4">{country1.name.common}</h3>
                            <div className="space-y-4">
                                <div>{country1.name.official}</div>
                                <div className="h-16 relative">
                                    <Image 
                                        src={country1.flags.svg || country1.flags.png}
                                        alt={`Flag of ${country1.name.common}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div>{country1.capital?.[0] || 'N/A'}</div>
                                <div>{formatPopulation(country1.population)}</div>
                                <div>{country1.region}</div>
                                <div>{getLanguages(country1)}</div>
                                <div>{getCurrencies(country1)}</div>
                            </div>
                        </div>

                        <div className="p-6 border-l border-gray-200">
                            <h3 className="font-bold text-lg mb-4">{country2.name.common}</h3>
                            <div className="space-y-4">
                                <div>{country2.name.official}</div>
                                <div className="h-16 relative">
                                    <Image 
                                        src={country2.flags.svg || country2.flags.png}
                                        alt={`Flag of ${country2.name.common}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div>{country2.capital?.[0] || 'N/A'}</div>
                                <div>{formatPopulation(country2.population)}</div>
                                <div>{country2.region}</div>
                                <div>{getLanguages(country2)}</div>
                                <div>{getCurrencies(country2)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}