import "./styles/theme.css";
import "./styles/global.css";
import styles from "./components/App.module.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import Desafio3 from "./components/Desafio3";

export default function App() {
  return (
    // React Fragment
    <>
      <Desafio3 />
      {/* <div className={styles.container}>
        <Header className={styles.header}/>
        <Main className={styles.main} />
        <Footer className={styles.footer}/>
      </div> */}
    </>
  );
}
