import { useNavigate } from "react-router";
import { useCart } from "@/features/cart/hooks/useCart";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import styles from "./CartPage.module.css";

export const CartPage = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  const { items } = state;

  const handleCheckout = () => {
    if (!state.items.length) return;

    const cartData = {
      date: new Date().toISOString(),
      items: state.items.map((item) => ({
        product: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity,
      })),
      total: state.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      ),
    };

    const dataStr = JSON.stringify(cartData, null, 2);

    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `cart-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega algunos productos para comenzar</p>
          <button
            className={styles.continueButton}
            onClick={() => navigate("/")}
          >
            Continuar comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tu Carrito</h1>

      <div className={styles.content}>
        <div className={styles.itemsSection}>
          <div className={styles.itemsHeader}>
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Precio</span>
            <span></span>
          </div>

          <div className={styles.itemsList}>
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        <aside className={styles.summarySection}>
          <CartSummary onCheckout={handleCheckout} />

          <button
            className={styles.continueButton}
            onClick={() => navigate("/")}
          >
            ← Seguir comprando
          </button>
        </aside>
      </div>
    </div>
  );
};
