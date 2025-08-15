import { useNavigate } from "react-router";
import styles from "./Login.module.css";

export function Login() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  function handleLogin(e) {
    if (userData.username === e.target.username.value &&
        userData.password === e.target.password.value) { 
      alert("Login successful!");
          navigate("/"); // Redirect to home page after login
    } else {
      alert("Invalid username or password.");
    }

  }

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <label htmlFor="username" className={styles.label}>
          Username:
        </label>
        <input type="text" id="username" className={styles.input} />

        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input type="password" id="password" className={styles.input} />

        <button type="submit" className={styles.submitButton} >
          Login
        </button>
      </form>
    </div>
  );
}
