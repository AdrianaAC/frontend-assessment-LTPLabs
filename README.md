# LTP Store – Frontend Assessment

A simple responsive e-commerce application built for the **LTP Labs frontend assessment**.

This project implements a product listing experience, product detail page, and shopping cart flow using **route-based data loading and mutations**, with a focus on clean frontend architecture, responsiveness, and usability.

## Tech Stack

* React Router v7
* TypeScript
* Vite
* CSS
* DummyJSON API

## Note on Framework Choice

The original challenge requested **Remix**. Since Remix v2 has been upstreamed into React Router and the legacy Remix scaffolding flow is no longer straightforward, this project was implemented using the current **React Router framework tooling**, while preserving the same challenge intent:

* route-based loaders
* route-based actions
* file-based route modules
* server-driven mutations
* URL-driven filtering, sorting, and pagination

## Features Implemented

### Homepage

* Product listing fetched from API
* Category filtering
* Sorting options
* Pagination
* Responsive grid layout

### Product Detail Page

* Product data fetched by route
* Product image gallery
* Add to cart action
* Loading/submission feedback

### Shopping Cart

* Cookie-based cart persistence
* Add to cart from product detail
* Increase quantity
* Decrease quantity
* Remove items
* Cart total calculation
* Cart count shown in header

## Project Structure

app/
components/
Header.tsx
Pagination.tsx
ProductCard.tsx
ProductFilters.tsx
lib/
api.server.ts
cart.server.ts
types.ts
url.ts
routes/
cart.tsx
home.tsx
product-detail.tsx
app.css
root.tsx
routes.ts

## Data Flow

### Loaders

Used to fetch:

* product list
* categories
* selected product
* cart contents

### Actions

Used to handle:

* add to cart
* increase quantity
* decrease quantity
* remove item

## URL State

The homepage uses URL search params for stateful navigation:

* page
* category
* sort

Examples:

* /
* /?category=beauty
* /?sort=price-desc
* /?category=fragrances&sort=title-asc&page=2

## Screenshots

### Homepage

![Homepage](./public/screenshots/homepage.png)

### Filters and Pagination

![Filters and Pagination](./public/screenshots/filters-pagination.png)

### Product Detail

![Product Detail](./public/screenshots/product-detail.png)

### Cart

![Cart](./public/screenshots/cart.png)

## Getting Started

Install dependencies:

npm install

Run the development server:

npm run dev

## Assessment Requirements Coverage

* Homepage implemented
* Product detail page implemented
* Shopping cart implemented
* Product fetch from API implemented
* Category filtering implemented
* Sorting implemented
* Pagination implemented
* Add to cart implemented
* Remove from cart implemented
* Responsive layout implemented
* Route-based loaders/actions implemented
* Version-controlled project delivered

## Possible Future Improvements

* Figma-perfect visual refinement
* Better mobile micro-interactions
* Toast feedback when adding to cart
* Quantity selector directly on product detail
* Better image gallery with selectable active image
* Persistent backend/cart storage
* Automated tests

## Assessment Requirements Coverage

- Homepage implemented
- Product detail page implemented
- Shopping cart implemented
- Product fetch from API implemented
- Category filtering implemented
- Sorting implemented
- Pagination implemented
- Add to cart implemented
- Remove from cart implemented
- Responsive layout implemented
- Route-based loaders/actions implemented
- Version-controlled project delivered

## What I Focused On

For this assessment, I prioritized:

* clear route structure
* good separation of concerns
* use of loader/action patterns
* responsive layout
* practical e-commerce UX
* code that is easy to extend
