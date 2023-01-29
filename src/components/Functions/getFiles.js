import axios from "axios";

export async function getFile(pubKey) {
  const url = `http://127.0.0.1:4000/getFilesFromContract/${pubKey}`;

  axios.get(url).then((response) => {
    console.log(response.data.data);

    return response.data.data;
  });
}
