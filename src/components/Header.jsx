import styles from "./Header.module.css";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Header() {
  const { cart, uniqueProducts } = useContext(CartContext);
  return (
    <header className={styles.header1}>
      <Link to="/" className={styles.title}>
        TECHNOSTORE
      </Link>
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
