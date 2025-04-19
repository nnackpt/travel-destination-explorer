import { useWishlist } from "@/hooks/useWishlist";
import { Country } from "@/lib/types";

interface WishlistButtonProps {
    countryCode: string
    country: Country
}

export default function WishlistButton({ countryCode, country }: WishlistButtonProps) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
    const inWishlist = isInWishlist(countryCode)

    const handleToggleWishlist = () => {
        if (inWishlist) {
            removeFromWishlist(countryCode)
        } else {
            addToWishlist(country)
        }
    }

    return (
        <button
            onClick={handleToggleWishlist}
            className={`w-full py-2 rounded-md transition-colors ${
                inWishlist
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700' 
            }`}
        >
            {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
    )
}