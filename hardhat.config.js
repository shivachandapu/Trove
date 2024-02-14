require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  
  paths: {
    artifacts: "./src/artifacts"
  },

  networks:{   
    ganache: {
      url: "HTTP://0.0.0.0:7545",
      accounts: ['0x8c9773fc7ccb301a4a9cf0c778a85f2c6f61e6246fdb324896a6eae89e20e32a']
    },

    // hardhat: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: "*" // Match any network id
    // },
    
  }
};