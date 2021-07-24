import React, { Component } from "react";
//import { HashRouter,Route,withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,withRouter 
} from "react-router-dom";

import "./App.css";
import defaultProfile from "./Profile/blank-profile-picture-973460_640.png"
import Web3 from "web3";
import CryptoBoys from "../abis/CryptoBoys.json";
import Users from "../abis/Users.json";
import CryptoBoyNFTDetails from "./CryptoBoyNFTDetails/CryptoBoyNFTDetails";
import FormAndPreview from "../components/FormAndPreview/FormAndPreview";
import AllCryptoBoys from "./AllCryptoBoys/AllCryptoBoys";
import AllCreators from "./AllCreators/AllCreators";
import AccountDetails from "./AccountDetails/AccountDetails";
import ContractNotDeployed from "./ContractNotDeployed/ContractNotDeployed";
import ConnectToMetamask from "./ConnectMetamask/ConnectToMetamask";
import Loading from "./Loading/Loading";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import MyCryptoBoys from "./MyCryptoBoys/MyCryptoBoys";
import TheirCryptoBoys from "./TheirCryptoBoys/TheirCryptoBoys";
import Queries from "./Queries/Queries";
import {Container} from '@material-ui/core'

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
const PAGE_NUMBER=1;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      cryptoBoysContract: null,
      usersContract:null,
      cryptoBoysCount: 0,
      usersCount: 0,
      cryptoBoys: [],
      searchData:[],
      users:[],
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      totalTokensMinted: 0,
      totalTokensOwnedByAccount: 0,
      imageIsUsed: false,
      nameIsUsed: false,
      emailIsUsed: false,
      clickedAddress:"",
      tokenID:"",
      lastMintTime: null,
      userLoggedIn:false,
      currentUser:"",
      page:PAGE_NUMBER,
      start:1,
      startState:1,
      end:2,
      endState:2,
      endOfDesigns:false,
      searchedDesign:null,
      tokenExists:true,
      userExists:true,
     
    };
  }
 
  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
  //  await this.loadDesigns(this.state.startState,this.state.endState);
    await this.setMetaData();
    await this.setMintBtnTimer();
  };
  
 myCallback2=(dataFromChild2)=>{
   console.log(dataFromChild2)
   this.setState({clickedAddress:dataFromChild2})
 }


 tokenIDfun=(tokenIDdata)=>{
  console.log(tokenIDdata)
  this.setState({tokenID:tokenIDdata})
 }

  setMintBtnTimer = () => {
    const mintBtn = document.getElementById("mintBtn");
    if (mintBtn !== undefined && mintBtn !== null) {
      this.setState({
        lastMintTime: localStorage.getItem(this.state.accountAddress),
      });
      this.state.lastMintTime === undefined || this.state.lastMintTime === null
        ? (mintBtn.innerHTML = "Mint My Crypto Boy")
        : this.checkIfCanMint(parseInt(this.state.lastMintTime));
    }
  };

  checkIfCanMint = (lastMintTime) => {
    const mintBtn = document.getElementById("mintBtn");
    const timeGap = 300000; //5min in milliseconds
    const countDownTime = lastMintTime + timeGap;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = countDownTime - now;
      if (diff < 0) {
        mintBtn.removeAttribute("disabled");
        mintBtn.innerHTML = "Mint My Crypto Boy";
        localStorage.removeItem(this.state.accountAddress);
        clearInterval(interval);
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        mintBtn.setAttribute("disabled", true);
        mintBtn.innerHTML = `Next mint in ${minutes}m ${seconds}s`;
      }
    }, 1000);
  };

  

  loadBlockchainData = async () => {
   
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0])
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ userLoggedIn: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      this.setState({ loading: false });
      //Network ID
      const networkId = await web3.eth.net.getId();
      const networkData1 = CryptoBoys.networks[networkId];

      if (networkData1) {
        this.setState({ loading: true });
        const cryptoBoysContract = web3.eth.Contract(
          CryptoBoys.abi,
          networkData1.address
        );
        //set contract
        this.setState({ cryptoBoysContract });
        console.log(cryptoBoysContract)
        this.setState({ contractDetected: true });
        //get number of designs minted on the platform
        const cryptoBoysCount = await cryptoBoysContract.methods
          .cryptoBoyCounter()
          .call();
        this.setState({ cryptoBoysCount });
        
       
         //get all the designs
         
         for (var i = 1; i <=cryptoBoysCount; i++) {
           
         
          const cryptoBoy = await cryptoBoysContract.methods
            .allCryptoBoys(i)
            .call();
          this.setState({
            cryptoBoys: [...this.state.cryptoBoys, cryptoBoy],
          });
        }
       
       
        
        //get number of tokens on the platform
        let totalTokensMinted = await cryptoBoysContract.methods
          .getNumberOfTokensMinted()
          .call();
        totalTokensMinted = totalTokensMinted.toNumber();
        this.setState({ totalTokensMinted });
        //get tokens owned by current account
        let totalTokensOwnedByAccount = await cryptoBoysContract.methods
          .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
          .call();
        totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
        this.setState({ totalTokensOwnedByAccount });
        this.setState({ loading: false });
      } else {
        this.setState({ contractDetected: false });
      }
      const networkData2 = Users.networks[networkId];
      if (networkData2) {
        this.setState({ loading: true });
        const usersContract = web3.eth.Contract(
          Users.abi,
          networkData2.address
        );
        this.setState({usersContract})
        //current user 
        //const current=await this.state.users.find((user)=>user.userAddress===(this.state.accountAddress));
        const current=await usersContract.methods
        .allUsers(this.state.accountAddress)
        .call();
        this.setState({currentUser:current});
        this.setState({loading:false});
         //grt number of user
         const usersCount = await usersContract.methods
         .userCounter()
         .call();
         this.setState({ usersCount });
       //get all the designs
       for (var i = 1; i <= usersCount; i++) {
         const user = await usersContract.methods
           .allUsersById(i)
           .call();
         this.setState({
           users: [...this.state.users, user],
         });
       }
       console.log(this.state.users)
    }}
  };

