'use client';

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import CountryGrid from "@/components/CountryGrid";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistPage() {
    const { wishlist } = useWishlist()

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center mb-8">My Travel Wishlist</h1>
                {wishlist.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-500">Your wishlist is empty.</p>
                        <p className="mt-2">Add countries to your wishlist as you explore!</p>
                    </div>
                ) : (
                    <CountryGrid countries={wishlist} loading={false} />
                )}
            </main>
        </div>
    )
}