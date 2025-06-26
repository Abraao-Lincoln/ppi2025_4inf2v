import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
  const [luckyNumber, setLuckyNumber] = useState(1);
  const [array, setArray] = useState([]);

  function handleClick() {
    setLuckyNumber(Math.floor(Math.random() * 40) + 1);

    {array.includes(luckyNumber) ? (
          console.log("Lucky number already exists in the array")
          
        ) : (
          setArray([...array, luckyNumber])
        )}

  }
  const formatedArray = array.join(", ");
  return (
    <div className={styles.container}>
        {luckyNumber === 0 ? (
          <h1>Lucky Number 🎲</h1>
        ) : (
          <h1>Lucky Number = {luckyNumber}</h1>
        )}

        {array.includes(luckyNumber) ? (
          <h1> O numero já foi sorteado</h1>
          
        ) : (
          console.log("Lucky number is unique")
        )}

        
      <button className={styles.button} onClick={handleClick}>
        I'm Feeling Lucky Today!
      </button>
      <h2>Números sorteados:</h2>
      <h2>{formatedArray}</h2>
    </div>
  );
}
