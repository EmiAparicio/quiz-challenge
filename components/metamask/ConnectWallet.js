import { Button } from "antd";

import styles from "./ConnectWallet.module.css";

import requestAccount from "../../controllers/functions/requestAccount";

export default function ConnectWallet({ metamaskInstalled, connectionDone }) {
  return (
    <Button type="primary" onClick={() => requestAccount(connectionDone)}>
      {!metamaskInstalled ? (
        <a
          href="https://metamask.io/download/"
          target="blank"
          className={styles.link}
        >
          Install Metamask
        </a>
      ) : (
        "Connect wallet"
      )}
    </Button>
  );
}
