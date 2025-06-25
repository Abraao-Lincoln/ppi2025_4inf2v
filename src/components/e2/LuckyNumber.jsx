import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [array, setArray] = useState([]);

  function handleClick() {
    setLuckyNumber(Math.floor(Math.random() * 40) + 1);

    {luckyNumber in array ? (
          console.log("Lucky number already exists in the array")
          
        ) : (
          setArray([...array, luckyNumber])
        )}

  }

  return (
    <div className={styles.container}>
        {luckyNumber === 0 ? (
          <h1>Lucky Number 🎲</h1>
        ) : (
          <h1>Lucky Number = {luckyNumber}</h1>
        )}

        {luckyNumber in array ? (
          <h1> O numero já foi sorteado</h1>
          
        ) : (
          console.log("Lucky number is unique")
        )}
     <h2>{...array}</h2>
      <button className={styles.button} onClick={handleClick}>
        I'm Feeling Lucky Today!
      </button>
    </div>
  );
}
