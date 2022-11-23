export default async function requestSubmit(
  surveyId,
  answerIds,
  contractWithWallet,
  setSubmitCd
) {
  try {
    (() => setSubmitCd(false))();
    await contractWithWallet.submit(surveyId, answerIds);
  } catch (error) {
    setSubmitCd(true);
    console.warn(error);
  }
}
