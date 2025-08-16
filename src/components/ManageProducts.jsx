// ManageProducts.jsx
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../service/CartContext";
import styles from "./ManageProducts.module.css";

export function ManageProducts() {
  const { products = [], setProducts } = useContext(CartContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" }); // {type: 'success'|'error', message: ''}

  // Reseta a mensagem após X segundos
  useEffect(() => {
    if (!status.message) return;
    const t = setTimeout(() => setStatus({ type: "", message: "" }), 3500);
    return () => clearTimeout(t);
  }, [status]);

  // quando products muda (por exemplo ao carregar), limpa o formulário
  useEffect(() => {
    if (!editingProduct) {
      setForm({ title: "", description: "", price: "", thumbnail: "" });
    }
  }, [products, editingProduct]);

  function validateForm() {
    if (!form.title.trim()) {
      setStatus({ type: "error", message: "Título é obrigatório." });
      return false;
    }
    const priceNum = parseFloat(form.price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      setStatus({ type: "error", message: "Informe um preço válido (> 0)." });
      return false;
    }
    return true;
  }

  function handleAddProduct(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const newProd = {
      id: Date.now().toString() + "-" + Math.floor(Math.random() * 1000),
      title: form.title.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      thumbnail: form.thumbnail.trim() || "https://via.placeholder.com/300x200?text=No+Image",
    };

    setProducts([...(products || []), newProd]);
    setForm({ title: "", description: "", price: "", thumbnail: "" });
    setStatus({ type: "success", message: "Produto adicionado com sucesso." });
  }

  function handleEditProduct(product) {
    setEditingProduct(product);
    setForm({
      title: product.title || "",
      description: product.description || "",
      price: product.price != null ? String(product.price) : "",
      thumbnail: product.thumbnail || "",
    });
    // move focus? você pode adicionar refs se quiser
  }

  function handleUpdateProduct(e) {
    e.preventDefault();
    if (!editingProduct) return;
    if (!validateForm()) return;

    const updated = {
      ...editingProduct,
      title: form.title.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      thumbnail: form.thumbnail.trim() || editingProduct.thumbnail,
    };

    setProducts(
      (products || []).map((p) => (p.id === editingProduct.id ? updated : p))
    );

    setEditingProduct(null);
    setForm({ title: "", description: "", price: "", thumbnail: "" });
    setStatus({ type: "success", message: "Produto atualizado com sucesso." });
  }

  function handleRemoveProduct(id) {
    const prod = (products || []).find((p) => p.id === id);
    const confirmed = window.confirm(
      `Remover "${prod?.title || "produto"}" do catálogo? Essa ação não pode ser desfeita.`
    );
    if (!confirmed) return;

    setProducts((products || []).filter((p) => p.id !== id));
    setStatus({ type: "success", message: "Produto removido." });

    // se estivermos editando o produto removido, cancelar edição
    if (editingProduct && editingProduct.id === id) {
      setEditingProduct(null);
      setForm({ title: "", description: "", price: "", thumbnail: "" });
    }
  }

  function handleCancelEdit() {
    setEditingProduct(null);
    setForm({ title: "", description: "", price: "", thumbnail: "" });
  }

  return (
    <div className={styles.manageContainer}>
      <h1 className={styles.manageTitle}>Manage Products</h1>

      {/* Feedback message */}
      {status.message && (
        <div
          className={styles.statusMessage}
          role="status"
          aria-live="polite"
          style={{
            margin: "0 auto 1rem",
            maxWidth: 920,
            padding: "0.75rem 1rem",
            borderRadius: 8,
            textAlign: "center",
            background: status.type === "success" ? "rgba(37,100,234,0.08)" : "rgba(200,35,51,0.08)",
            color: status.type === "success" ? "rgb(37,100,234)" : "rgb(200,35,51)",
            border: status.type === "success" ? "1px solid rgba(37,100,234,0.12)" : "1px solid rgba(200,35,51,0.12)"
          }}
        >
          {status.message}
        </div>
      )}

      <form
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        className={styles.productForm}
      >
        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Price"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
        />

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
          <button type="submit" className={styles.submitButton}>
            {editingProduct ? "Update Product" : "Add Product"}
          </button>

          {editingProduct && (
            <>
              <button
                type="button"
                onClick={handleCancelEdit}
                className={styles.editButton}
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.9)" }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>

      <div className={styles.productList}>
        {(products || []).map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img
              src={product.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={product.title}
              className={styles.thumbnail}
            />
            <div className={styles.productInfo}>
              <h2 className={styles.productTitle}>{product.title}</h2>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>${Number(product.price).toFixed(2)}</p>
            </div>

            <div className={styles.productActions}>
              <button
                onClick={() => handleEditProduct(product)}
                className={styles.editButton}
                title={`Edit ${product.title}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className={styles.removeButton}
                title={`Remove ${product.title}`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
