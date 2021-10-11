module.exports=app=>{
    const nfts=require("../controllers/nft.controller.js");
    var router = require("express").Router();
    //get All accounts
    router.post("/accountBalance",nfts.accountBalance);
    app.use('/api/nfts', router);
}