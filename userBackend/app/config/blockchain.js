const Web3 = require('web3');
const DigiFashion=require('../../../src/abis/DigiFashion.json')
const Token=require('../../../src/abis/Token.json')
//const CryptoBoys=require('../../../src/abis/CryptoBoys.json')
//const EthSwap=require('../../../src/abis/EthSwap.json')
//const Token=require('../../../src/abis/Token.json')

const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

//let marketplace, networkDataM, networkId, account;
let networkId, networkDataD, DigiFashionContract,tokenContract,networkDataT;
//let networkId,networkData,ethSwapData,tokenData,cryptoBoysContract,token,ethswap;
const initializeBlockchain = async () => {
  try {
    networkId = await web3.eth.net.getId();
    networkDataD = DigiFashion.networks[networkId];
    networkDataT = Token.networks[networkId]
    DigiFashionContract= new web3.eth.Contract(DigiFashion.abi, networkDataD.address);
    tokenContract = new web3.eth.Contract(Token.abi, networkDataT.address)
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts);

    // account = accounts[0];

    // const myBalance = await tokenContract.methods.balanceOf(account).call();

    // console.log(web3.utils.fromWei(myBalance.toString()), networkDataM.address);
    // networkId =  await web3.eth.net.getId();
    // networkData = CryptoBoys.networks[networkId];
    // ethSwapData = EthSwap.networks[networkId]
    // tokenData = Token.networks[networkId]
    // cryptoBoysContract = new web3.eth.Contract(CryptoBoys.abi, networkData.address)
    // token = new web3.eth.Contract(Token.abi, tokenData.address)
    // ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
  }
  catch (err) {
    console.log(err);
  }
};

const getMethods = async () => {
  return { 
    DigiFashionContract,
    networkDataD,
    networkDataT,  
    networkId,
    tokenContract
   // account
  };
};
// const getMethods = async () => {
//   return { 
//     cryptoBoysContract,
//     networkData,
//     token,  
//     networkId,
//     tokenData,
//     ethSwapData
//    // account
//   };
// };
module.exports = {
  initializeBlockchain,
  web3,
  getMethods,
};