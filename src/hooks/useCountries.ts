import { useState, useEffect } from "react";
import { Country } from "@/lib/types";
import { getAllCountries, searchCountries } from "@/lib/api";

export function useCountries() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilterdCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchCountries() {
            try {
                setLoading(true);
                const data = await getAllCountries();
                setCountries(data);
                setFilterdCountries(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch countries');
                setLoading(false);
            }
        }

        fetchCountries();
    }, []);

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilterdCountries(countries);
            return;
        }

        const lowercaseQuery = query.toLowerCase()
        const localResults = countries.filter(country => 
            country.name.common.toLowerCase().includes(lowercaseQuery) ||
            country.name.official.toLowerCase().includes(lowercaseQuery)
        )

        if (localResults.length > 0) {
            setFilterdCountries(localResults)
            return
        }

        try {
            setLoading(true);
            const results = await searchCountries(query);
            setFilterdCountries(results);
        } catch (err) {
            console.error("Search error:", err)
            setError('Error searching countries');
        } finally {
            setLoading(false)
        }
    };

    return {
        countries,
        filteredCountries,
        loading,
        error,
        searchQuery,
        handleSearch,
    };
}