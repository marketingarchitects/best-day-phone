import Header from './Header';
import HeroSection from './sections/hero';
import ProblemSection from './sections/problem';
import styles from "./page.module.scss";

export default function Home() {
  return (<>

    <Header />
  
    <main className={styles.main}>

      <HeroSection />
      <ProblemSection />

    </main>

  </>);
}
