import { Button, Popover } from "antd";
import { useContext, useState } from "react";
import requestSubmit from "../../controllers/functions/requestSubmit";
import { ContractContext, ResultsContext } from "../../pages";

export default function SubmitSurvey({ disabled }) {
  const [contractWithWallet] = useContext(ContractContext);
  const [results] = useContext(ResultsContext);

  // Survey under cooldown
  const [submitCd, setSubmitCd] = useState(false);

  const [submited, setSubmission] = useState(false);

  return (
    <>
      {submited ? (
        <></>
      ) : (
        <Popover
          title="Cooldown period has not finished!"
          trigger="click"
          open={submitCd}
          onBlur={() => setSubmitCd(false)}
        >
          <Button
            disabled={disabled}
            type="primary"
            onClick={() =>
              requestSubmit(
                1,
                Object.values(results).map((r) => r.value),
                contractWithWallet,
                setSubmitCd,
                setSubmission
              )
            }
          >
            Submit
          </Button>
        </Popover>
      )}
    </>
  );
}
