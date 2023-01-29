import axios from "axios";
import fileDownload from "js-file-download";

export async function DownloadFile(e, fileHash, fileName) {
  e.preventDefault();
  const url = `http://127.0.0.1:4000/getFiles/${fileHash}/${fileName}`;

  axios({
    url: url,
    method: "GET",
    responseType: "blob",
  }).then((res) => {
    fileDownload(res.data, fileName);
  });
}
