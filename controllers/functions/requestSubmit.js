export default async function requestSubmit(
  surveyId,
  answerIds,
  contractWithWallet,
  setSubmitCd,
  setSubmission
) {
  try {
    (() => setSubmitCd(false))();
    await contractWithWallet.submit(surveyId, answerIds);
    setSubmission(true);
  } catch (error) {
    if (error.reason !== "user rejected transaction") setSubmitCd(true);
    console.warn(error.reason);
  }
}
