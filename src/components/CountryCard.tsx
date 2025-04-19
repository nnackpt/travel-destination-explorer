import Image from "next/image";
import Link from "next/link";
import { Country } from "@/lib/types";
import WishlistButton from "./WishlistButton";

interface CountryCardProps {
    country: Country
}

export default function CountryCard({ country }: CountryCardProps) {
    const languageKey = Object.keys(country.languages || {})[0]
    const language = languageKey ? country.languages[languageKey] : 'Unknown'

    const currencyKey = Object.keys(country.currencies || {})[0]
    const currency = currencyKey ? country.currencies[currencyKey].name : 'Unknow'

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <Link href={`/country/${country.cca3}`}>
                <div className="h-40 relative">
                    <Image
                        src={country.flags.svg || country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{country.name.common}</h2>
                    <p className="text-gray-600"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                    <p className="text-gray-600"><strong>Region:</strong> {country.region}</p>
                    <p className="text-gray-600"><strong>Language:</strong> {language}</p>
                    <p className="text-gray-600"><strong>Currency:</strong> {currency}</p>
                </div>
            </Link>
            <div className="px-4 pb-4">
                <WishlistButton countryCode={country.cca3} country={country} />
            </div>
        </div>
    )
}