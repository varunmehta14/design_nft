const {web3,getMethods} = require("../config/blockchain");
// const { DigiFashionContract,
//   networkDataD,
//   token,  
//   networkId,
//   tokenData,
//   networkDataD}=getMethods();

exports.getAccountBalance=async(req,res)=>{
    try {
        console.log("reqacc",req.params.id)
        //let accountBalance = await web3.eth.getBalance(req.body.account);
        //accountBalance = web3.utils.fromWei(accountBalance, "Ether");
        const { 
          networkDataD,
          tokenContract  
          }=await getMethods();
          console.log(tokenContract.methods)
        console.log("netadd",networkDataD.address)
        let tokenBalance = await tokenContract.methods.balanceOf(networkDataD.address).call()
        let myTokenBalance = await tokenContract.methods.balanceOf(req.params.id).call()
    
        console.log("myTokenBalance",myTokenBalance)
        console.log("tokenBalance",tokenBalance)
        res.send(myTokenBalance);
      } catch (err) {
        res.send("err");
        console.log(err);
      }
}

exports.getCount=async(req,res)=>{
  try {
    const {DigiFashionContract}=await getMethods();
    console.log(DigiFashionContract.methods)
    const cryptoBoysCount = await DigiFashionContract.methods
          .cryptoBoyCounter()
          .call();
          console.log(cryptoBoysCount)
    res.send(cryptoBoysCount);
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}

exports.getAllDesigns=async(req,res)=>{
  try {
    const {DigiFashionContract} =await getMethods();
    //let index=req.body.index;
    let cryptoBoys=[];
    //let index;
   // index=app.get('/count')
    const cryptoBoysCount = await DigiFashionContract.methods
          .cryptoBoyCounter()
          .call();
    for(let   i=1;i<=cryptoBoysCount;i++){
      const cryptoBoy = await DigiFashionContract.methods
          .allCryptoBoys(i)
          .call();
          console.log(cryptoBoy)
          cryptoBoys.push(cryptoBoy)
    }
    
    res.send(cryptoBoys);
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}

exports.getTokensMinted=async(req,res)=>{
  try {
    const  {DigiFashionContract}=await getMethods();
    let totalTokensMinted = await DigiFashionContract.methods
    .getNumberOfTokensMinted()
    .call();
  //totalTokensMinted = totalTokensMinted.toNumber();
    console.log(totalTokensMinted)
    res.send(totalTokensMinted);
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}
exports.getTokensOwnedByAccount=async(req,res)=>{
  try {
    const  {DigiFashionContract}=await getMethods();
    let index=req.body.account;
    console.log(index)
    let totalTokensOwnedByAccount = await DigiFashionContract.methods
          .getTotalNumberOfTokensOwnedByAnAddress(index)
          .call();
        //totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
    res.send(totalTokensOwnedByAccount);
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}
exports.getNameIsUsed=async(req,res)=>{
  try {
    const  {DigiFashionContract}=await getMethods();
    let index=req.body;
    const nameIsUsed = await DigiFashionContract.methods
      .tokenNameExists(index)
      .call();
    res.send(nameIsUsed);
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}
exports.getImageIsUsed=async(req,res)=>{
  try {
    const {DigiFashionContract}=await getMethods();
    let index=req.body;
    const imageIsUsed=await DigiFashionContract.methods
    .imageExists(index).call();
    res.send(imageIsUsed);
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}

exports.createDesign=async(req,res)=>{
  try {
    const  {DigiFashionContract}=await getMethods();
    const { name, tokenURI, price, dressPrice,imageHash,amount,account } = req.body;
    console.log(price)
    //await tokenContract.methods.approve(networkDataD.address, price).send({ from: account }).on('transactionHash', (hash) => {
    const gasP =await web3.eth.getGasPrice();
    let myEstimatedGas;
    await DigiFashionContract.methods
        .mintCryptoBoy(name,tokenURI,price,dressPrice,
          imageHash
          )
        .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)=>{
          console.log("EstimatedGas",estimatedGas);  
          myEstimatedGas=estimatedGas;
          console.log("myEstimatedGas",myEstimatedGas);  
        })
     console.log("myEstimatedGas",myEstimatedGas);  
    DigiFashionContract.methods
        .mintCryptoBoy(name,tokenURI,price,dressPrice,
          imageHash
          )
        .send({ from: account,gas:myEstimatedGas })
        .on("transactionHash",(hash)=>{
          res.json({ name, tokenURI, price, dressPrice,
            //imageHash,
            account })
        })
      //}) 
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}
exports.toggleSale=async(req,res)=>{
  try {
    const  {DigiFashionContract}=await getMethods();
    const {tokenId,account}=req.body;
    const gasP =await web3.eth.getGasPrice();
    let myEstimatedGas;
    await DigiFashionContract.methods
        .toggleForSale(tokenId)
        .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)=>{
          myEstimatedGas=estimatedGas;
        })
    await DigiFashionContract.methods
    .toggleForSale(tokenId)
    .send({ from: account,gas:myEstimatedGas })
    .on("transactionHash",(hash)=>{
      res.json({tokenId,account})
    })
    
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}
exports.changeTokenPrice=async(req,res)=>{
  try {
    const  {DigiFashionContract}=await getMethods();
    const {tokenId,newTokenPrice,account}=req.body;
    const gasP =await web3.eth.getGasPrice();
    let myEstimatedGas;
    await DigiFashionContract.methods
        .changeTokenPrice(tokenId, newTokenPrice)
        .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)=>{
          myEstimatedGas=estimatedGas;
        })
    await DigiFashionContract.methods
    .changeTokenPrice(tokenId, newTokenPrice)
    .send({ from: account,gas:myEstimatedGas })
    .on("transactionHash",(hash)=>{
      res.json({tokenId,newTokenPrice,account})
    })
    
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}

exports.changeTokenDressPrice=async(req,res)=>{
  try {
    const  {DigiFashionContract}=await getMethods();
    const {tokenId,newTokenPrice,account}=req.body;
    const gasP =await web3.eth.getGasPrice();
    let myEstimatedGas;
    await DigiFashionContract.methods
        .changeTokenDressPrice(tokenId, newTokenPrice)
        .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)=>{
          myEstimatedGas=estimatedGas;
        })
    await DigiFashionContract.methods
    .changeTokenDressPrice(tokenId, newTokenPrice)
    .send({ from: account,gas:myEstimatedGas })
    .on("transactionHash",(hash)=>{
      res.json({tokenId,newTokenPrice,account})
    })
    
  } catch (err) {
    console.log(err);
  }
}

exports.buyCryptoBoy=async(req,res)=>{
  try {
    const { DigiFashionContract,
     
      tokenContract,  
      
      networkDataD}=await getMethods();
    const {tokenId,price,account}=req.body;
    console.log(price)
    console.log("ethswapadd",networkDataD.address)
    const gasP =await web3.eth.getGasPrice();
    let myEstimatedGas1,myEstimatedGas2;
    await tokenContract.methods
        .approve(networkDataD.address, price)
        .estimateGas({ from: account,gas:gasP },(error,estimatedGas)=>{
          myEstimatedGas2=estimatedGas;
        })
    await DigiFashionContract.methods
        .buyToken(tokenId,price,networkDataD.address)
        .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)=>{
          myEstimatedGas1=estimatedGas;
        })

    await tokenContract.methods.approve(networkDataD.address, price).send({ from: account,gas:myEstimatedGas2 }).on('transactionHash', (hash) => {
    console.log('approved')
    //tokenContract.methods.transfer(account,price).send({ from: account,gas:3000000 }).on('transactionHash', (hash) => {
    //console.log("here ")
     DigiFashionContract.methods
    .buyToken(tokenId,price,networkDataD.address)
    .send({ from: account,gas:myEstimatedGas1 })
    .on("transactionHash",(hash)=>{
      res.json({tokenId,price,account})
    })
  //})
})
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}
exports.buyCryptoBoyWithDress=async(req,res)=>{
  try {
    const { DigiFashionContract,
      
      tokenContract,  
      
      networkDataD}=await getMethods();
    const {tokenId,price,account}=req.body;
    const gasP =await web3.eth.getGasPrice();
    let myEstimatedGas1,myEstimatedGas2;
    await tokenContract.methods
        .approve(networkDataD.address, price)
        .estimateGas({ from: account,gas:gasP },(error,estimatedGas)=>{
          myEstimatedGas2=estimatedGas;
        })
    await DigiFashionContract.methods
        .buyToken(tokenId,price,networkDataD.address)
        .estimateGas({ from: account,gasPrice:gasP },(error,estimatedGas)=>{
          myEstimatedGas1=estimatedGas;
        })
   await tokenContract.methods
        .approve(networkDataD.address, price)
        .send({ from: account,gas:myEstimatedGas2})
        .on('transactionHash', (hash) => {
     DigiFashionContract.methods
    .buyToken(tokenId,price,networkDataD.address)
    .send({ from: account,gas:myEstimatedGas1 })
    .on("transactionHash",(hash)=>{
      res.json({tokenId,price,account})
    })
  })
  } catch (err) {
    res.send("err");
    console.log(err);
  }
}
