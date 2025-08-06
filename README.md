# TripWripp - Travel Buddy Website

A modern, fully responsive travel website built with Next.js, TypeScript, and Tailwind CSS. TripWripp offers an immersive travel planning experience with dynamic routing, beautiful animations, and comprehensive travel information.

## Features

### 🏠 **Home Page**
- Hero section with stunning background imagery
- Interactive stats section with smooth animations
- Featured destinations showcase
- Travel packages preview
- Call-to-action sections

### 🌍 **Destinations**
- Complete destination listing with filtering by type and region
- Detailed destination cards with ratings, highlights, and pricing
- Responsive grid layout
- Dynamic filtering system

### 📦 **Packages**
- Travel package listings with comprehensive details
- Filtering and sorting capabilities
- Detailed itineraries and inclusions
- Package type categorization (luxury, budget, adventure, family, romantic)

### 🖼️ **Gallery**
- Image gallery with category filtering
- Lightbox/modal view for enlarged images
- Responsive masonry-style layout
- Interactive hover effects

### ℹ️ **About Us**
- Company story and mission
- Team member profiles
- Core values presentation
- Company statistics

### 📞 **Contact**
- Contact form with validation
- Multiple contact methods
- Business hours and location information
- Quick links for easy navigation

### ❓ **FAQ**
- Searchable FAQ system
- Categorized questions and answers
- Expandable accordion interface
- Comprehensive travel information

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Handling**: Next.js Image Optimization
- **Routing**: Next.js App Router

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── about/page.tsx          # About Us page
│   ├── contact/page.tsx        # Contact page
│   ├── destinations/page.tsx   # Destinations listing
│   ├── faq/page.tsx           # FAQ page
│   ├── gallery/page.tsx       # Image gallery
│   ├── packages/page.tsx      # Travel packages
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── Navigation.tsx         # Main navigation component
│   └── Layout.tsx             # Layout wrapper with footer
└── data/
    └── travelData.ts          # Sample travel data
```

## Key Features

### Responsive Design
- Mobile-first approach
- Breakpoint-optimized layouts
- Touch-friendly interfaces

### Performance Optimized
- Next.js App Router for optimal loading
- Image optimization
- Code splitting
- SEO-friendly structure

### Interactive Elements
- Smooth animations with Framer Motion
- Hover effects and transitions
- Modal/lightbox functionality
- Dynamic filtering and search

### User Experience
- Intuitive navigation
- Consistent design language
- Accessibility considerations
- Fast loading times

## Data Structure

The application uses TypeScript interfaces for type safety:

- **Destination**: Travel destination information
- **Package**: Travel package details with itineraries
- **GalleryImage**: Image gallery data

## Customization

### Adding New Destinations
Update `src/data/travelData.ts` with new destination objects following the existing interface.

### Styling Changes
Modify Tailwind classes throughout the components or update `tailwind.config.js` for theme customizations.

### Adding Pages
Create new page components in the `src/app/` directory following Next.js App Router conventions.

## Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Other static site hosts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for demonstration purposes.

---

**TripWripp** - Your Ultimate Travel Companion 🌟
