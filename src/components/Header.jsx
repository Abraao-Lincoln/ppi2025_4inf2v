import styles from "./Header.module.css";
import { Atom } from "lucide-react";

export function Header() {
  return (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Atom size={90} strokeWidth={2} className={styles.logo} />
          <h1 className={styles.title}>Foco, Força e Fé</h1>
        </div>
      </header>
  );
}
