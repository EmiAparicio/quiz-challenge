import { Carousel } from "antd";
import { useRef, useState, useEffect } from "react";
import SurveyQuestion from "./SurveyQuestion";
import styles from "./TriviaCarousel.module.css";

export default function TriviaCarousel({ survey }) {
  const ref = useRef();
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setTimer(
      setTimeout(() => {
        ref.current.next();
      }, survey.questions[0].lifetimeSeconds * 1000)
    );
  }, []);

  return (
    <Carousel
      ref={ref}
      beforeChange={() => clearTimeout(timer)}
      afterChange={(currentSlide) => {
        const lifeTime = survey.questions[currentSlide].lifetimeSeconds;
        if (lifeTime !== "results")
          setTimer(
            setTimeout(() => {
              ref.current.next();
            }, lifeTime * 1000)
          );
      }}
      className={styles.carousel}
    >
      {survey.questions.map((question, i) => {
        return i !== survey.questions.length - 1 ? (
          <SurveyQuestion
            key={i}
            question={question}
            onSelect={() => ref.current.next()}
          />
        ) : (
          <div key={i}>Results</div>
        );
      })}
    </Carousel>
  );
}
