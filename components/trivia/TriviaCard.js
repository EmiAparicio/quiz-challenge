import { Card, Button } from "antd";
import styles from "./TriviaCard.module.css";

export default function TriviaCard({ image, title, start }) {
  const button = (
    <Button type="primary" onClick={start} className={styles.button}>
      Start!
    </Button>
  );

  const metaTitle = <h3 className={styles.title}>{title}</h3>;
  return (
    <Card
      cover={<img alt="daily trivia" src={image} />}
      className={styles.card}
    >
      <Card.Meta title={metaTitle} description={button} />
    </Card>
  );
}
