import { memo } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import { formatPrice } from "@/utils/formatters";
import styles from "./CartSummary.module.css";

interface CartSummaryProps {
  onCheckout?: () => void;
}

export const CartSummary = memo(({ onCheckout }: CartSummaryProps) => {
  const { getTotalItems, getTotalPrice, clearCart } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className={styles.summary}>
      <h3>Resumen</h3>

      <div className={styles.row}>
        <span>Productos ({totalItems}):</span>
        <strong>{formatPrice(totalPrice)}</strong>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.total}>
        <span>Total:</span>
        <strong>{formatPrice(totalPrice)}</strong>
      </div>

      <div className={styles.actions}>
        <button className={styles.checkoutBtn} onClick={onCheckout}>
          Proceder al pago
        </button>

        <button className={styles.clearBtn} onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
});

CartSummary.displayName = "CartSummary";
