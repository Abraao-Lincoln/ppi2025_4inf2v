import "./styles/theme.css";
import "./styles/global.css";
import styles from "./components/MyGrid.module.css";
import { Header } from "./components/Header";
import Main from "./components/Main";
import { Footer } from "./components/Footer";

export default function App() {

  return (
    // React Fragment
    <>
      <div className={styles.container}>
        <Header className={styles.header}/>
        <Main className={styles.main} />
        <Footer className={styles.footer}/>
      </div>
    </>
  );
}
