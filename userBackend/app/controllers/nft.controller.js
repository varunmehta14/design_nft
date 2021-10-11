exports.getAccountBalance=(req,res)=>{
    try {
        console.log("reqacc",req.params.id)
        //let accountBalance = await web3.eth.getBalance(req.body.account);
        //accountBalance = web3.utils.fromWei(accountBalance, "Ether");
        console.log("netadd",networkData.address)
        let tokenBalance = await token.methods.balanceOf(networkData.address).call()
        let myTokenBalance = await token.methods.balanceOf(req.params.id).call()
    
        console.log("myTokenBalance",myTokenBalance)
        console.log("tokenBalance",tokenBalance)
        res.send(myTokenBalance);
      } catch (err) {
        res.send("err");
        console.log(err);
      }
}