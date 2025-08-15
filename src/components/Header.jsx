import styles from "./Header.module.css";
import { ShoppingCart, CircleUserRound } from "lucide-react";
import { Link } from "react-router";
import { useContext, useState } from "react";
import { CartContext } from "../service/CartContext";

export function Header() {
  const { cart, uniqueProducts } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const name = userData.name;
  const username = userData.username;

  return (
    <header className={styles.header}>
      <div
        className={styles.login}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
        style={{ position: "relative" }}
      >
        <CircleUserRound size={50} color="var(--primary)" />
        {name}

        {showPopup && (
          <div className={styles.userPopup}>
            <div className={styles.userInfo}>
            <CircleUserRound  />
              <p>{username || "Usuário"}</p>
            </div>
            <Link to="/login">
              <button>Sair</button>
            </Link>
          </div>
        )}
      </div>
      <div>
        <Link to="/" className={styles.title}>
          TECHNOSTORE
        </Link>
      </div>

      <div className={styles.cart}>
        <Link to="/cart">
          <ShoppingCart className={styles.cartIcon} />
        </Link>
        {cart.length > 0 && <p>{cart.length}</p>}

        {cart.length > 0 && (
          <h5>
            {uniqueProducts
              .reduce(
                (total, product) => total + product.price * product.qty,
                0
              )
              .toFixed(2)}
          </h5>
        )}
      </div>
    </header>
  );
}
