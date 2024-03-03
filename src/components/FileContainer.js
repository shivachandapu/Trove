import React, { useState, useEffect } from 'react';
import File from './File';
import DevCard from './DevCard';
import { DevTeam } from './DevTeam';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const FileContainer = ({ sideBarOption, reRender, setReRender, contract, account, userId }) => {
  const [files, setFiles] = useState([]);
  
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
            <p>
              Haven't uploaded any files!
            </p>
          </div>
        )
        }

      </div>
    );
  } else {
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
