import { ethers } from "ethers";
import SendFile from "../../artifacts/contracts/Files.sol/Files.json";

export async function sendFile(file) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    "0x9C07193a8d2AB07D5b30507462b1988513a17603",
    SendFile.abi,
    signer
  );

  console.log(contract);

  const contractData = await contract.createFiles(
    file.name,
    file.hash,
    file.size,
    ["0x"]
  );

  await contractData.wait();
  console.log("data: ", contractData);
}
