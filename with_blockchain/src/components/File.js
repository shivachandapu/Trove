import { useState } from "react";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import { create } from "kubo-rpc-client";

const Main = ({ index, cid, metaData }) => {
  
  const [notDownloaded, setnotDownload] = useState('false');

  // Handle Download
  // const handleDownload = async () => {
  //   if (!cid) {
  //     console.warn("No CID provided. Cannot download file.");
  //     return;
  //   }
  //   try {
  //     const ipfs = create({ url: "http://10.110.21.55:5001" });

  //     const fileData = [];
  //     for await (const chunk of ipfs.cat(cid)) {
  //       fileData.push(chunk);
  //     }

  //     const buffer = new Uint8Array(
  //       fileData.reduce((accumulator, chunk) => accumulator.concat(Array.from(chunk)),[])
  //     );

  //     downloadFile(buffer, metaData.file_type, metaData.file_name);
  //   } catch (error) {
  //     setnotDownload(true);
  //     console.error("Error downloading file from IPFS:", error);
  //   }
  // };


  const handleDownload = async () => {
    let start = performance.now()
    console.log(cid);

    if (!cid) {
      console.warn("No CID provided. Cannot download file.");
      return;
    }
    try {
      const ipfs = create({ url: "http://10.110.21.55:5001" });

      // ************To download the whole file *************
      const fileData = [];
      for (const chunk of cid) {
        for await (const part of ipfs.cat(chunk)) {
          fileData.push(part);
        }
      }

      let b = [];

      console.log("FileData length: ", fileData.length);

      for (let i = 0; i < fileData.length; i++) {
        let tmp = Array.from(fileData[i]);
        for (let j = 0; j < tmp.length; j++) {
          b.push(tmp[j]);
        }
      }

      const buffer = new Uint8Array(b);
      console.log("buffer: ",buffer);



      await downloadFile(buffer, metaData.file_type, metaData.file_name);
    } catch (error) {
      console.log(error);
      setnotDownload(true);
    }
    console.log("Download time: ", performance.now()-start);
  };



  // Function to download the file
  async function downloadFile(buffer, fileType, fileName) {
    try {
      const blob = new Blob([buffer], { type: fileType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  return (
    <div className="file">
      <div className="file-header">
        <p className="file-name">{metaData.file_name}</p>
      </div>

      <div className="file-icon">
        <InsertDriveFileIcon />
      </div>

      <div className="file-footer">
        <p></p>
        <IconButton onClick={handleDownload}>
          <DownloadIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default Main;
