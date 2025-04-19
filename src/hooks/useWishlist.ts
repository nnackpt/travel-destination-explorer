import { useState, useEffect } from "react";
import { Country } from "@/lib/types";

export function useWishlist() {
    const [wishlist, setWishlist] = useState<Country[]>([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (error) {
                console.error('Error parsing wishlist:', error);
            }
        }
    }, []);

    const addToWishlist = (country: Country) => {
        const newWishlist = [...wishlist, country];
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const removeFromWishlist = (countryCode: string) => {
        const newWishlist = wishlist.filter(country => country.cca3 !== countryCode);
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const isInWishlist = (countryCode: string) => {
        return wishlist.some(country => country.cca3 === countryCode);
    };

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    };
}