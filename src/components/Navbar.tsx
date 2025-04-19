import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRandomCountry } from "@/lib/api";

interface NavbarProps {
    onCompareToggle?: () => void
    showingComparison?: boolean 
}

export default function Navbar({ onCompareToggle, showingComparison = false }: NavbarProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleRandomCountry = async () => {
        setLoading(true)
        const randomCountry = await getRandomCountry()
        setLoading(false)

        if (randomCountry) {
            router.push(`/country/${randomCountry.cca3}`)
        }
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                        <span className="text-xl font-bold text-indigo-600">Travel Destination Explorer</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {onCompareToggle && (
                            <button
                                onClick={onCompareToggle}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    showingComparison
                                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                }`}
                            >
                                {showingComparison ? 'Exit Compare Mode' : 'Compare Countries'}
                            </button>
                        )}
                        <button
                            onClick={handleRandomCountry}
                            disabled={loading}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            {loading ? 'Loading...' : 'Explore Random Country'}
                        </button>
                        <Link href="/wishlist" className="text-gray-700 hover:text-indigo-600">
                            My Wishlist
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    ) 
}