import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import GroupIcon from '@material-ui/icons/Group';
import ComputerIcon from '@material-ui/icons/Computer';
import AddIcon from '@material-ui/icons/Add';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { create } from 'kubo-rpc-client';
// import Web3 from 'web3';


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	borderRadius: 5,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

const SideBar = ({
	sideBarOption,
	setSideBarOption,
	reRender,
	setReRender,
	contract,
	account
}) => {
	// State Variables
	const [listActive1, setListActive1] = useState('list-item-active');
	const [listActive2, setListActive2] = useState('');
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

	// Function to upload user file to IPFS
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

	// Function to store the metadata in the blockchain
	async function uploadMetaData(_cid) { //Change this to firebase
		try {
			if (contract) {

				const { fileName, createDate, fileSize, type } = metaData;
				console.log("chunks: "+_cid);
				const tx = await contract.methods.uploadFile(_cid, fileName, createDate, fileSize, type).send({ from: account });
				await web3.eth.getTransactionReceipt(tx.transactionHash);

				if (reRender) {
					setReRender(0);
				} else {
					setReRender(1);
				}
				setFile();
				setMetaData({});
				setIsFileUploaded(false);
			} else {
				console.error('Contract not available');
			}
		} catch (error) {
			console.error('Error uploading metadata to the blockchain:', error);
		}
	};

	const handleUpload = async (e) => {
		let start = performance.now();
		try {
			const _cid = await uploadFileToIPFS();
			await uploadMetaData(_cid); 	// To blockchain
			handleClose();
			console.log("The file has been uploaded successfully!");
		} catch (error) {
			console.error("Error during file upload:", error);
			console.log("Couldn't upload the file!");
			// Handle any necessary error recovery or UI feedback here
		}
		e.target.files = {};
		console.log("Upload Time: ", performance.now() - start);
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
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className="upload-modal" sx={style}>
					{isFileUploaded ? (
						<div className="metaData">
							<p>File name : {metaData.fileName}</p>
							<p>Created : {metaData.createDate}</p>
							<p>size : {metaData.fileSize} MB</p>
							{ }
						</div>
					) : (
						<div className="metaData not-uploaded">
							<p>No files yet</p>
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
					}}
				>
					<ComputerIcon className={classes.btn} fontSize="large" />
					<p className="list-text">My Files</p>
				</li>
				<li
					className={`list-item ${listActive2}`}
					onClick={() => {
						handleClick(1);
						setListActive2('list-item-active');
						setListActive1('');
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
