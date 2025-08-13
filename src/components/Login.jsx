import styles from './Login.module.css';

export function Login() {
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form className={styles.loginForm}>
        <label htmlFor="username" className={styles.label}>
          Username:
        </label>
        <input type="text" id="username" className={styles.input} />
        
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input type="password" id="password" className={styles.input} />
        
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
}