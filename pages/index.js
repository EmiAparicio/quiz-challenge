import Head from "next/head";
import TriviaCard from "../components/trivia/TriviaCard";
import styles from "./Home.module.css";

import survey from "../seeders/survey-sample.json";
import { useState } from "react";

export default function Home() {
  const [triviaStarted, setTriviaStarted] = useState(false);
  console.log(triviaStarted);
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
          <TriviaCard
            image={survey.image}
            title={survey.title}
            start={() => setTriviaStarted(true)}
          />
        </div>
      </main>
    </div>
  );
}
