import { Carousel } from "antd";
import { useRef, useState, useEffect, useContext } from "react";
import { ResultsContext } from "../../pages";
import SurveyQuestion from "./SurveyQuestion";
import SurveyResults from "./SurveyResults";
import styles from "./TriviaCarousel.module.css";

export default function TriviaCarousel({ survey }) {
  const ref = useRef();
  const [timer, setTimer] = useState(null);

  const [results, setResults] = useContext(ResultsContext);

  useEffect(() => {
    setTimer((prev) => {
      if (prev === null) {
        return setTimeout(() => {
          ref.current.next();
        }, survey.questions[0].lifetimeSeconds * 1000);
      } else return prev;
    });
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
            currentSlide={i + 1}
            onSelect={() => {
              clearTimeout(timer);
              ref.current.next();
            }}
          />
        ) : (
          <SurveyResults key={i} survey={survey} />
        );
      })}
    </Carousel>
  );
}
{
  /* {Object.values(results).map((e) => (
  <div>{e}</div>
))} */
}