//   loadDesigns=async(start,end)=>{
//     console.log("end",end)
//     const cryptoBoysCount = await this.state.cryptoBoysContract.methods
//     .cryptoBoyCounter()
//     .call();
//  // this.setState({ cryptoBoysCount }); 
//    for (var i = start; i <= end; i++) {
     
    
//     const cryptoBoy = await this.state.cryptoBoysContract.methods
//       .allCryptoBoys(i)
//       .call();
//     this.setState({
//       allcryptoBoys: [...this.state.allcryptoBoys, cryptoBoy],
//     });
//     if(i==cryptoBoysCount){
//       this.setState({endOfDesigns:true})
//       break;
//     }
//   }
//   }
  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.on('accountsChanged', function () {
       document.location.reload()
      })
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.on('accountsChanged', function () {
       document.location.reload()
       })
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };

  setMetaData = async () => {
    if (this.state.cryptoBoys.length !== 0) {
      this.setState({loading:true})
      this.state.cryptoBoys.map(async (cryptoboy) => {
        const result = await fetch(cryptoboy.tokenURI);
        const metaData = await result.json();
        this.setState({
          cryptoBoys: this.state.cryptoBoys.map((cryptoboy) =>
            cryptoboy.tokenId.toNumber() === Number(metaData.tokenId)
              ? {
                  ...cryptoboy,
                  metaData,
                }
              : cryptoboy
          ),
        });
      });this.setState({loading:false});
    }
  };

  createUserFromApp=async(userName,email,social,repo,bio,avatar)=>{
   console.log(userName,email,social,repo,bio,avatar,this.state.accountAddress)
   let previousUserId;
   let avatarHash;
   
   const nameIsUsed=await this.state.usersContract.methods.userNameExists(userName).call();
   const emailIsUsed=await this.state.usersContract.methods.userEmailExists(email).call();
   console.log(nameIsUsed);
   if(!nameIsUsed && !emailIsUsed){
    previousUserId=await this.state.usersContract.methods.userCounter().call();
    previousUserId=previousUserId.toNumber();
    const userId=previousUserId+1;
   //  const userObject={
   //    userId:userId,
   //    userName:userName,
   //    email:email,
   //    social:social,
   //    repo:repo,
   //    bio:bio,
   //    avatar:avatar
   //  }
   if(avatar instanceof Blob){
    const  cid2= await ipfs.add(avatar);
    console.log(cid2.path);
     avatarHash = `https://ipfs.infura.io/ipfs/${cid2.path}`;
 }else{
   avatarHash=avatar
  }
    this.state.usersContract.methods
           .createUser(userName,email,social,repo,bio,avatarHash)
           .send({ from: this.state.accountAddress })
           .on("confirmation", () => {
             localStorage.setItem(this.state.accountAddress, new Date().getTime());
             this.setState({ loading: false });
             window.location.href=`/account`
             
            
           })
           this.setState({userLoggedIn:true});
          
   }
   else {
    {
     this.setState({ nameIsUsed: true });
     this.setState({ emailIsUsed: true });
     this.setState({ loading: false });
   }
 }
   
         
};

