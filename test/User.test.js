// const { assert } = require("chai");

// const User = artifacts.require("./User.sol");

// require("chai")
//   .use(require("chai-as-promised"))
//   .should();

// contract("User", async (accounts) => {
//   let users, result, userCount;

//   before(async () => {
//     users = await User.deployed();
//   });

//   describe("Deployment", async () => {
//     it("contract has an address", async () => {
//       const address = await users.address;
//       assert.notEqual(address, 0x0);
//       assert.notEqual(address, "");
//       assert.notEqual(address, null);
//       assert.notEqual(address, undefined);
//     });
//     })
//     describe("application features", async () => {
//         it("create user", async () => {
//             userCount = await users.getUserCount();
//             assert.equal(userCount.toNumber(), 0);
            
//             result=await users.createUser("varunm14","QmZchsHzuXJrRN9mQERkUvRk5sbNSobgdTXYtryPWs283d",{ from: accounts[0] })
            
//             userCount = await users.getUserCount();
//             assert.equal(userCount.toNumber(), 1);
//         });
//     })  

// })