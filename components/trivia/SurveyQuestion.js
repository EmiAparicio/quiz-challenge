import { Select } from "antd";
import { useContext } from "react";
import { ResultsContext } from "../../pages";

import styles from "./SurveyQuestion.module.css";

export default function SurveyQuestion({ question, onSelect, currentSlide }) {
  const { text, image, options } = question;
  const [results, setResults] = useContext(ResultsContext);

  const surveyOptions = (
    <>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <Select
        onSelect={(value) => {
          setResults((prev) => ({
            ...prev,
            [currentSlide]: { question: text, result: options[value - 1].text },
          }));
          onSelect();
        }}
        placeholder="Choose an option"
        options={options.map((option, i) => {
          return { value: i + 1, label: option.text };
        })}
      />
    </>
  );

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{text}</h3>
      {surveyOptions}
    </div>
  );
}
