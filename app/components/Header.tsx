import { Link } from "react-router";

type HeaderVariant = "home" | "detail";

type Props = {
  cartCount?: number;
  variant?: HeaderVariant;
};

const navByVariant: Record<
  HeaderVariant,
  Array<{ label: string; to: string }>
> = {
  home: [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Blog", to: "/blog" },
  ],
  detail: [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Deals", to: "/deals" },
    { label: "Contact", to: "/contact" },
    { label: "Account", to: "/account" },
  ],
};

export default function Header({
  cartCount = 0,
  variant = "home",
}: Props) {
  const navItems = navByVariant[variant];

  return (
    <header className={`site-header site-header--${variant}`}>
      <div className="site-shell site-header__inner">
        <Link to="/" className="site-header__brand">
          THE ONLINE STORE
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} className="site-header__nav-link">
              {item.label}
            </Link>
          ))}
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
                strokeWidth="1.5"
              />
              <path
                d="M16 16L20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link
            to="/account"
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
                r="3.1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6.8 19.2C7.8 16.8 9.6 15.6 12 15.6C14.4 15.6 16.2 16.8 17.2 19.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>

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
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 8V6.8C9.5 5.4 10.6 4.3 12 4.3C13.4 4.3 14.5 5.4 14.5 6.8V8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
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