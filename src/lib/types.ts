export interface Country {
    name: {
        common: string;
        official: string;
    };
    flags: {
        png: string;
        svg: string;
    };
    capital: string[];
    languages: Record<string, string>;
    currencies: Record<string, { name: string; symbol: string }>;
    region: string;
    cca3: string;
    population: number;
}

export interface UnsplashImage {
    id: string;
    urls: {
        small: string;
        regular: string;
    };
    alt_description: string;
    user: {
        name: string;
    };
}