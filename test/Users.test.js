const { assert } = require("chai");

const Users = artifacts.require("./Users.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Crypto Boys", async (accounts) => {
    let users, result, cryptoBoyCount,userCount;

    before(async () => {
        users = await Users.deployed();
    });
    describe("Deployment", async () => {
        it("contract has an address", async () => {
        const address = await users.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        });
    });
    describe("application features", async () => {
        it("create user", async () => {
          userCount = await users.userCounter();
          assert.equal(userCount.toNumber(), 0);
          
          result=await users.createUser("varunm14","https://gateway.pinata.cloud/ipfs/QmZchsHzuXJrRN9mQERkUvRk5sbNSobgdTXYtryPWs283d","mehtavarunj@gmail.com","varun__mehta__","hello repo","hello world",{ from: accounts[0] })
    
          result=await users.createUser("varunm15","https://gateway.pinata.cloud/ipfs/QmZchsHzuXJrRN9mQERkUvRk5sbNSobgdTXYtryPWs283d","mehtavarun@gmail.com","varun__mehta__","hello repo","hello world",{ from: accounts[1] })
           //reject since same account
           await users.createUser("varunm15","https://gateway.pinata.cloud/ipfs/QmZchsHzuXJrRN9mQERkUvRk5sbNSobgdTXYtryPWs283d","mehtavarunj@gmail.com","varun__mehta__","hello repo","hello world",{ from: accounts[1] }).should.be.rejected;
          userCount = await users.userCounter();
          assert.equal(userCount.toNumber(), 2);
    
          // result=await users.getIndexByAddress(accounts[1]);
          // assert.equal(result.toNumber(),2);
          
          result=await users.updateUser("varunm15","https://gateway.pinata.cloud/ipfs/QmZchsHzuXJrRN9mQERkUvRk5sbNSobgdTXYtryPWs283d","mehtavaru@gmail.com","varun__mehta","hello repo","hello world",{ from: accounts[1] });
          userCount = await users.userCounter();
          assert.equal(userCount.toNumber(), 2);
        });
    });        
});
  