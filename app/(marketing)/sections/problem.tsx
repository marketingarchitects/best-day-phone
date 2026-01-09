import { Card } from '@/components/ui/Card/Card';
import styles from "../page.module.scss";

export const ProblemSection = () => {

  return (
    <section className={`${styles.section} ${styles.sectionProblem}`}>
      <div className={styles.sectionContent}>
        
        <h2 className={styles.heading}>
          You can't always be there. But you never stop worrying.
        </h2>

        <p className={styles.subHeading}>
          You've tried smartphones, tablets, and other devices. They sit untouched. Technology wasn't built for the people you love most.
        </p>

        <Card.Group className={styles.cards}>
          <Card>
            <img
              src="/phone.png"
              alt="Phone"
              role="presentation"
              />
            <h3>They can't learn new technology</h3>
            <p>People with dementia remember childhood most strongly. Smartphones will never feel familiar.</p>
          </Card>
          
          <Card>
            <img
              src="/clock.png"
              alt="Clock"
              role="presentation"
              />
            <h3>You can't call enough</h3>
            <p>Work, kids, life. You love them, but finding time for daily calls is hard.</p>
          </Card>

          <Card>
            <img
              src="/sad.png"
              alt="Sad Face"
              role="presentation"
              />
            <h3>Silence is dangerous</h3>
            <p>Studies show isolation rivals smoking when it comes to health impacts. Conversation keeps minds engaged.</p>
          </Card>
        </Card.Group>

      </div>
    </section>
  );
}

export default ProblemSection;