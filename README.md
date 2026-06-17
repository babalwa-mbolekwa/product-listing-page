# Product Listing Page

A filterable, sortable product listing page. [View Page](https://product-listing-page-gules.vercel.app/).

## Tech Stack & Styling Approach

- **Next.js 16 (App Router) + TypeScript**
- **Tailwind CSS**
  Chosen because its utility-first classes eliminate context-switching between JSX and CSS files, accelerating UI development. The design across the codebase is consistent because Tailwind has pre-defined spacing, colors, typography, etc.
- **Shadcn/UI**
  Chosen because components are fully customizable and not installed as dependencies - you only add components that you want to use not the entire component library. Shadcn components are also WCAG compliant, out of the box.
- **Lucide React**
  Chosen because it's modern and pairs perfectly with Shadcn/UI. You only import icons you use. It also has full type-safety and supports TypeScript for icon names and props

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
npm run test    # Jest, single run
npm run test:watch
```

No environmental variables are required - the mock API endpoint is hardcoded in `lib/api.ts` since it's public and read-only.

## Project structure

```
app/
    page.tsx                Server component: fetches products, renders ProductListing
    loading.tsx             Route-level loading skeleton
    error.tsx               Route-level error boundary
    layout.tsx
    globals.css
    components/
        ui/                 shadcn/ui primitives (Button, Checkbox, Select, Slider, Sheet, etc.)
        catalog/            custom components
            ProductListing.tsx
            FilterSidebar.tsx
            MobileFilters.tsx
            CatalogToolbar.tsx
            ProductGrid.tsx
            ProductCard.tsx
    lib/
        api.ts              getProducts() — fetches from the mock API
        utils.ts            cn() class-merging helper
        products.ts         utilities (unit tested)
        __tests__/
    types/product.ts        TypeScript interfaces and types
```

## Design & technical decisions

- **Data fetching strategy.** `getProducts()` fetches full catalog once on the server (`page.tsx`), and revalidated every 5 minutes. The given mock API (mockapi.io) doesn't have server-side filter/pagination params, so filtering, sorting, and "Load More" pagination all run on client-side in `ProductListing`
- **Products don't load all at once.** Implemented this feature on client-side via "Load More Products" button that reveals 9 more items at a time from the already filtered/sorted list. Changes on filters, the sorting, or the view resets pagination back to 9.
- **New Arrivals.** Implemented as a real filter, not just a label: it scopes the catalog to products whose `createdAt` is within the last 30 days.
- **Add-to-cart icon.** Was visible on mobile cards only on the Figma design, but added on all screens. Cart logic not present due to scope.
- **Price range: inputs + slider.** Made both to use the same `{ minPrice, maxPrice }` state, so they always agree. Using the slider for quick adjustment and the inputs for precise values.
- **"Filters and Filter Selection" button.** Was only visible on the Dektop design, but I added on all screens to enable users to filter on either small, medium or large screens. When used inside the mobile drawer, it closes the sheet after applying.

## Accessibility

- Semantic structure: `<aside>` for the desktop filter sidebar, `<main>`, `<nav>` for the view switcher, `<fieldset>`/`<legend>` for the price range and category groups, `<ul>`/`<li>` for the product grid.
- All interactive elements (checkboxes, sort `<Select>`, sliders, buttons, the mobile sheet) are native or Radix-based, and they're keyboard-operable and use correct ARIA roles/states out of the box.
- Every product image has descriptive `alt` text (the product title); the add-to-cart icon button also has an explicit `aria-label` instead of relying on the icon alone.
- The results count (`Showing 1-X of Y products`) is wrapped in `aria-live="polite"` so screen reader users hear updates when filters change.

## Testing

```bash
npm run test
```

8 unit tests, testing the products utility functions

- `/lib/__tests__/products.test.ts` — `filterProducts`, `getCategories`, `sortProducts`, `formatPrice`
