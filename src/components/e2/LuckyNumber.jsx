import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [array, setArray] = useState([]);

  function handleClick() {
    const n = Math.floor(Math.random() * 40) + 1;
    if (array.includes(n)) {
      alert(`The number ${n} already exists in the array.`);
      return;
    }
    setLuckyNumber(n);
    setArray([...array, n]);
  }

  function sort() {
    setArray([...array].sort((a, b) => a - b));
  }

  return (
    <div className={styles.container}>
      {luckyNumber === 0 ? (
        <h1>Lucky Number 🎲</h1>
      ) : (
        <h1>Lucky Number = {luckyNumber}</h1>
      )}

      <button className={styles.button} onClick={handleClick}>
        I'm Feeling Lucky Today!
      </button>
      <div className={styles.sortedNumbers}>
        <h2>Números sorteados:</h2>
        <h2 className={styles.array}>{array.join(", ")}</h2>
      </div>
      <button className={styles.button} onClick={sort}>
        Sort Numbers Alphabetically?
      </button>
    </div>
  );
}
