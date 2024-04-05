import React, { useState, useEffect } from 'react';
import File from './File';
import DevCard from './DevCard';
import { DevTeam } from './DevTeam';
import { db } from "../firebase";
import Button from '@mui/material/Button';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { collection, getDocs } from "firebase/firestore";
import GlobalStyles from '@mui/material/GlobalStyles';
import swal from 'sweetalert';
import $ from 'jquery';

const FileContainer = ({ sideBarOption, reRender, setReRender, contract, account, userId }) => {
  const [files, setFiles] = useState([]);
  const [ipAddress, setIpAddress] = useState('');

  const web3 = window.web3;

  async function getAllFiles() {
    if (!userId)
      return;
    const fileList = collection(db, "users", userId, "files");
    getDocs(fileList)
      .then((fileSnapshot) => {
        setFiles(fileSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() })
        ));
      })
      .catch((err) => {
        console.error("Could not find the files!", err);
      });
  }

  useEffect(() => {
    getAllFiles();
  }, [userId, reRender]);

  useEffect(() => {
  }, [files]);


  const handleOfferStorage = async () => {

    try {
      if (contract) {
        swal({
          title: "Storage added",
          icon: "success",
          button: false,
          timer: 1000
        });

        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ipAddress = data.ip;
        console.log('IP Address:', ipAddress);

        const tx = await contract.methods.addStorage(userId).send({ from: account });
        await web3.eth.getTransactionReceipt(tx.trasactionHash);

      } else {
        console.error('contract not available!');
      }
    } catch (error) {
      console.error('Couldn\'t offer storage! ', error);
    }

  };

  // Render main according to side bar option
  if (sideBarOption === 0) {

    return (
      <div className="main">
        {files.length ? (
          <div className="file-grid">
            {files.map((file) => (
              <File
                userId={userId}
                key={file.id}
                id={file.id}
                chunks={file.chunks}
                filename={file.filename}
                createdate={file.createdate}
                filesize={file.filesize}
                filetype={file.filetype}
                reRender={reRender}
                setReRender={setReRender}
              />
            ))}
          </div>
        ) : (
          <div className="no-files-uploaded-message">
            <div className="no-file-icon">
              <InsertDriveFileOutlinedIcon fontSize="large" />
              <div className="text">No Files Uploaded!</div>
            </div>
          </div>

        )
        }

      </div>
    );
  }
  else if (sideBarOption === 1) {
    return (
      <div className="offer-storage" >

        <Button variant='contained' onClick={handleOfferStorage}> Offer storage </Button>
      </div>
    );
  }
  else {
    return (
      <div className="dev-team">
        {DevTeam.map((team) => (
          <DevCard team={team} key={team.id} />
        ))}
      </div>
    );
  }
};

export default FileContainer;
// style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}