import { Link } from "react-router";

type Props = {
  cartCount?: number;
};

export default function Header({ cartCount = 0 }: Props) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-logo">
          LTP Store
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/cart" className="site-nav__cart">
            Cart
            <span className="site-nav__badge" aria-label={`${cartCount} items in cart`}>
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}