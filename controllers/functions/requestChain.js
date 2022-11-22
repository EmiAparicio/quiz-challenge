export default function requestChain(onObtainedChain) {
  try {
    // Check chain ID (Goerli: 5)
    let chainId;
    (async () => {
      chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      onObtainedChain(chainId);
    })();
  } catch (error) {
    console.error(error);
  }
}
