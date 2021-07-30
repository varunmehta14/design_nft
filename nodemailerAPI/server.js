const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
const fs = require('fs').promises
const multer = require('multer')
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

// var Storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, "./images");
//     },
//     filename: function(req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     }
// });
// var upload = multer({
//     storage: Storage
// }).single("file"); 
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
   });
   transporter.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
   });

   app.post("/send", function (req, res) {
    // upload(req,res,function(err){
    //     if(err){
    //         console.log(err)
    //         return res.end("Something went wrong!");
    //     }else{
      // var file=req.body.file;
    let mailOptions = {
      from: `${req.body.buyerEmail}`,
      to: `${req.body.sendEmailTo}`,
      subject: `Message from: ${req.body.buyerEmail}`,
      text: `${req.body.feedBack}`,
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer',
      replyTo:`${req.body.buyerEmail}`,
    //   attachments:[
    //       {
    //           filename:`file1.pdf`,
    //           path:'./uploadedFile'
    //       }
    //   ]
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
const port = 8000;
app.listen(port, () => {
 console.log(`Server is running on port: ${port}`);
});