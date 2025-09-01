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
### Recommended Platform: Vercel
1. Push the repository to GitHub.
2. Create a new Vercel project and import the repo.
3. Add environment variables (Settings > Environment Variables):
   - CONTACT_ADMIN_TOKEN (required, strong random string)
4. Build & deploy (Vercel auto-detects Next.js).

### Other Platforms
- Netlify: Use `next build` then `netlify-plugin-nextjs` (or deploy via Next Runtime). Start command: `next start`.
- Docker: Build a production image (example below) and run behind reverse proxy with HTTPS.

### Production Build Locally
```bash
cp .env.example .env.local
# edit CONTACT_ADMIN_TOKEN
npm install
npm run build
npm start
```

### Security & Hardening
- Admin dashboard: `/admin/submissions` – secured by CONTACT_ADMIN_TOKEN (never expose publicly).
- CSV/data exports require the token (Authorization: Bearer header preferred; query param fallback kept only temporarily) – keep it out of screenshots/logs.
- Security headers (HSTS, CSP, Permissions-Policy, etc.) configured in `next.config.ts`.
- Rate limiting on POST /api/contact and /api/bookings endpoints (basic in-memory). For multi-instance scaling, move to Redis.
- Data persistence currently JSON files in `.data/` (ephemeral on some hosts). For production durability migrate to a database (Postgres, MySQL, or a serverless KV/DB).
- Global error boundary (`src/app/error.tsx`) and not-found page (`src/app/not-found.tsx`) provide user-friendly fallbacks.
- Health check endpoint: `GET /api/health` returns `{ status: "ok" }` for uptime monitoring.

### Suggested Next Improvements
- Replace JSON storage with a database layer (Prisma + Postgres or PlanetScale/MySQL or Neon).
- Remove remaining token query auth usage (fully header-based) and introduce an HTTP-only cookie session for admin.
- Add monitoring (e.g., Vercel Analytics, Logtail, Sentry) and structured logging.
- Implement daily backups/rotation for exported CSV.
 - Add audit logging for archive/unarchive actions.

### Minimal Dockerfile (Optional)
```Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm","start"]
```

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
