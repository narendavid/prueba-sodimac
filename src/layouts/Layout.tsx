import type { ReactNode } from "react";
import { Header } from "./Header";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>&copy; 2026 desarrollado por Naren Luna</p>
      </footer>
    </div>
  );
};
