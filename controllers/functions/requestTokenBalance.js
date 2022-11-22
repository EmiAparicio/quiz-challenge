import { ethers } from "ethers";

export default async function requestTokenBalance(
  contractWithWallet,
  address,
  setBalance
) {
  try {
    const balance = await contractWithWallet.balanceOf(address);
    setBalance(ethers.utils.formatEther(balance));
  } catch (error) {
    console.error(error);
  }
}
