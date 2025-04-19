import { useState } from "react";

interface RegionFilterProps {
    onRegionChange: (region: string) => void
    currentRegion: string
}

export default function RegionFilter({ onRegionChange, currentRegion }: RegionFilterProps) {
    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

    return (
        <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Filter by Region</h3>
            <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                    <button
                        key={region}
                        onClick={() => onRegionChange(region === 'All' ? '' : region)}
                        className={`px-4 py-2 rounded-full ${
                            (currentRegion === region) || (currentRegion === '' && region === 'All')
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } transition-colors`}
                    >
                        {region}
                    </button>
                ))}
            </div>
        </div>
    )
}