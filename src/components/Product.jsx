import styles from "./Product.module.css";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Product({ product }) {
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(0);
  const [showModal, setShowModal] = useState(false);

  function handleAdd(product) {
    addToCart(product);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setModalProduct(null);
  }

  // function confirmRemove() {
  //   if (modalProduct) {
  //     for (let i = 0; i < modalProduct.qty; i++) {
  //       removeFromCart(modalProduct);
  //     }
  //     closeModal();
  //   }
  // }

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
        }}
      >
        ADD TO CART
      </button>
      {/* Modal */}
      {showModal && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Produto adicionado com sucesso</h2>
            <p>
              <strong>{product.title}</strong> adicionado ao carrinho!
            </p>
            <button className={styles.confirmButton} onClick={closeModal}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
