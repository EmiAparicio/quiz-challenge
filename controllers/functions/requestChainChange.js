export default async function requestChainChange(chainId) {
  try {
    // Check chain ID (Goerli: 5)
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (error) {
    console.error(error);
  }
}
