import { Typography } from "antd";

import { useEffect, useState } from "react";
import requestTokenBalance from "../../controllers/functions/requestTokenBalance";

import styles from "./TokenBalance.module.css";

export default function TokenBalance({
  tokenName,
  contractWithWallet,
  address,
}) {
  const [balance, setBalance] = useState();

  useEffect(() => {
    requestTokenBalance(contractWithWallet, address, setBalance);

    contractWithWallet.on("Transfer", () =>
      requestTokenBalance(contractWithWallet, address, setBalance)
    );
  }, [address, contractWithWallet]);

  return (
    <>
      {balance ? (
        <Typography.Text className={styles.balance}>
          {tokenName} balance: {balance}
        </Typography.Text>
      ) : (
        <></>
      )}
    </>
  );
}
