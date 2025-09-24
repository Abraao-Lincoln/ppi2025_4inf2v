import { useNavigate } from "react-router";
import styles from "./Register.module.css";
import { useState  } from "react";

export function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send data to backend
    console.log("Form Data Submitted: ", formData);
    // For now, just navigate to login page after "registration"
    navigate("/signin");
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.label}>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
          onChange={handleChange}
        />

        <label htmlFor="email" className={styles.label}>E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          onChange={handleChange}
        />

        <label htmlFor="username" className={styles.label}>Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          className={styles.input}
          onChange={handleChange}
        />

        <label htmlFor="password" className={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
          onChange={handleChange}
        />

        <button type="submit" className={styles.register}>Register</button>
      </form>
    </div>
  );
}
