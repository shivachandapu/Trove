#  Trove: A Decentralized File Storage System

The demand for secure and efficient cloud storage solutions has surged in recent years, driven by the exponential growth of digital data and the need for reliable storage options. In response to these challenges, this project introduces ”Trove,” a decentralized file storage system that leverages blockchain technology and the InterPlanetary File System (IPFS) to provide a secure, scalable, and resilient cloud storage solution. Trove aims to address the limitations of centralized storage systems by distributing data across a network of nodes, ensuring data integrity, availability, and privacy. One of the key features of Trove is its mechanism for storage providers, where users can offer their unused storage space to the network, thereby contributing to the overall storage capacity. Through a user-friendly interface and robust authentication mechanisms, Trove offers a seamless experience for both regular users and storage providers.

# Installation steps
## Install `NodeJS`
Start by updating the system. Run the following commands to do so.
```bash
sudo apt update
sudo apt upgrade
```
If you don’t already have `curl` installed, follow the command below to install it. 
We’ll be using that to download the installation script from `NodeSource`.
```bash
sudo apt install -y curl
```
Run the following commands to install `nodeJS v18`.
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```
```bash
sudo apt install -y nodejs
```
To verify the instalation, run
```bash
node --version
```
## Clone the repository
```bash
git clone https://github.com/shivachandapu/Trove.git
cd Trove
```
## Install IPFS
To install `IPFS`, follow the instructions from `README.md` file given in the ipfs folder.

> [!NOTE]
> There are two variations of Trove.
> 
> In `with_blockchain` varient, the metadata of the uploaded files is stored in the blockchain.
> In `with_firebase` varient, the metadata of the uploaded files is stored in the Google's Firebase Firestore.
> Its upto you which one to choose.

## `with_blockhain`
Follow the [link](https://www.geeksforgeeks.org/how-to-set-up-ganche-with-metamask/) to install Ganache and connect it to Metamask Wallet.
Also configure the `hardhat.config.js` as per your usage.

Run the below commands to install Node modules,
```bash
cd with_blockchain
npm install
```
Run the below commands to run and compile the solidity code with the `Hardhat`
```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js localhost
```
Assign the deployed contract address to the variable with the name `contractAddress` in `with_blockchain/src/components/Dashboard.js` component file.

## `with_firebase`

Run the below commands to install Node modules,
```bash
cd with_firebase
npm install
```
Change the below configuration in the `firebas.js` file from `with_firebase/src/firebase.js` with your Firebase app configurations. 
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBmsBjVs8nCnXVTuslfEeASfPHLu29p7oM",
  authDomain: "trove-5562d.firebaseapp.com",
  projectId: "trove-5562d",
  storageBucket: "trove-5562d.appspot.com",
  messagingSenderId: "418190465387",
  appId: "1:418190465387:web:faf78960c4e17ef636d42e"
};
```
Follow the [firebase setup tutorial](https://firebase.google.com/docs/web/setup) to setup and connect the firebase to the app.

Now the follow the later steps from `with_blockchain` section to install it.

## Start the app
After instalation, go the respective directory. 

Run the following command to start the app
```bash
npm start
```






