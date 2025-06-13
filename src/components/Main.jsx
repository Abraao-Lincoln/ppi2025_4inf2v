import styles from "./Main.module.css";

export function Main() {
  const cards = Array.from({ length: 6 }, (_, idx) => ({
    title: `My Text ${idx}`,
    img: `https://picsum.photos/250/250?random=${
      Math.floor(Math.random() * 50) + 1
    }`,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }));

  return (
      <main className={styles.main}>
        <div className={styles.grid}>
          {cards.map((card, idx) => (
            <div className={styles.card} key={idx}>
              <img
                src={card.img}
                alt={`Imagem aleatória ${idx}`}
                className={styles.img}
              />
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardText}>{card.text}</p>
            </div>
          ))}
        </div>
      </main>
  );
}
