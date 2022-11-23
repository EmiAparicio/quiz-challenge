import { Button, Tag } from "antd";
import { ethers } from "ethers";

import styles from "./WalletHeader.module.css";

// Components
import ConnectWallet from "./ConnectWallet";
import TokenBalance from "./TokenBalance";

// Hooks
import { useEffect, useContext, useMemo, useState } from "react";
import useMetamaskCheck from "../../controllers/hooks/useMetamaskCheck";
import { ContractContext } from "../../pages";

// Functions
import requestAccount from "../../controllers/functions/requestAccount";
import requestChain from "../../controllers/functions/requestChain";
import requestChainChange from "../../controllers/functions/requestChainChange";

// Constants
import CONTRACT_ABI from "../../seeders/abi.json";

export default function WalletHeader({ setConnection }) {
  const [contractWithWallet, setContractWithWallet] =
    useContext(ContractContext);

  // Check for Metamask Extension hook
  const [metamaskInstalled, metamask] = useMetamaskCheck();

  // Listen to wallet account change
  const [currentAddress, setCurrentAddress] = useState();
  const [accountsNumber, setAccNum] = useState();
  useEffect(() => {
    window.ethereum?.on("accountsChanged", () =>
      setAccNum(requestAccount(setCurrentAddress))
    );
  }, [currentAddress]);

  // Listen to chain change
  const [currentChain, setCurrentChain] = useState();
  const correctChain = useMemo(() => {
    const bool = currentChain === "0x5";
    return bool;
  }, [currentChain]);

  useEffect(() => setConnection(correctChain), [correctChain]);

  function connectionDone(address) {
    setCurrentAddress(() => {
      window.ethereum.on("chainChanged", () => requestChain(setCurrentChain));
      requestChain(setCurrentChain);

      return address;
    });
  }

  useEffect(() => {
    const provider = metamask && new ethers.providers.Web3Provider(metamask);

    const wallet = new ethers.Wallet(
      process.env.NEXT_PUBLIC_PRIVATE_KEY,
      provider
    );

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADD,
      CONTRACT_ABI,
      provider && provider.getSigner()
    );

    const contractWithWallet =
      accountsNumber === 1
        ? contract.connect(wallet)
        : contract.connect(provider?.getSigner());

    setContractWithWallet(contractWithWallet);
  }, [currentAddress, accountsNumber]);

  return (
    <div className={styles.headerContainer}>
      {!currentAddress ? (
        <ConnectWallet
          metamaskInstalled={metamaskInstalled}
          connectionDone={connectionDone}
        />
      ) : correctChain ? (
        <Tag className={styles.walletAddress}>
          {currentAddress.slice(0, 6)}...
          {currentAddress.slice(currentAddress.length - 4)}
        </Tag>
      ) : (
        <Button type="primary" onClick={() => requestChainChange("0x5")}>
          Change to Goerli Network
        </Button>
      )}

      {currentAddress && currentChain === "0x5" ? (
        <TokenBalance
          tokenName="$QUIZ"
          contractWithWallet={contractWithWallet}
          address={currentAddress}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
