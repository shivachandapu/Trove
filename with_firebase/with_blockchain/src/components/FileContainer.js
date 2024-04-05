import React, { useState, useEffect } from 'react';
import File from './File';
import DevCard from './DevCard';
import { DevTeam } from './DevTeam';


const FileContainer = ({ sideBarOption, reRender, setReRender, contract, account }) => {
  const [files, setFiles] = useState([]);
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  // UseEffect
  useEffect(() => {
    getFiles();
  }, [contract,reRender]);


  // Functions
  async function getFiles() {
    try {
      if (contract) {
        console.log("Contract loaded successfully!");
        const NoF = await contract.methods.getNumberOfFiles().call({ from: account });
        setNumberOfFiles(NoF);
        const fetchedFiles = [];
        for (let i = 0; i < NoF; i++) {
          const { cid, metadata } = await contract.methods.getFile(i).call({ from: account });
          fetchedFiles.push({ index: i, cid, metadata });
        }
        setFiles(fetchedFiles)
        return fetchedFiles;
      }
      else {
        console.log("Contract not loaded!");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      throw error;
    }
  }

  // Render main according to side bar option
  if (sideBarOption === 0) {
    return (
      <div className="main">
        <div className="file-grid">

          {files ? (
            files.map((file, index) => (
              <File
                key={file.index}
                cid={file.cid}
                metaData={file.metadata}
              />
            ))
          ) : (
            <div>
              <p>
                Haven't uploaded any files!
              </p>
            </div>
          )
          }

        </div>
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
