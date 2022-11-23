import { Card, Button } from "antd";
import styles from "./TriviaCard.module.css";

export default function TriviaCard({ survey, start }) {
  const button = (
    <Button
      type="primary"
      disabled={!start.connection}
      onClick={start.start}
      className={styles.button}
    >
      {start.connection ? "Start!" : "Connect wallet to start!"}
    </Button>
  );

  const metaTitle = <h3 className={styles.title}>{survey.title}</h3>;
  return (
    <Card
      cover={<img alt="daily trivia" src={survey.image} />}
      className={styles.card}
    >
      <Card.Meta title={metaTitle} description={button} />
    </Card>
  );
}
