import { useState } from "react";
import { useProducts } from "@/features/products/hooks";
import { ProductList, ProductDetailModal } from "@/features/products/components";
import { Modal } from "@/components/ui";
import { Loading } from "@/components/ui/Loading";
import { Error } from "@/components/ui/Error";
import type { Product } from "@/types/product";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Error message={error.message} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nuestros Productos</h1>
      <p className={styles.subtitle}>
        Encuentra los mejores productos disponibles
      </p>

      <ProductList
        products={products}
        onOpenDetails={(product) => setSelectedProduct(product)}
      />

      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </Modal>
    </div>
  );
};
