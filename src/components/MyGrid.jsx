import styles from "./MyGrid.module.css";
import  { Atom, Github, Instagram, MessageCircle } from "lucide-react";

export function MyGrid() {

  const cards = Array.from({ length: 5 }, (_, idx) => ({
    title: `My Text ${idx}`,
    img: `https://picsum.photos/250/250?random=${Math.floor(Math.random() * 100) + 1}`,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Atom size={90} strokeWidth={2} className={styles.logo} />
          <h1 className={styles.title}>Foco, Força e Fé</h1>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.grid}>
          {cards.map((card, idx) => (
            <div className={styles.card} key={idx}>
              <img src={card.img} alt={`Imagem aleatória ${idx}`} className={styles.img}/>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardText}>{card.text}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        <p className={styles.information}>IFRN - Campus Macau
        <br />Curso Técnico em Informática
        <br />Proramação para Internet 2025</p>

        <p className={styles.prof}>Prof. Guilherme Leal Santos</p>

        <div className={styles.icons}><Github /><Instagram /><MessageCircle /></div>
      </footer>
    </div>
  );
}
