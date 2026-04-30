import { memo, useState } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import type { Product } from "@/types/product";
import styles from "./styles.module.css";

interface ProductDetailModalProps {
  product: Product;
}

export const ProductDetailModal = memo(
  ({ product }: ProductDetailModalProps) => {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleAddToCart = async () => {
      setIsAdding(true);
      try {
        addItem(product, quantity);
        setQuantity(1);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      } finally {
        setIsAdding(false);
      }
    };

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
            />
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.name}>{product.name}</h2>
            <div className={styles.price}>{product.priceFormatted}</div>

            <div className={styles.actions}>
              <div className={styles.quantitySection}>
                <label htmlFor="quantity">Cantidad:</label>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isAdding}
                  >
                    −
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val > 0) {
                        setQuantity(val);
                      }
                    }}
                    disabled={isAdding}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isAdding}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className={styles.addButton}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? "Agregando..." : "Agregar al carrito"}
              </button>
            </div>

            {showMessage && (
              <div className={styles.successMessage}>
                ✓ Producto agregado al carrito
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProductDetailModal.displayName = "ProductDetailModal";