updateUserFromApp=async(userName,oldemail,email,social,repo,bio,avatar,account)=>{
  console.log(userName,oldemail,email,social,repo,bio,avatar,this.state.accountAddress)
  let avatarHash;
 
  const getUserEmail=await this.state.usersContract.methods.allUsers(account).call();
  console.log(avatar instanceof Blob)
 if(getUserEmail[2]==email){

  if (avatar instanceof Blob){
    console.log("name is  used and avatar is blob")
  const  cid2= await ipfs.add(avatar);
  console.log(cid2.path);
  
   avatarHash = `https://ipfs.infura.io/ipfs/${cid2.path}`;
  }
  else{
    console.log("name is  used and avatar is link")
    avatarHash=avatar;
  }
  this.state.usersContract.methods
         .updateUser(userName,oldemail,email,social,repo,bio,avatarHash)
         .send({ from: this.state.accountAddress })
         .on("confirmation", () => {
           localStorage.setItem(this.state.accountAddress, new Date().getTime());
           this.setState({ loading: false });
           window.location.href="/account"
          // window.location.reload();

         })
 }
 else{
  const nameIsUsed=await this.state.usersContract.methods.userNameExists(userName).call();
  const emailIsUsed=await this.state.usersContract.methods.userEmailExists(email).call();
  console.log(nameIsUsed);
  if(!nameIsUsed && !emailIsUsed){
    this.setState({ nameIsUsed: false });
   //previousUserId=await this.state.cryptoBoysContract.methods.userCounter().call();
  // previousUserId=previousUserId.toNumber();
//const userId=previousUserId+1;
  //  const userObject={
  //    userId:userId,
  //    userName:userName,
  //    email:email,
  //    social:social,
  //    repo:repo,
  //    bio:bio,
  //    avatar:avatar
  //  }
  
  if(avatar instanceof Blob){
    console.log("name is not used and avatar is blob")
    const  cid2= await ipfs.add(avatar);
    console.log(cid2.path);
     avatarHash = `https://ipfs.infura.io/ipfs/${cid2.path}`;
  }
  else {
    console.log("name is not used and avatar is link")
     avatarHash=avatar;
  }
   this.state.usersContract.methods
          .updateUser(userName,oldemail,email,social,repo,bio,avatarHash)
          .send({ from: this.state.accountAddress })
          .on("confirmation", () => {
            localStorage.setItem(this.state.accountAddress, new Date().getTime());
            this.setState({ loading: false });
            window.location.href="/account"
           // window.location.reload();
          })
  }
  else {
   {
    this.setState({ nameIsUsed: true });
    this.setState({ emailIsUsed: true });
    this.setState({ loading: false });
  }
}}
  
        
};

  mintMyNFT = async (name,description,buffer,tokenPrice,finalbuffer) => {
    this.setState({ loading: true });
   console.log("buffer2",finalbuffer)
   
  //   const nameIsUsed = await this.state.cryptoBoysContract.methods
  //     .tokenNameExists(name)
  //     .call();
  //  if ( !nameIsUsed) {
    console.log(this.state.cryptoBoysContract)
      let imageHashes=[];
      let previousTokenId;
      previousTokenId = await this.state.cryptoBoysContract.methods
        .cryptoBoyCounter()
        .call();
      previousTokenId = previousTokenId.toNumber();

      //set Token ID 
      const tokenId = previousTokenId + 1;
      //adding buffer of image on ipfs
      const  file= await ipfs.add(buffer)
     // const imageHash=file[0]["hash"]
      console.log(file.path)
      for(let i=0;i<finalbuffer.length;i++){
      const filesI=await ipfs.add(finalbuffer[i])
      console.log(filesI.path)
      imageHashes.push(`https://ipfs.infura.io/ipfs/${filesI.path}`);
      }
     // const files3=await ipfs.add(buffer2)
     // console.log(files3.path)
   // const imageHash3 = `https://ipfs.infura.io/ipfs/${files3.path}`;
      //creating  a image hash to store on blockchain
      const imageHash = `https://ipfs.infura.io/ipfs/${file.path}`;
      
      const imageIsUsed=await this.state.cryptoBoysContract.methods.imageExists(imageHash).call();
      console.log(imageIsUsed);
      if(!imageIsUsed){
      const tokenObject = {
        tokenName: "Crypto Boy",
        tokenSymbol: "CB",
        tokenId: `${tokenId}`,
        image:`${imageHash}`,
        name:name,
        description:description,
        price:tokenPrice,
        images:imageHashes
        // metaData:{
          
        //   images:{
        //     imageHash3
        //   }
        // }
        }
        //storing the token object on ipfs
        const  cid= await ipfs.add(JSON.stringify(tokenObject))
        console.log(cid.path)
        //setting the token uri as the path of token object
        let tokenURI = `https://ipfs.infura.io/ipfs/${cid.path}`;
     const price = window.web3.utils.toWei(tokenPrice.toString(), "Ether");
    //  for(let i=0;i<cryptoBoyCopies;i++){
        
    //  }
     this.state.cryptoBoysContract.methods
        .mintCryptoBoy(name,tokenURI,price,imageHash)
        .send({ from: this.state.accountAddress })
        .on("confirmation", () => {
          localStorage.setItem(this.state.accountAddress, new Date().getTime());
          this.setState({ loading: false });
          window.location.reload();
        });}
        else {
           {
            this.setState({ imageIsUsed: true });
            this.setState({ loading: false });
          }
        }
     
    // else {
    //   if (nameIsUsed) {
    //     this.setState({ nameIsUsed: true });
    //     this.setState({ loading: false });
    //   }
    // }
  };
