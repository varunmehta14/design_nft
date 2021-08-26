const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const {google}=require("googleapis")
require("dotenv").config();
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
 
};

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb',  extended: true }));

app.use(cors(corsOptions));

app.use(express.json());

const db = require("./app/models");

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });
db.sequelize.sync();  

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to user application." });
});



  //  transporter.verify((err, success) => {
  //   err
  //     ? console.log(err)
  //     : console.log(`=== Server is ready to take messages: ${success} ===`);
  //  });

   app.post("/send",  function (req, res) {
  
   const oAuth2Client=new google.auth.OAuth2(process.env.OAUTH_CLIENTID,process.env.OAUTH_CLIENT_SECRET,process.env.REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:process.env.OAUTH_REFRESH_TOKEN})
     const accessToken=  oAuth2Client.getAccessToken();
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
      from: `${req.body.buyerEmail}`,
      to: `${req.body.sendEmailTo}`,
      subject: `Message from: ${req.body.buyerEmail}`,
      text: `${req.body.feedBack}`,
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer',
      replyTo:`${req.body.buyerEmail}`,
   
       attachments:[
           {
               path:`${req.body.formDetails}`
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
require("./app/routes/user.routes")(app);
// set port, listen for requests

// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.EMAIL,
//     pass: process.env.WORD,
//    // clientId: process.env.OAUTH_CLIENTID,
//    // clientSecret: process.env.OAUTH_CLIENT_SECRET,
//    // refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//   },
//  });
// //  transporter.verify((err, success) => {
// //   err
// //     ? console.log(err)
// //     : console.log(`=== Server is ready to take messages: ${success} ===`);
// //  });

//  app.post("/api/users/send", function (req, res) {
//   // upload(req,res,function(err){
//   //     if(err){
//   //         console.log(err)
//   //         return res.end("Something went wrong!");
//   //     }else{
//     // var file=req.body.file;
//   let mailOptions = {
//     from: `${req.body.buyerEmail}`,
//     to: `${req.body.sendEmailTo}`,
//     subject: `Message from: ${req.body.buyerEmail}`,
//     text: `${req.body.feedBack}`,
//     html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer',
//     replyTo:`${req.body.buyerEmail}`,
//   //   attachments:[
//   //       {
//   //           filename:`file1.pdf`,
//   //           path:'./uploadedFile'
//   //       }
//   //   ]
//      attachments:[
//          {
//              path:`${req.body.formDetails}`
//          }
//      ]
//   };
//   console.log(mailOptions.from,mailOptions.to)
//   transporter.sendMail(mailOptions, function (err, data) {
//       if (err) {
//           console.log(err)
//         res.json({
//           status: "fail",
//         });
//       } else {
//         console.log("== Message Sent ==");
//         res.json({
//           status: "success",
//         });
//       }
//   })
//     //});
//  });
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});