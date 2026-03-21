import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  Link,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Something went wrong";
  let message = "An unexpected error occurred while loading the store.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message =
      typeof error.data === "string"
        ? error.data
        : "The requested page could not be loaded.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="site-shell error-page">
      <section className="state-card">
        <p className="state-card__eyebrow">Store error</p>
        <h1 className="state-card__title">{title}</h1>
        <p className="state-card__text">{message}</p>
        <div className="state-card__actions">
          <Link to="/" className="state-card__button">
            Back to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}