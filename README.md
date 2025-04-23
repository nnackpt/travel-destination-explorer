# 🌍 Travel Destination Explorer

Explore the world in style! Travel Destination Explorer is a fun and interactive web application that lets you discover countries, see beautiful images, and create your travel wishlist — all while practicing modern web development tools and API integration.

## 🔧 Tech Stack

- **Next.js (TypeScript)** – Handles routing, SSR/SSG, and fast performance
- **TailwindCSS** – For building a beautiful, responsive UI quickly
- **RestCountries API** – Provides country data (name, flag, capital, etc.)
- **Unsplash API** – Fetches high-quality country-related images

---

## ✅ Core Features

### 🔍 Country Search

- Search for any country by name
- Display results in card or grid view

**Country Card displays:**

- 🇺🇳 Country name
- 🏳️ Flag
- 🏙 Capital city
- 🗣 Official language(s)
- 💱 Currency
- 🌍 Region (continent)

---

### 🖼️ Country Details Page

- Click on a country to view its detail page
- Fetch photos from **Unsplash API** using country name as a keyword
- Display images in **Grid** or **Carousel** format

---

### 🎲 Random Explore

- “Explore Random Country” button
- Fetches a random country using **RestCountries API**
- Automatically navigates to that country’s details page

---

### 🎨 Dynamic Theme Color from Flag

- Use `color-thief` or similar to extract dominant color from the flag image
- Apply this color dynamically to background, headers, or card accents using **TailwindCSS** classes

---

### 🌍 Wishlist – Countries You Want to Visit

- "Add to Wishlist" button on each country
- Save wishlist using **localStorage** or **IndexedDB**
- View and manage your saved countries in a separate **“My Wishlist”** page
- Remove countries from wishlist anytime

---

## 🚀 How to Run the Project

```bash
# 1. Clone the repository
git clone https://github.com/nnackpt/travel-destination-explorer.git
cd travel-destination-explorer

# 2. Install dependencies
npm install

# 3. Set up environment variables
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
UNSPLASH_SECRET_KEY=your_unsplash_secret_key_here

# 4. Run the development server
npm run dev
```

## License

This project is licensed under [nnackpt](https://github.com/nnackpt) License.
