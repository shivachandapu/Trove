import { useState, useRef, useEffect } from "react";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import { create } from "kubo-rpc-client";
import CryptoJS from "crypto-js";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from "../firebase";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import swal from "sweetalert";

const Main = ({ userId, id, cid, chunks, filename, createdate, filesize, filetype, reRender, setReRender }) => {
  const [notDownloaded, setnotDownload] = useState('false');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);


  // Handle Download
  const handleDownload = async () => {
    console.log(chunks);
    if (!chunks) {
      console.warn("No CID provided. Cannot download file.");
      return;
    }
    try {
      const ipfs = create({ url: "http://10.110.21.55:5001" });

      // ************To download the whole file with one CID *************
      const fileData = [];
      // for await (const chunk of ipfs.cat(cid)) {
      //   fileData.push(chunk);
      // }
      // const allChunks = await Promise.all(chunks.map((chunks) => ipfs.cat(chunks)));

      for (const chunk of chunks) {
        for await (const part of ipfs.cat(chunk)) {
          fileData.push(part);
        }
        // fileData.push(pt);
      }

      const buffer = new Uint8Array(
        fileData.reduce((accumulator, fileData) => accumulator.concat(Array.from(fileData)), [])
      );


      downloadFile(buffer, filetype, filename);
      swal({
        title: "File downloaded!",
        icon: "success",
        button: false,
        timer: 1000
      });
    } catch (error) {
      setnotDownload(true);
      swal({
        title: "Failed to download the File!",
        icon: "error",
        button: false,
        timer: 1000
      });
    }
  };

  // Function to download the file
  async function downloadFile(buffer, filetype, filename) {
    try {
      const blob = new File([buffer], filename, { type: filetype });
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error creating or downloading the file:", error);
    }
  }

  async function handleDelete() {
    try {
      const fileRef = doc(db, 'users', userId, 'files', id);
      const docSnap = await getDoc(fileRef);
      console.log(fileRef.id);
      if (docSnap.exists()) {
        // File exists, proceed with deletion
        await deleteDoc(fileRef);
        setReRender(true);
        console.log('The file is deleted!');
        swal({
          title: "Delete Successfull!",
          icon: "success",
          button: false,
          timer: 1000
        });
      } else {
        swal({
          title: "File dont exists!",
          icon: "error",
          button: false,
          timer: 1000
        });
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    console.log();
  }, [reRender]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <div className="file" style={{ position: "relative" }}>
      <div className="file-header">
        <p className="file-name">{filename}</p>
        {/* <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton> */}
        <div className="dropdown-container" ref={dropdownRef}>
          <MoreVertIcon onClick={toggleDropdown} />
          {showDropdown && (
            <div className="dropdown">
              <p onClick={handleDelete}>
                <DeleteIcon fontSize="small" /> Delete
              </p>
              <p onClick={handleDownload}>
                <DownloadIcon fontSize="small" /> Download
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="file-icon">
        <InsertDriveFileIcon />
      </div>

    </div>
  );
};
export default Main;
