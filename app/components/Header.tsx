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
          <a href="#about" className="site-header__nav-link">
            About
          </a>
          <a href="#contact" className="site-header__nav-link">
            Contact
          </a>
          <a href="#blog" className="site-header__nav-link">
            Blog
          </a>
        </nav>

        <div className="site-header__actions" aria-label="Store actions">
          <button type="button" className="site-header__icon-button" aria-label="Search">
            <span aria-hidden="true">⌕</span>
          </button>

          <button type="button" className="site-header__icon-button" aria-label="Account">
            <span aria-hidden="true">◌</span>
          </button>

          <Link to="/cart" className="site-header__icon-button site-header__cart" aria-label="Shopping cart">
            <span aria-hidden="true">👜</span>
            <span className="site-header__cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}