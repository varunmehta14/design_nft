const CryptoBoys = artifacts.require("CryptoBoys");
//const User = artifacts.require("User");

module.exports = async function(deployer) {
  await deployer.deploy(CryptoBoys);
 // await deployer.deploy(User);
};
