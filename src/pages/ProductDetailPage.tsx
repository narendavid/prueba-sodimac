import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useProduct } from "@/features/products/hooks/useProduct";
import { useCart } from "@/features/cart/hooks/useCart";
import { Loading } from "@/components/ui/Loading";
import { Error } from "@/components/ui/Error";
import styles from "./ProductDetailPage.module.css";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);
    try {
      addItem(product, quantity);
      setTimeout(() => navigate("/cart"), 500);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !product) {
    return (
      <div className={styles.errorContainer}>
        <Error message={error?.message || "Producto no encontrado"} />
        <button className={styles.backButton} onClick={() => navigate("/")}>
          ← Volver a productos
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        ← Volver a productos
      </button>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.name}>{product.name}</h1>
          <div className={styles.price}>{product.priceFormatted}</div>
          <div className={styles.actions}>
            <div className={styles.quantitySection}>
              <label htmlFor="quantity">Cantidad:</label>
              <div className={styles.quantityControl}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isAdding}
                >
                  -
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
        </div>
      </div>
    </div>
  );
};
