require("babel-register");
require("babel-polyfill");

module.exports = {
  networks: {
    
    development: {
      
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    binanceTestnet:{
      provider:()=>provider,
      network_id:"97",
      gas:1000000
    }
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "pragma",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
