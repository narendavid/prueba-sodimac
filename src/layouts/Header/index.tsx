import { Link } from "react-router";
import { useCart } from "@/features/cart/hooks/useCart";
import styles from "./styles.module.css";

export const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          🛍️ Shopping Cart
        </Link>

        <nav className={styles.nav}>
          <Link to="/">Productos</Link>
          <Link to="/cart" className={styles.cartLink}>
            🛒
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
