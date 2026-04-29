import { memo, useState } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import type { Product } from "@/types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export const ProductCard = memo(
  ({ product, onOpenDetails }: ProductCardProps) => {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
      setIsAdding(true);
      try {
        addItem(product, quantity);
        setQuantity(1);
      } finally {
        setIsAdding(false);
      }
    };

    return (
      <div className={styles.card}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />

        <div className={styles.content}>
          <h3 className={styles.name}>{product.name}</h3>

          <div className={styles.price}>{product.priceFormatted}</div>

          <div className={styles.actions}>
            <div className={styles.quantityControl}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isAdding}
              >
                −
              </button>
              <input
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

            <button
              className={styles.addButton}
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? "Agregando..." : "Agregar"}
            </button>
          </div>

          {onOpenDetails && (
            <button
              className={styles.detailLink}
              onClick={() => onOpenDetails(product)}
            >
              Ver detalles
              <span style={{ fontSize: '1.1em' }}>→</span>
            </button>
          )}
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";
