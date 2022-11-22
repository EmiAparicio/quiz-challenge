import { Select } from "antd";
import { Image } from "antd";
import { useEffect } from "react";

import styles from "./SurveyQuestion.module.css";

export default function SurveyQuestion({ question, onSelect }) {
  const { text, image, options } = question;

  const surveyOptions = (
    <>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <Select
        onSelect={onSelect}
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
