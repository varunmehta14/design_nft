// const CryptoBoys = artifacts.require("CryptoBoys");
//  const Token = artifacts.require("Token");
//  const DigiFashion = artifacts.require("DigiFashion");
// // const EthSwap = artifacts.require("EthSwap");
// // //const DigiArt = artifacts.require("DigiArt");
// // //const ERC1155 = artifacts.require("ERC1155");
// // module.exports = async function(deployer) {
// //   await deployer.deploy(Token);
// //   const token = await Token.deployed()
// //   //await deployer.deploy(ERC1155);
// //   //const ERC1155 = await ERC1155.deployed()
// //   //await deployer.deploy(DigiArt);
// //   //const digiArt = await DigiArt.deployed()
// //   //await deployer.deploy(Token);
// //   //const token = await Token.deployed()

// //   // await deployer.deploy(Token);
// //   // const token = await Token.deployed()
// //    await deployer.deploy(EthSwap,token.address);
// //   const ethSwap = await EthSwap.deployed()
// //    await deployer.deploy(CryptoBoys);
// //    const cryptoBoys=await CryptoBoys.deployed()
// //   // await token.transfer('0x2ce7e1b29fC68D454F96425fA1488F7d2fF18Adb', '500000000000000000000');
// //   // await token.transfer('0xf0aC092bDeEfD5C0cA7babA45670203E4c9B06aa', '1000000000000000000000');
// // };
// const CryptoBoys = artifacts.require("CryptoBoys");
// const Token = artifacts.require("Token");
// const EthSwap = artifacts.require("EthSwap");
const DigiFashion = artifacts.require("DigiFashion");
const Token = artifacts.require("Token");
module.exports = async function(deployer) {
  
  await deployer.deploy(Token);
  const token = await Token.deployed()
  // await deployer.deploy(EthSwap,token.address);
  // const ethSwap = await EthSwap.deployed()
  // await deployer.deploy(CryptoBoys);
  await deployer.deploy(DigiFashion);
} 