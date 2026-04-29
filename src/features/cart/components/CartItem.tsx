import { memo } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import type { CartItem as CartItemType } from "@/types/cart";
import styles from "./CartItem.module.css";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = memo(({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className={styles.item}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.image}
      />

      <div className={styles.info}>
        <h4 className={styles.name}>{product.name}</h4>
      </div>

      <div className={styles.quantity}>
        <label htmlFor={`qty-${product.id}`}>Cantidad:</label>
        <input
          id={`qty-${product.id}`}
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      <div className={styles.price}>
        <p className={styles.unitPrice}>{product.priceFormatted}</p>
        <p className={styles.subtotal}>Subtotal: {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(subtotal)}</p>
      </div>

      <button
        className={styles.removeButton}
        onClick={() => removeItem(product.id)}
        title="Eliminar del carrito"
      >
        ✕
      </button>
    </div>
  );
});

CartItem.displayName = "CartItem";
