import styles from "./styles.module.css";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>Cargando...</p>
    </div>
  );
};
