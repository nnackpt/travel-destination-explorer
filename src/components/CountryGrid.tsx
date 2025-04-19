import { Country } from "@/lib/types";
import CountryCard from "./CountryCard";

interface CountryGridProps {
    countries: Country[]
    loading: boolean
}

export default function CountryGrid({ countries, loading }: CountryGridProps) {
    if (loading) {
        return <div className="text-center py-8">Loading countries...</div>
    }

    if (!countries || countries.length === 0) {
        return <div className="text-center py-8">No countries found.</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
            ))}
        </div>
    )
}