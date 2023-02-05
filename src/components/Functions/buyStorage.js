import axios from "axios";
import { ethers } from "ethers";
import buyStorageAbi from "../../artifacts/contracts/BuyStorage.sol/BuyStorage.json";

// Contract Address: 0x1bc08989E95e8526599da20D3eE0b6F2792E51FB

async function buyRole(ContractValue, role, price) {
  if (typeof window.ethereum !== "undefined") {
    try {
      let dataArray = [];

      console.log(dataArray);

      const date = new Date();

      const options = { value: ethers.utils.parseEther(price) };

      const data = await ContractValue(date.toString(), options);

      console.log(data);

      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc-mumbai.maticvigil.com/"
      );

      const signer = new ethers.Wallet(
        "9733586d1a9fa3e39693f88edf37a8d175fbae68161cfdc9653949c82e6593fc",
        provider
      );

      const contract = new ethers.Contract(
        "0x1bc08989E95e8526599da20D3eE0b6F2792E51FB",
        buyStorageAbi.abi,
        signer
      );

      const SendMonyData = await contract.SendMony(
        "0x88061898981aBB027Ec85093C4d1b73423f5720e"
      );

      console.log(SendMonyData);
      console.log(dataArray);

      alert(role + "Buyed");
      window.location.href = "/admin/tables";
    } catch (error) {
      console.error(error);
    }
  }
}

export async function buyGold(e) {
  e.preventDefault();
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x1bc08989E95e8526599da20D3eE0b6F2792E51FB",
      buyStorageAbi.abi,
      signer
    );
    buyRole(contract.buyGold, "gold", "0.003");
  }
}

export async function buyPreminum(e) {
  e.preventDefault();
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x1bc08989E95e8526599da20D3eE0b6F2792E51FB",
      buyStorageAbi.abi,
      signer
    );
    buyRole(contract.buyPreminum, "preminum", "0.005");
  }
}

export async function getAccountType(pubKey) {
  const url = `http://127.0.0.1:4000/getAccountType/${pubKey}`;

  axios({
    url: url,
    method: "POST",
    responseType: "blob",
  }).then((res) => {
    console.log(res);

    return res.data.data;
  });
}
