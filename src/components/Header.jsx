import styles from "./Header.module.css";
import { ShoppingCart, CircleUserRound } from "lucide-react";
import { Link } from "react-router";
import { useContext, useState } from "react";
import { CartContext } from "../service/CartContext";

export function Header() {
  const { cart, uniqueProducts } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const username = "user";

  return (
    <header className={styles.header1}>
      <div
        className={styles.login}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
        style={{ position: "relative" }}
      >
        <CircleUserRound />

        {showPopup && (
          <div className={styles.userPopup}>
            <p>{username || "Usuário"}</p>
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
        <div className={styles.cartIcon}>
          <Link to="/cart">
            <ShoppingCart />
          </Link>
          {cart.length === 0 ? <h5 className="qtd"></h5> : <p>{cart.length}</p>}
          <h5>
            {uniqueProducts
              .reduce(
                (total, product) => total + product.price * product.qty,
                0
              )
              .toFixed(2)}
          </h5>
        </div>
      </div>
    </header>
  );
}
