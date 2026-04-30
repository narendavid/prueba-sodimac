import { memo } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "../ProductCard";
import styles from "./styles.module.css";

interface ProductListProps {
  products: Product[];
  onOpenDetails?: (product: Product) => void;
}

export const ProductList = memo(
  ({ products, onOpenDetails }: ProductListProps) => {
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
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    );
  }
);

ProductList.displayName = "ProductList";
