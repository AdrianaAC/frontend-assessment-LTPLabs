# LTP Store – Frontend Assessment

A simple responsive e-commerce application built for the **LTP Labs frontend assessment**.

This project implements a product listing experience, product detail page, and shopping cart flow using **route-based data loading and mutations**, with a focus on clean frontend architecture, responsiveness, and usability.

## Tech Stack

* React Router v7
* TypeScript
* Vite
* CSS
* DummyJSON API

## Framework Note: React Router v7 instead of Remix

This challenge requested Remix. I implemented the project with **React Router v7**, which is the maintained continuation of the same route-module model that Remix popularized.

This choice was intentional and made to preserve the challenge’s architectural intent while using the current actively maintained routing stack.

### Remix concepts preserved in this implementation

The project keeps the exact data-flow style expected from a Remix application:

- **Route modules**
  - each page lives in its own route file
- **Loader functions**
  - used for server-side data loading
  - homepage products
  - categories
  - product detail
  - cart contents
- **Action functions**
  - used for server-side mutations
  - add to cart
  - increase quantity
  - decrease quantity
  - remove item
- **URL-driven state**
  - pagination, sorting, and filtering are read from the URL
- **Server-first data flow**
  - data is fetched in loaders, not duplicated in client-only state
- **Mutation + redirect pattern**
  - cart updates happen through actions and return redirects
- **Cookie-based persistence**
  - cart state is stored on the server boundary through cookies
- **Nested app routing model**
  - the app uses route files, shared layout structure, and route-based rendering
- **Progressive enhancement friendly forms**
  - forms submit through route actions rather than custom client-side mutation plumbing

### Why this still matches the spirit of the challenge

Although the project is not scaffolded with Remix itself, it follows the same architectural model the challenge was evaluating:

- route-based data loading
- route-based mutations
- clean routing structure
- server-oriented state flow
- frontend best practices

In practice, this implementation preserves the core Remix patterns the assessment was asking for, while using the current maintained evolution of that ecosystem.

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


## What I Focused On

For this assessment, I prioritized:

* clear route structure
* good separation of concerns
* use of loader/action patterns
* responsive layout
* practical e-commerce UX
* code that is easy to extend


