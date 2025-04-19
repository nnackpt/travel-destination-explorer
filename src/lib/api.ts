import { Country, UnsplashImage } from "./types";

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export async function getAllCountries(): Promise<Country[]> {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch countries');
        return response.json();
    } catch (error) {
        console.error('Error fetching countries:', error)
        return [];
    }
}

export async function getCountryByCode(code: string): Promise<Country | null> {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!response.ok) throw new Error('Failed to fetch country');
        const data = await response.json();
        return data[0] || null;
    } catch (error) {
        console.error('Error fetching country:', error);
        return null;
    }
}

export async function searchCountries(query: string): Promise<Country[]> {
    if (!query) return [];
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`);
        
        if (response.status === 404) {
            console.log("No countries found for query:", query)
            return []
        }

        if (!response.ok) {
            throw new Error(`Seach failed with status: ${response.status}`)
        }

        const data = await response.json()
        return data || []
    } catch (error) {
        console.error('Error searching countries:', error)
        return []
    }
}

export async function getRandomCountry(): Promise<Country | null> {
    try {
        const countries = await getAllCountries();
        if (countries.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * countries.length);
        return countries[randomIndex]; 
    } catch (error) {
        console.error('Error getting random country:', error);
        return null;
    }
}

export async function getCountryImages(countryName: string): Promise<UnsplashImage[]> {
    if (!UNSPLASH_ACCESS_KEY) {
        console.error('Unsplash API key is missing');
        return [];
    }

    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${countryName}&per_page=9&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}