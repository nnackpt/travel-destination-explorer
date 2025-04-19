import { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = 'Search countries...'}: SearchBarProps) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mb-8">
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 text-gray-700 outline-none"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-3 hober:bg-indigo-700"
                >
                    Search
                </button>
            </div>
        </form>
    )
}