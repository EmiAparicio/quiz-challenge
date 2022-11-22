import { Button, Result } from "antd";
import React, { useContext } from "react";
import { ResultsContext } from "../../pages";

import styles from "./SurveyResults.module.css";

export default function SurveyResults({ survey }) {
  const [results, setResults] = useContext(ResultsContext);

  const finishedSurvey =
    Object.keys(results).length < survey.questions.length - 1;

  const resultsStatus = finishedSurvey ? "warning" : "success";

  const resultsTitle = <div className={styles.title}>{survey.title}</div>;

  const resultsShown = (
    <div className={styles.resultsContainer}>
      {Object.values(results).map((result, i) => {
        return i !== results.length - 1 ? (
          <div key={i} className={styles.results}>
            {result.question}: {result.result}
          </div>
        ) : (
          <React.Fragment key={i} />
        );
      })}
    </div>
  );

  return (
    <Result
      className={styles.summaryContainer}
      status={resultsStatus}
      title={resultsTitle}
      subTitle={resultsShown}
      extra={[
        <button key="submit" disabled={finishedSurvey}>
          {finishedSurvey ? "Finish the survey!" : "Submit"}
        </button>,
      ]}
    />
  );
}
