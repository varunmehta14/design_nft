//const HDWalletProvider=require('@truffle/hdwallet-provider');
//const mnemonic=require("./secrets.json").mnemonic;

require("babel-register");
require("babel-polyfill");

module.exports = {
  networks: {
    
    development: {
      
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
  //   bscTestnet: {
  //     provider: () => new HDWalletProvider("comfort coconut oil atom cart lawn narrow rhythm dog skirt verb fringe", `https://data-seed-prebsc-1-s1.binance.org:8545`),
  //     network_id: 97,
  //     gas:5500000,
  //     confirmations: 10,
  //     timeoutBlocks: 200,
  //     skipDryRun: true
  //   },
  //   bsc: {
  //     provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
  //     network_id: 56,
  //     confirmations: 10,
  //     timeoutBlocks: 200,
  //     skipDryRun: true
  //   },
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
