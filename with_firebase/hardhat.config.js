require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ganache");

module.exports = {
  solidity: "0.8.19",
  
  paths: {
    artifacts: "./src/artifacts"
  },

  networks:{   
    ganache: {
      url: "http://0.0.0.0:8545",
      accounts: ['0x6c31a35b8fe86b024b6c971eeeda3a8a296d6967e2104eca9c780e76403d75bc']
    },

    // hardhat: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: "*" // Match any network id
    // },
    
  }
};