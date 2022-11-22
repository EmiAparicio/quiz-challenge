import { createContext, useState } from "react";
import Head from "next/head";
import TriviaCard from "../components/trivia/TriviaCard";
import TriviaCarousel from "../components/trivia/TriviaCarousel";
import styles from "./Home.module.css";

import surveyData from "../seeders/survey-sample.json";
const survey = surveyData;
survey.questions.push({
  text: surveyData.title,
  image: surveyData.image,
  lifetimeSeconds: "results",
});

export const ResultsContext = createContext();

export default function Home() {
  const [triviaStarted, setTriviaStarted] = useState(false);
  const [results, setResults] = useState({});

  return (
    <div className={styles.body}>
      <Head>
        <title>Quiz Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <button>Connect Wallet</button>
      </header>

      <main>
        <h2 className={styles.title}>Quiz to Earn!</h2>

        <div className={styles.triviaContainer}>
          {!triviaStarted ? (
            <TriviaCard
              image={survey.image}
              title={survey.title}
              start={() => setTriviaStarted(true)}
            />
          ) : (
            <ResultsContext.Provider value={[results, setResults]}>
              <TriviaCarousel survey={survey} />
            </ResultsContext.Provider>
          )}
        </div>
      </main>
    </div>
  );
}
