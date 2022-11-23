export default async function requestAccount(connectionDone) {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let currentAddress = accounts[0];
    connectionDone(currentAddress);
  } catch (error) {
    console.error(error);
  }
}
