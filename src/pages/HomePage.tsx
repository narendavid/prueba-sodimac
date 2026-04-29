import { useProducts } from "@/features/products/hooks";
import { ProductList } from "@/features/products/components/ProductList";
import { Loading } from "@/components/ui/Loading";
import { Error } from "@/components/ui/Error";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const { products, loading, error } = useProducts();

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

      <ProductList products={products} showDetailLinks={true} />
    </div>
  );
};
