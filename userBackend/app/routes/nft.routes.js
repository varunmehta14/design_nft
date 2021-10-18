module.exports=app=>{
    const nfts=require("../controllers/nft.controller.js");
    const { authRequired } = require('../middleware/auth');
    var router = require("express").Router();
    //get All accounts
    router.get("/accountBalance/:id",authRequired(),nfts.getAccountBalance);
    //get Count
    router.get("/getCount",nfts.getCount);
    //get All designs
    router.get("/allDesigns",authRequired(),nfts.getAllDesigns);
    //get tokens minted
    router.get("/tokensMinted",nfts.getTokensMinted);
    //get tokens owned by account
    router.post("/tokensOwnedByAccount",authRequired(),nfts.getTokensOwnedByAccount);
    //get name is used
    router.post("/nameUsed",authRequired(),nfts.getNameIsUsed);
    //get image is used
    router.post("/imageUsed",authRequired(),nfts.getImageIsUsed);
    //create a design
    router.post("/createDesign",authRequired(),nfts.createDesign);
    //toggle sale
    router.post("/toggleSale",authRequired(),nfts.toggleSale);
    //change price
    router.post("/changeTokenPrice",authRequired(),nfts.changeTokenPrice);
    //change price
    router.post("/changeTokenDressPrice",authRequired(),nfts.changeTokenDressPrice);
    //buy design
    router.post("/buyCryptoBoy",authRequired(),nfts.buyCryptoBoy);
    //buy design with outfit
    router.post("/buyCryptoBoyWithDress",authRequired(),nfts.buyCryptoBoyWithDress);
    


    app.use('/api/nfts', router);
}