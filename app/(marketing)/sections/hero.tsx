import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { Heart, ArrowRight, CirclePlay } from "lucide-react";
import styles from "../page.module.scss";

export const HeroSection = () => {

  return (
    <section className={`${styles.section} ${styles.sectionHero}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.videoBackground}
        >
        <source src="/hero-montage.mp4" type="video/mp4" />
      </video>

      <div className={styles.sectionContent}>
        <div className={styles.contentContainer}>

          <Badge color="ghost" style={{alignSelf: 'flex-start', marginBottom: '1.5em'}}>
            <Heart />
            For families caring for loved ones with memory loss
          </Badge>

          <h1 className={styles.heading}>
            The call that's
            <br/>
            <span>
              always answered.
              <svg preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="6"></path>
              </svg>
            </span>
          </h1>

          <p className={styles.subHeading}>
            A familiar voice inside a familiar phone, for people with Alzheimer's and dementia. No screens. No confusion. Just pick up and talk.
          </p>

          <div className={styles.ctaList}>
            <Button variant="primary" size="lg">
              Start Free Trial
              <ArrowRight />
            </Button>
            <Button variant="ghost" size="lg">
              <CirclePlay />
              See How It Works
            </Button>
          </div>

          <small className={styles.disclaimer}>Free device included. 30-day trial. Cancel any time.</small>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;