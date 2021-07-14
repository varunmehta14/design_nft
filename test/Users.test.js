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
          
          result=await users.createUser("varunm14","mehtavarunj@gmail.com","varun__mehta__","hello repo","hello world","https://gateway.pinata.cloud/ipfs/QmZchsHzuXJrRN9mQERkUvRk5sbNSobgdTXYtryPWs283d",{ from: accounts[0] })
    
          result=await users.createUser("varunm15","mehtavarun@gmail.com","varun__mehta__","hello repo","hello world","https://gateway.pinata.cloud/ipfs/QmZchsHzuXJrRN9mQERkUvRk5sbNSobgdTXYtryPWs283d",{ from: accounts[1] })
           //reject since same account
           await users.createUser("varunm15","mehtavarunj@gmail.com","varun__mehta__","hello repo","hello world","https://gateway.pinata.cloud/ipfs/QmZchsHzuXJrRN9mQERkUvRk5sbNSobgdTXYtryPWs283d",{ from: accounts[1] }).should.be.rejected;
          userCount = await users.userCounter();
          assert.equal(userCount.toNumber(), 2);
    
          // result=await users.getIndexByAddress(accounts[1]);
          // assert.equal(result.toNumber(),2);
          
          result=await users.updateUser("varunm15","mehtavaru@gmail.com","varun__mehta","hello repo","hello world","https://gateway.pinata.cloud/ipfs/QmZchsHzuXJrRN9mQERkUvRk5sbNSobgdTXYtryPWs283d",{ from: accounts[1] });
          userCount = await users.userCounter();
          assert.equal(userCount.toNumber(), 2);
        });
        it("get id from address",async()=>{
          result=await users.addressToId("0x407457295C96810a95b4f11cf02D28772BED158A");
          assert.equal(result.toNumber(),0);
        });
        it("get  address from name",async()=>{
          result=await users.nameToAddress("varunm14");
          assert.equal(result,"0x407457295C96810a95b4f11cf02D28772BED158A");
        });
       
    });        
});
  