import styles from "./Desafio3.module.css";

export default function Desafio3() {
  return (
    <div className={styles.container}>
      <header className={styles.header1}>Header1</header>
      <header className={styles.header2}>Header2</header>
      <aside className={styles.aside1}>Aside1</aside>
      <aside className={styles.aside2}>Aside2</aside>
      <main className={styles.main}>Main</main>
      <footer className={styles.footer1}>Footer1</footer>
      <footer className={styles.footer2}>Footer2</footer>
    </div>
  );
}
