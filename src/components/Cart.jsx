import styles from "./Cart.module.css";
import { useState, useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Cart() {
  const { uniqueProducts, cart, removeFromCart, addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  function handleRemove(product) {
    setModalProduct(product);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setModalProduct(null);
  }

  function confirmRemove() {
    if (modalProduct) {
      for (let i = 0; i < modalProduct.qty; i++) {
        removeFromCart(modalProduct);
      }
      closeModal();
    }
  }

  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>Shopping Cart</h2>
      {uniqueProducts.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {uniqueProducts.map((product) => (
              <li key={product.id}>
                <div className={styles.cartItem}>
                  <img src={product.thumbnail} alt={product.title} />
                  <h3>{product.title}</h3>
                  <button
                    onClick={() => removeFromCart(product)}
                    disabled={product.qty === 1}
                    className={styles.minusButton}
                  >
                    -
                  </button>
                  <p>{product.qty}</p>
                  <button onClick={() => addToCart(product)} className={styles.plusButton}>+</button>
                  <p>${(product.price * product.qty).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemove(product)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.checkout}>
            <h1>Finalizar </h1> <br />
            <ul className={styles.checkoutList}>
              {uniqueProducts.map((product) => (
                <li
                  key={product.id}
                  style={{ fontSize: "2rem", marginBottom: "1rem" }}
                >
                  <strong>{product.qty}x - {product.title}</strong><br />
                  ${(product.price * product.qty).toFixed(2)}
                </li>
              ))}
            </ul>
            <br />
            <h3>
              TOTAL: $
              {uniqueProducts
                .reduce(
                  (total, product) => total + product.price * product.qty,
                  0
                )
                .toFixed(2)}
            </h3>
            <br />
            <button>Continuar</button>
          </div>
          {/* Modal */}
          {showModal && (
            <div className={styles.modal} onClick={closeModal}>
              <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <span className={styles.close} onClick={closeModal}>&times;</span>
                <h2>Remover produto</h2>
                <p>Deseja remover <strong>{modalProduct?.title}</strong> do carrinho?</p>
                <button className={styles.confirmButton} onClick={confirmRemove} >
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}