import { Link } from "react-router";

type Props = {
  cartCount?: number;
};

export default function Header({ cartCount = 0 }: Props) {
  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <Link to="/" className="site-header__brand">
          THE ONLINE STORE
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          <Link to="/" className="site-header__nav-link">
            Home
          </Link>
          <a href="#shop" className="site-header__nav-link">
            Shop
          </a>
          <a href="#deals" className="site-header__nav-link">
            Deals
          </a>
          <a href="#contact" className="site-header__nav-link">
            Contact
          </a>
          <a href="#account" className="site-header__nav-link">
            Account
          </a>
        </nav>

        <div className="site-header__actions" aria-label="Store actions">
          <button
            type="button"
            className="site-header__icon-button"
            aria-label="Search"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="site-header__icon-svg"
            >
              <circle
                cx="11"
                cy="11"
                r="5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M16 16L20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="site-header__icon-button"
            aria-label="Account"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="site-header__icon-svg"
            >
              <circle
                cx="12"
                cy="8"
                r="3.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M6.5 19.5C7.6 16.8 9.5 15.5 12 15.5C14.5 15.5 16.4 16.8 17.5 19.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link
            to="/cart"
            className="site-header__icon-button site-header__cart"
            aria-label="Shopping cart"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="site-header__icon-svg"
            >
              <path
                d="M8 8H16L15.2 18H8.8L8 8Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 8V6.8C9.5 5.4 10.6 4.3 12 4.3C13.4 4.3 14.5 5.4 14.5 6.8V8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <span className="site-header__cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}