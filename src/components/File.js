import { useState } from "react";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import { create } from "kubo-rpc-client";

const Main = ({ index, cid, metaData }) => {
  
  const [notDownloaded, setnotDownload] = useState('false');

  // Handle Download
  const handleDownload = async () => {
    if (!cid) {
      console.warn("No CID provided. Cannot download file.");
      return;
    }
    try {
      const ipfs = create({ url: "http://10.110.21.55:5001" });

      const fileData = [];
      for await (const chunk of ipfs.cat(cid)) {
        fileData.push(chunk);
      }

      const buffer = new Uint8Array(
        fileData.reduce((accumulator, chunk) => accumulator.concat(Array.from(chunk)),[])
      );

      downloadFile(buffer, metaData.file_type, metaData.file_name);
    } catch (error) {
      setnotDownload(true);
      console.error("Error downloading file from IPFS:", error);
    }
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
