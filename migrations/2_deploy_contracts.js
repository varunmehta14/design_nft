// const CryptoBoys = artifacts.require("CryptoBoys");
// const Token = artifacts.require("Token");
// const EthSwap = artifacts.require("EthSwap");
const DigiArt = artifacts.require("DigiArt");

module.exports = async function(deployer) {
  
  await deployer.deploy(DigiArt);
  const digiArt = await DigiArt.deployed()
  // await deployer.deploy(Token);
  // const token = await Token.deployed()
  // await deployer.deploy(EthSwap,token.address);
  // const ethSwap = await EthSwap.deployed()
  // await deployer.deploy(CryptoBoys);
  // await token.transfer('0x2ce7e1b29fC68D454F96425fA1488F7d2fF18Adb', '500000000000000000000');
  // await token.transfer('0xf0aC092bDeEfD5C0cA7babA45670203E4c9B06aa', '1000000000000000000000');
};
