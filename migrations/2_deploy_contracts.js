const CryptoBoys = artifacts.require("CryptoBoys");
const Users = artifacts.require("Users");

module.exports = async function(deployer) {
  await deployer.deploy(CryptoBoys);
  await deployer.deploy(Users);
};
