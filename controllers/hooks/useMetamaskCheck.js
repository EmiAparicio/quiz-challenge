import { useEffect, useState } from "react";

export default function useMetamaskCheck() {
  // Check for Metamask Extension every second
  const [metamaskInstalled, setMmskInstalled] = useState([false, null]);
  useEffect(() => {
    if (window.ethereum) setMmskInstalled([true, window.ethereum]);
    else {
      setInterval(() => {
        if (window.ethereum) setMmskInstalled([true, window.ethereum]);
      }, 1000);
      // location.reload();
    }
  }, []);

  // Return [boolean, metamask]
  return metamaskInstalled;
}
