// TODO: Add mobile layout

import { createClient } from "@/lib/supabase/server";
import { Button } from '@/components/ui/Button/Button';
import styles from "./header.module.scss";

export const Header = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <a
          className={styles.logo}
          href="/"
          >
          <img
            src="/logo.svg"
            alt="Best Day Phone logo"
            />
        </a>

        <nav>
          <ul className={styles.navigation}>
            <li>
              <a href="#">How it Works</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              {!!user ? (
              <Button href="/login">Log In</Button>
              ) : (
              <Button href="#">Get Started</Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;