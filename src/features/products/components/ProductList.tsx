import { memo } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import styles from "./ProductList.module.css";

interface ProductListProps {
  products: Product[];
  showDetailLinks?: boolean;
}

export const ProductList = memo(
  ({ products, showDetailLinks = false }: ProductListProps) => {
    if (products.length === 0) {
      return (
        <div className={styles.empty}>
          <p>No hay productos disponibles</p>
        </div>
      );
    }

    return (
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showDetailLink={showDetailLinks}
            detailLinkHref={`/product/${product.id}`}
          />
        ))}
      </div>
    );
  }
);

ProductList.displayName = "ProductList";
