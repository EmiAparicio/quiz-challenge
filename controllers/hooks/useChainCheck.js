import { useEffect } from "react";

export default function useChainCheck() {
  // Check for Metamask Extension every second
  useEffect(() => {
    if (window.ethereum) setMmskInstalled(true);
    else {
      setInterval(() => {
        if (window.ethereum) setMmskInstalled(true);
      }, 1000);
    }
  }, [metamaskInstalled]);

  // Return boolean
  return metamaskInstalled;
}
