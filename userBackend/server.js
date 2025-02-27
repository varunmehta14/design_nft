const express = require("express");
var bodyParser = require("body-parser");
const http = require('http');
const cors = require("cors");

const nodemailer = require("nodemailer");
const {google}=require("googleapis")
//const Web3 =require('web3')
// const CryptoBoys=require('../src/abis/CryptoBoys.json')
// const EthSwap=require('../src/abis/EthSwap.json')
// const Token=require('../src/abis/Token.json')

//const { authRequired } = require('./app/middleware/auth');
// const {initializeBlockchain}=require('./app/config/blockchain')
require("dotenv").config();
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
  
 
};
app.use(cors(corsOptions));
//const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
// parse requests of content-type - application/json
// app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));



//const router = express.Router();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb',  extended: true,parameterLimit:50000 }));
//app.use(cors(corsOptions));

app.use(express.json());


// app.get('/accounts', async (req,res) => {
//   try {
//     const accounts = await web3.eth.getAccounts();
//     console.log(res)
//     res.send(accounts);
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.post('/accountBalance', authRequired(), async (req,res) => {
//   try {
//     console.log("reqacc",req.body.account)
//     //let accountBalance = await web3.eth.getBalance(req.body.account);
//     //accountBalance = web3.utils.fromWei(accountBalance, "Ether");
//     console.log("netadd",networkData.address)
//     let tokenBalance = await token.methods.balanceOf(networkData.address).call()
//     let myTokenBalance = await token.methods.balanceOf(req.body.account).call()

//     console.log("myTokenBalance",myTokenBalance)
//     console.log("tokenBalance",tokenBalance)
//     res.send(myTokenBalance);
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.get('/count', async (req,res) => {
//   try {
//     const cryptoBoysCount = await cryptoBoysContract.methods
//           .cryptoBoyCounter()
//           .call();
//           console.log(cryptoBoysCount)
//     res.send(cryptoBoysCount);
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.get('/tokensMinted', async (req,res) => {
//   try {
//     let totalTokensMinted = await cryptoBoysContract.methods
//     .getNumberOfTokensMinted()
//     .call();
//   //totalTokensMinted = totalTokensMinted.toNumber();
//           console.log(totalTokensMinted)
//     res.send(totalTokensMinted);
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.get('/allDesigns', async (req,res) => {
//   try {
//     //let index=req.body.index;
//     let cryptoBoys=[];
//     //let index;
//    // index=app.get('/count')
//     const cryptoBoysCount = await cryptoBoysContract.methods
//           .cryptoBoyCounter()
//           .call();
//     for(let   i=1;i<=cryptoBoysCount;i++){
//       const cryptoBoy = await cryptoBoysContract.methods
//           .allCryptoBoys(i)
//           .call();
//           console.log(cryptoBoy)
//           cryptoBoys.push(cryptoBoy)
//     }
    
//     res.send(cryptoBoys);
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.post('/tokensOwnedByAccount', authRequired(), async (req,res) => {
//   try {
//     let index=req.body.account;
//     let totalTokensOwnedByAccount = await cryptoBoysContract.methods
//           .getTotalNumberOfTokensOwnedByAnAddress(index)
//           .call();
//         //totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
//     res.send(totalTokensOwnedByAccount);
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.post('/nameUsed', authRequired(), async (req,res) => {
//   try {
//     let index=req.body.name;
//     const nameIsUsed = await cryptoBoysContract.methods
//       .tokenNameExists(index)
//       .call();
//     res.send(nameIsUsed);
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.post('/imageUsed', authRequired(), async (req,res) => {
//   try {
//     let index=req.body.image;
//     const imageIsUsed=await cryptoBoysContract.methods
//     .imageExists(index).call();
//     res.send(imageIsUsed);
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.post('/createDesign', authRequired(), async (req,res) => {
//   try {
//     const { name, tokenURI, price, dressPrice,imageHash,amount,account,fee } = req.body;
//     console.log(price)
//     //await token.methods.approve(ethSwapData.address, price).send({ from: account }).on('transactionHash', (hash) => {
//     const gasP =await web3.eth.getGasPrice();
//     let myEstimatedGas;
//     cryptoBoysContract.methods
//         .mintCryptoBoy(name,tokenURI,price,dressPrice,
//           //imageHash
//           )
//         .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)
//          
//           myEstimatedGas=estimatedGas;
//         })
       
//     cryptoBoysContract.methods
//         .mintCryptoBoy(name,tokenURI,price,dressPrice,
//           //imageHash
//           )
//         .send({ from: account,gas:myEstimatedGas })
//         .on("transactionHash",(hash)=>{
//           res.json({ name, tokenURI, price, dressPrice,
//             //imageHash,
//             account })
//         })
//       //}) 
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.post('/toggleSale', authRequired(), async (req,res) => {
//   try {
//     const {tokenId,account,fee}=req.body;
//     const gasP =await web3.eth.getGasPrice();
//     let myEstimatedGas;
//     cryptoBoysContract.methods
//         .toggleForSale(tokenId)
//         .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)
//         =>{
//           myEstimatedGas=estimatedGas;
//         })
//     await cryptoBoysContract.methods
//     .toggleForSale(tokenId)
//     .send({ from: account,gas:myEstimatedGas })
//     .on("transactionHash",(hash)=>{
//       res.json({tokenId,account})
//     })
    
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.post('/changeTokenPrice', authRequired(), async (req,res) => {
//   try {
//     const {tokenId,newTokenPrice,account,fee}=req.body;
//     const gasP =await web3.eth.getGasPrice();
//     let myEstimatedGas;
//     await cryptoBoysContract.methods
//         .changeTokenPrice(tokenId, newTokenPrice)
//         .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)
//         =>{
//           myEstimatedGas=estimatedGas;
//         })
//     await cryptoBoysContract.methods
//     .changeTokenPrice(tokenId, newTokenPrice)
//     .send({ from: account,gas:myEstimatedGas })
//     .on("transactionHash",(hash)=>{
//       res.json({tokenId,newTokenPrice,account})
//     })
    
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.post('/changeTokenDressPrice', authRequired(), async (req,res) => {
//   try {
//     const {tokenId,newTokenPrice,account,fee}=req.body;
//     const gasP =await web3.eth.getGasPrice();
//     let myEstimatedGas;
//     await cryptoBoysContract.methods
//         .changeTokenDressPrice(tokenId, newTokenPrice)
//         .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)
//         =>{
//           myEstimatedGas=estimatedGas;
//         })
//     await cryptoBoysContract.methods
//     .changeTokenDressPrice(tokenId, newTokenPrice)
//     .send({ from: account,gas:myEstimatedGas })
//     .on("transactionHash",(hash)=>{
//       res.json({tokenId,newTokenPrice,account})
//     })
    
//   } catch (err) {
//     console.log(err);
//   }
// });
// app.post('/buyCryptoBoy', authRequired(), async (req,res) => {
//   try {
//     const {tokenId,price,account}=req.body;
//     console.log(price)
//     console.log("ethswapadd",ethSwapData.address)
//     const gasP =await web3.eth.getGasPrice();
//     let myEstimatedGas1,myEstimatedGas2;
//     await token.methods
//         .approve(ethSwapData.address, price)
//         .estimateGas({ from: account,gas:gasP },(error,estimatedGas)
//         =>{
//           myEstimatedGas2=estimatedGas;
//         })
//     await cryptoBoysContract.methods
//         .buyToken(tokenId,price,ethSwapData.address)
//         .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)
//         =>{
//           myEstimatedGas1=estimatedGas;
//         })

//     await token.methods.approve(ethSwapData.address, price).send({ from: account,gas:myEstimatedGas2 }).on('transactionHash', (hash) => {
//     console.log('approved')
//     //token.methods.transfer(account,price).send({ from: account,gas:3000000 }).on('transactionHash', (hash) => {
//     //console.log("here ")
//     cryptoBoysContract.methods
//     .buyToken(tokenId,price,ethSwapData.address)
//     .send({ from: account,gas:fee })
//     .on("transactionHash",(hash)=>{
//       res.json({tokenId,price,account})
//     })
//   //})
// })
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// app.post('/buyCryptoBoyWithDress', authRequired(), async (req,res) => {
//   try {
//     const {tokenId,price,account}=req.body;
//     const gasP =await web3.eth.getGasPrice();
//     let myEstimatedGas1,myEstimatedGas2;
//     await token.methods
//         .approve(ethSwapData.address, price)
//         .estimateGas({ from: account,gas:gasP },(error,estimatedGas)
//         =>{
//           myEstimatedGas2=estimatedGas;
//         })
//     await cryptoBoysContract.methods
//         .buyToken(tokenId,price,ethSwapData.address)
//         .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)
//         =>{
//           myEstimatedGas1=estimatedGas;
//         })
//    await token.methods
//         .approve(ethSwapData.address, price)
//         .send({ from: account,gas:myEstimatedGas2})
//         .on('transactionHash', (hash) => {
//      cryptoBoysContract.methods
//     .buyToken(tokenId,price,ethSwapData.address)
//     .send({ from: account,gas:myEstimatedGas1 })
//     .on("transactionHash",(hash)=>{
//       res.json({tokenId,price,account})
//     })
//   })
//   } catch (err) {
//     res.send("err");
//     console.log(err);
//   }
// });
// let networkId, networkData, cryptoBoysContract,token,ethSwapData,tokenData;
// const initialize = async () => {
  // networkId =  await web3.eth.net.getId();
  // networkData = CryptoBoys.networks[networkId];
  // ethSwapData = EthSwap.networks[networkId]
  // tokenData = Token.networks[networkId]
  // cryptoBoysContract = new web3.eth.Contract(CryptoBoys.abi, networkData.address)
  // token = new web3.eth.Contract(Token.abi, tokenData.address)
  // ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
//   //console.log(cryptoBoysContract.methods);
// };
// initializeBlockchain();
const db = require("./app/models");
db.sequelize.query("set FOREIGN_KEY_CHECKS=0");
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });
db.sequelize.sync();  

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to user application." });
  res.setHeader("Access-Control-Allow-Origin", "*")
});



  //  transporter.verify((err, success) => {
  //   err
  //     ? console.log(err)
  //     : console.log(`=== Server is ready to take messages: ${success} ===`);
  //  });
  const oAuth2Client=new google.auth.OAuth2(process.env.OAUTH_CLIENTID,process.env.OAUTH_CLIENT_SECRET,process.env.REDIRECT_URI)
  oAuth2Client.setCredentials({refresh_token:process.env.OAUTH_REFRESH_TOKEN})
   app.post("/send",  async function (req, res) {
  
  
     const accessToken= await oAuth2Client.getAccessToken();
     console.log('accessToken',accessToken);
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken:accessToken
    },
   });
    let mailOptions = {
      from: `${process.env.EMAIL}`,
      to: `${req.body.useemail}`,
      subject: `Message from: ${process.env.EMAIL}`,
      text: `Welcome aboard!`,
      html: '<b>Hey there! </b><br> Thanks for joining our platform',
      replyTo:`${process.env.EMAIL}`,
   
      //  attachments:[
      //      {
      //          path:`${req.body.formDetails}`
      //      }
      //  ]
    };
    console.log(mailOptions.from,mailOptions.to)
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err)
          res.json({
            status: "fail",
          });
        } else {
          console.log("== Message Sent ==");
          res.json({
            status: "success",
          });
        }
    })
      //});
   });
   app.post("/sendEmail",  async function (req, res) {
  
  
    const accessToken= await oAuth2Client.getAccessToken();
    console.log('accessToken',accessToken);
let transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
     type: "OAuth2",
     user: process.env.EMAIL,
     pass: process.env.WORD,
     clientId: process.env.OAUTH_CLIENTID,
     clientSecret: process.env.OAUTH_CLIENT_SECRET,
     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
     accessToken:accessToken
   },
  });
   let mailOptions = {
     from: `${process.env.EMAIL}`,
     to: [`${req.body.owner}`,`${req.body.curUser}`],
     subject: `Message from: ${process.env.EMAIL}`,
     text: `Item has been sold`,
     html: '<b>Hey there! </b><br> Item has been sold',
     replyTo:`${process.env.EMAIL}`,
  
      attachments:[
          {
              path:`${req.body.pdf}`
          }
      ]
   };
   console.log(mailOptions.from,mailOptions.to)
   transporter.sendMail(mailOptions, function (err, data) {
       if (err) {
           console.log(err)
         res.json({
           status: "fail",
         });
       } else {
         console.log("== Message Sent ==");
         res.json({
           status: "success",
         });
       }
   })
     //});
  });
   const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true
    }
}); 
// io.on('connection', socket => {
//   socket.on('Input Chat Message', async (msg) => {
//    try {
//       const msgSender = await User.findOne({email: msg.email})
//       let chat;

//       if(msg.grpMsg === false) {
//         chat = new Chat({
//           chatMessage: msg.chatMessage,
//           sender: msgSender._id,
//           senderName: msgSender.name,
//           senderEmail: msgSender.email,
//           type: msg.type,
//           grpMsg: msg.grpMsg,
//           roomId: msg.roomName,
//         });
//       }
//       else if(msg.grpMsg === true) {
//         chat = new Chat({
//           chatMessage: msg.chatMessage,
//           sender: msgSender._id,
//           senderName: msgSender.name,
//           senderEmail: msgSender.email,
//           type: msg.type,
//           grpMsg: msg.grpMsg,
//           grpId: msg.grpId,
//         });
//       }

//       chat.save((err, doc) => {
//         if(err) console.log(err);
//         Chat.find({'_id': doc._id})
//             .populate('sender')
//             .exec((err, doc) => {
//               return io.emit('Output Chat Message', doc)
//             })
//       });
//    } catch(error) {
//     console.log(error);
//    }
//   })
// })  
require("./app/routes/user.routes")(app);
require("./app/routes/nft.routes")(app);
//require("./app/routes/chat.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});