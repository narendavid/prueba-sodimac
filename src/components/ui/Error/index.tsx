import styles from "./styles.module.css";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export const Error = ({ message, onRetry }: ErrorProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.button} onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
};
