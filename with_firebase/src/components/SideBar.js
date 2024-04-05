import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import GroupIcon from '@material-ui/icons/Group';
import ComputerIcon from '@material-ui/icons/Computer';
import HubIcon from '@mui/icons-material/Hub';
import AddIcon from '@material-ui/icons/Add';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { create } from 'kubo-rpc-client';
import { db } from "../firebase";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import swal from 'sweetalert';

const SideBar = ({
	sideBarOption,
	setSideBarOption,
	reRender,
	setReRender,
	contract,
	account,
	userId
}) => {
	// State Variables
	const [listActive1, setListActive1] = useState('list-item-active');
	const [listActive2, setListActive2] = useState('');
	const [listActive3, setListActive3] = useState('');
	const [open, setOpen] = useState(false);
	const [isFileUploaded, setIsFileUploaded] = useState(false);
	const [metaData, setMetaData] = useState({});
	const [file, setFile] = useState();

	const web3 = window.web3;

	const ipfs = create({ url: 'http://10.110.21.55:5001' });
	// Functions

	// Button Styles
	const useStyles = makeStyles({
		btn: {
			color: '#5F6368',
		},
		uploadbtn: {
			color: '#2185FC',
			fontSize: '40px',
		},
	});

	const classes = useStyles();

	// Functions
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleClick = (option) => {
		setSideBarOption(option);
	};


	// async function uploadFileToIPFS() {
	// 	const { cid } = await ipfs.add(file).catch((error) => {
	// 		console.error("Failed to add file to IPFS:", error);
	// 		throw error; // or return error;
	// 	});
	// 	return "" + cid;
	// };

	async function uploadFileToIPFS() {
		const desiredNumChunks = 12; 
		const reader = new FileReader();
		const fileArrayBuffer = await file.arrayBuffer();
		console.log("File Size: ", fileArrayBuffer);
		const fileSize = fileArrayBuffer.byteLength;
		
		const chunkSize = Math.ceil(fileSize / desiredNumChunks);

		const chunks = [];
		// const fileChunks = [];

		for (let i = 0; i < desiredNumChunks; i++) {
		const offset = i * chunkSize;
		const chunk = fileArrayBuffer.slice(offset, offset + chunkSize);
		const cid = await ipfs.add(chunk);
		chunks.push(cid.path.toString());
		// fileChunks.push(chunk);
}
		// return { chunks, fileChunks };
		console.log("Chunk cid's: ", chunks);
		// console.log("chunk file: ", fileChunks);
		return chunks; 	// array of chunks
	  }

	async function uploadMetaData(chunks) {
		try {
			if (db) {
				const { fileName, createDate, fileSize, type } = metaData;

				const fileRef = doc(db, "users", userId, "files", fileName);
				const docSnap = await getDoc(fileRef);

				if (docSnap.exists()) {
					swal({
						title: "File exists already!",
						icon: "error",
						button:false,
						timer: 1000
					  });
				}
				else {
					await setDoc(fileRef, {
						chunks: chunks,
						// cid: _cid,
						filename: fileName,
						createdate: serverTimestamp(),
						filesize: fileSize,
						filetype: type
					});
					console.log("The file is added!");
					swal({
						title: "File Uploaded!",
						icon: "success",
						button:false,
						timer: 1000
					  });
				}

				if (reRender) {
					setReRender(0);
				} else {
					setReRender(1);
				}
				setFile();
				setMetaData({});
				setIsFileUploaded(false);
			} else {
				console.error('Database not available');
			}
		} catch (error) {
			console.error(error);
		}

	};

	const handleUpload = async (e) => {
		handleClose();
		try {
			let start  = performance.now();
			const chunks = await uploadFileToIPFS(); //  return array of CID's
			await uploadMetaData(chunks);	
			console.log("Time taken: ", performance.now() - start);
		} catch (error) {
			console.error("Error during file upload:", error);
			console.log("Couldn't upload the file!");
		}
		e.target.files = {};
	};

	return (
		<div className="sidebar">

			<div className="upload-btn" onClick={handleOpen}>
				<AddIcon className={classes.uploadbtn} />
				Upload
			</div>
			{/* <widget> */}
			<Modal
				open={open}
				onClose={handleClose}
			>
				<Box className="upload-modal">
					{isFileUploaded ? (
						<div className="metaData">
							<p>File name : {metaData.fileName}</p>
							<p>Created : {metaData.createDate}</p>
							<p>size : {metaData.fileSize} MB</p>
							{ }
						</div>
					) : (
						<div >
						</div>
					)}

					{isFileUploaded ? (
						<Button
							className="upload-button"
							variant="contained"
							component="label"
							onClick={(e) => {
								handleUpload(e);
							}}
						>
							Upload
						</Button>
					) : (
						<Button variant="contained" component="label">
							Select File
							<input
								type="file"
								onChange={(e) => {
									setMetaData({
										fileName: e.target.files[0].name,
										createDate: new Date(
											e.target.files[0].lastModified
										).toDateString(),
										fileSize: (
											Math.round(
												e.target.files[0].size * Math.pow(10, -6) * 100
											) / 100
										).toFixed(3),
										type: e.target.files[0].type,
									});

									setFile(e.target.files[0]);
									setIsFileUploaded(true);
								}}
								hidden
							/>
						</Button>
					)}
				</Box>
			</Modal>
			{/* </widget> */}
			<ul className="sidebar-list">
				<li
					className={`list-item ${listActive1}`}
					onClick={() => {
						handleClick(0);
						setListActive1('list-item-active');
						setListActive2('');
						setListActive3('');
					}}
				>
					<ComputerIcon className={classes.btn} fontSize="large" />
					<p className="list-text">My Files</p>
				</li>
				
				<li
					className={`list-item ${listActive3}`}
					onClick={() => {
						handleClick(1);
						setListActive3('list-item-active');
						setListActive2('');
						setListActive1('');
					}}
				>
					<HubIcon className={classes.btn} fontSize="large" />
					<p className="list-text">Offer Storage</p>
				</li>

				<li
					className={`list-item ${listActive2}`}
					onClick={() => {
						handleClick(2);
						setListActive2('list-item-active');
						setListActive1('');
						setListActive3('');
					}}
				>
					<GroupIcon className={classes.btn} fontSize="large" />
					<p className="list-text">Dev</p>
				</li>

			</ul>
		</div>
	);
};

export default SideBar;