// Put or remove from sale on the marketplace
  toggleForSale = (tokenId) => {
    this.setState({ loading: true });
    this.state.cryptoBoysContract.methods
      .toggleForSale(tokenId)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };
//Change the price of token 
  changeTokenPrice = (tokenId, newPrice) => {
    this.setState({ loading: true });
    const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
    this.state.cryptoBoysContract.methods
      .changeTokenPrice(tokenId, newTokenPrice)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

//Buy a token  
  buyCryptoBoy = (tokenId, price) => {
    this.setState({ loading: true });
    this.state.cryptoBoysContract.methods
      .buyToken(tokenId)
      .send({ from: this.state.accountAddress, value: price })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };
   
 searchTermfromApp=async(search)=>{
  if(!isNaN(search)){
    const tokenExist=await this.state.cryptoBoysContract.methods.
                    getTokenExists(search).call();
                    if(tokenExist){
                      this.setState({tokenExists:true});
                      // const searchedDesign=await this.state.cryptoBoysContract.methods.
                      // allCryptoBoys(search).call();
                      // this.setState({searchedDesign})
                     // console.log(this.state.searchedDesign)
                  
                    this.setState({clickedAddress: search})
                    
                    window.location.href=`/nftDetails/${search}`
                    }
                    else{
                      this.setState({tokenExists:false});
                      console.log("Token doesnt exist")
                    }
  
  }else{
    const userNameExists=await this.state.usersContract.methods.
    userNameExists(search).call();
    if(userNameExists){
      this.setState({userExists:true});
    const addressFromName=await this.state.usersContract.methods.
    nameToAddress(search).call();
    this.setState({clickedAddress:addressFromName})
    window.location.href=`/their-tokens/${addressFromName}`
    }
    else{
      this.setState({userExists:false});
      console.log("username doesnt exist")
    }
  }
 }
 searchAllResultsFromApp=async(key)=>{
  //  const nameToUser=await this.state.usersContract.methods.
  //  nameToUser(key).call();
  const result=await this.state.users.filter(user=>user.userName.includes(key))
  console.log(result);
   this.setState({searchData:result})
   console.log(this.state.searchData)
 }
 searchNFTFromApp=async(val)=>{
  //  const result=await this.state.cryptoBoysContract.methods.
  //  nameToId(val).call();
   const result=await this.state.cryptoBoys.find( (cryptoboy) =>cryptoboy.tokenName===val);
   this.setState({clickedAddress: result.tokenId.toNumber()})
                    
   window.location.href=`/nftDetails/${result.tokenId.toNumber()}`
 }
  
  render() {
    // const scrollToEnd=()=>{
    //  // this.setState({page:this.state.page+1});
    //   this.setState({start:this.state.end+1});
    //   this.setState({end:this.state.end+2});
    //   this.setState({loading:true});
    //   console.log(console.log("start",this.state.start))
    //   if(!this.state.endOfDesigns){
    //   this.loadDesigns(this.state.start,this.state.end);}
    //   else{
    //     return;
    //   }
    

    //  // console.log(this.state.page);
    // }
  
    // window.onscroll=function(){
    //   //console.log(window,document.documentElement.scrollTop,document.documentElement.offsetHeight)
    //   if(
    //     window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight 
    //   ){
        
    //     scrollToEnd()
    //     console.log("here")
    //   }
    // }
    console.log(this.state.cryptoBoysContract)
    console.log(this.state.cryptoBoys)
    return (
    
      <div className="fashion" style={{backgroundColor:"#f1f1ef"}}>
      {/* 
      !this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : 
        !this.state.contractDetected ? (
        <ContractNotDeployed />
      ) 
      this.state.loading ? (
        <Loading />
      ) :( */}
      <> <Container maxWidth="false" style={{padding:"0%"}}> 
    <Router>

    <Navbar connectToMetamask={this.connectToMetamask} metamaskConnected={this.state.metamaskConnected} userLoggedIn={this.state.userLoggedIn}currentUser={this.state.currentUser}searchTermfromApp={this.searchTermfromApp}searchAllResultsFromApp={this.searchAllResultsFromApp}searchData={this.state.users}cryptoBoys={this.state.cryptoBoys}searchNFTFromApp={this.searchNFTFromApp}/>
      <Switch>
      
      
          
            
            <Route
              path="/"
              exact
              render={() => (
                <AllCryptoBoys
                accountAddress={this.state.accountAddress}
               // allcryptoBoys={this.state.allcryptoBoys}
                cryptoBoys={this.state.cryptoBoys}
                totalTokensMinted={this.state.totalTokensMinted}
                changeTokenPrice={this.changeTokenPrice}
                toggleForSale={this.toggleForSale}
                buyCryptoBoy={this.buyCryptoBoy}
                callbackFromParent={this.myCallback2}
                cryptoBoysContract={this.state.cryptoBoysContract}
                usersContract={this.state.usersContract}
                cryptoBoysCount={this.state.cryptoBoysCount}
                users={this.state.users}
              />
              )}
            />
            <Route
              path="/account"
      
              render={() => (
                <AccountDetails
                  updateUserFromApp={this.updateUserFromApp}
                  accountAddress={this.state.accountAddress}
                  accountBalance={this.state.accountBalance}
                  currentUser={this.state.currentUser}
                  cryptoBoysContract={this.state.cryptoBoysContract}
                  nameIsUsed={this.state.nameIsUsed}
                  emailIsUsed={this.state.emailIsUsed}
                />
              )}
            />
             <Route
              path="/updateProfile"
      
              render={() => (
                <UpdateProfile
                  updateUserFromApp={this.updateUserFromApp}
                  accountAddress={this.state.accountAddress}
                  accountBalance={this.state.accountBalance}
                  currentUser={this.state.currentUser}
                  cryptoBoysContract={this.state.cryptoBoysContract}
                  nameIsUsed={this.state.nameIsUsed}
                  emailIsUsed={this.state.emailIsUsed}
                  loading={this.state.loading}
                />
              )}
            />
             <Route
              path="/profile"
      
              render={() => (
                <Profile
                  createUserFromApp={this.createUserFromApp}
                  //currentUser={this.state.currentUser}
                 // users={this.state.users}
                  accountAddress={this.state.accountAddress}
                  accountBalance={this.state.accountBalance}
                  nameIsUsed={this.state.nameIsUsed}
                  emailIsUsed={this.state.emailIsUsed}
                 usersContract={this.state.usersContract}
                />
              )}
            />
            <Route
              path="/marketplace"
              
              render={() => (
                <AllCryptoBoys
                  accountAddress={this.state.accountAddress}
                  cryptoBoys={this.state.cryptoBoys}
                  //allcryptoBoys={this.state.allcryptoBoys}
                  totalTokensMinted={this.state.totalTokensMinted}
                  changeTokenPrice={this.changeTokenPrice}
                  toggleForSale={this.toggleForSale}
                  buyCryptoBoy={this.buyCryptoBoy}
                  callbackFromParent={this.myCallback2}
                  cryptoBoysContract={this.state.cryptoBoysContract}
                  usersContract={this.state.usersContract}
                  users={this.state.users}
                />
              )}
            />
            <Route 
              path="/creators"
              render={()=>(
                <AllCreators
                users={this.state.users}/>
              )}/>
            <Route
              path="/mint"
             
              render={() => (
                <FormAndPreview
                  mintMyNFT={this.mintMyNFT}
                  //nameIsUsed={this.state.nameIsUsed}
                  imageIsUsed={this.state.imageIsUsed}
                 
                  setMintBtnTimer={this.setMintBtnTimer}
                />
              )}
            />
            
            <Route
              path="/my-tokens"
              
              render={() => (
                <MyCryptoBoys
                  accountAddress={this.state.accountAddress}
                  cryptoBoys={this.state.cryptoBoys}
                  totalTokensOwnedByAccount={
                    this.state.totalTokensOwnedByAccount
                  }
                 callbackFromParent1={this.myCallback2}
                 loading={this.state.loading}
                />
              )}
            />
            <Route
              path={`/their-tokens/${this.state.clickedAddress}`}
              
              render={() => (
                <TheirCryptoBoys
                  accountAddress={this.state.clickedAddress}
                  cryptoBoys={this.state.cryptoBoys}
                  totalTokensOwnedByAccount={
                    this.state.totalTokensOwnedByAccount
                  }
                  callbackFromParent1={this.myCallback2}
                  cryptoBoysContract={this.state.cryptoBoysContract}
                  usersContract={this.state.usersContract}
                  userExists={this.state.userExists}
                  users={this.state.users}
                 // loading={this.state.loading}
                />
                
              )}
            />
            
             <Route
                path={`/nftDetails/${this.state.clickedAddress}`}
             //path="/nftDetails"
              
              render={() => (
              <CryptoBoyNFTDetails
               accountAddress={this.state.accountAddress}
               //cryptoboy={this.state.cryptoBoys[this.state.clickedAddress-1]}
               totalTokensMinted={this.state.totalTokensMinted}
               changeTokenPrice={this.changeTokenPrice}
               toggleForSale={this.toggleForSale}
               buyCryptoBoy={this.buyCryptoBoy}
               clickedAddress={this.state.clickedAddress}
               callbackFromParent={this.myCallback2}
               callBack={this.tokenIDfun}
               cryptoBoysContract={this.state.cryptoBoysContract}
               usersContract={this.state.usersContract}
               cryptoBoys={this.state.cryptoBoys}
               loading={this.state.loading}
               tokenExists={this.state.tokenExists}
               users={this.state.users}
               />
              )}
             />
          
        
          </Switch>
    </Router>
      </Container></>
      {/* ) } */}
       
      </div>

    );
  }
}

export default App;
