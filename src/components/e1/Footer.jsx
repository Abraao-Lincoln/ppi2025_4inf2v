import styles from "./Footer.module.css";
import { Github, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.information}>
        IFRN - Campus Macau
        <br />
        Curso Técnico em Informática
        <br />
        Proramação para Internet 2025
      </p>

      <p className={styles.prof}>Prof. Guilherme Leal Santos</p>

      <div className={styles.icons}>
        <Github />
        <Instagram />
        <MessageCircle />
      </div>
    </footer>
  );
}
