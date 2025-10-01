import styles from "./Product.module.css";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast, Bounce } from "react-toastify";

export function Product({ product }) {
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(0);
  const [showModal, setShowModal] = useState(false);

  function handleAdd(product) {
    addToCart(product);
    setShowModal(true);
  }

  return (
    <div className={styles.productCard}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      <div className={styles.productQty}>
        {qty === 0 ? (
          <p className={styles.productPrice}>${product.price}</p>
        ) : (
          <p className={styles.productPrice}>
            ${(product.price * qty).toFixed(2)}
          </p>
        )}
      </div>
      <button
        className={styles.productButton}
        onClick={() => {
          handleAdd(product);
          toast.success("Product added to the cart", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            style: { fontSize: "1.5rem" },
          });
        }}
      >
        ADD TO CART
      </button>
    </div>
  );
}
