export default async function requestAccount(connectionDone) {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let currentAddress = accounts[0];
    connectionDone(currentAddress);
    return accounts.length;
  } catch (error) {
    console.error(error);
  }
}
