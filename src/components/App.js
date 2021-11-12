import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import { useHistory } from 'react-router';
import "./App.css";

import Web3 from "web3";
import DigiFashion from "../abis/DigiFashion.json";
import DigiFashionERC1155 from "../abis/DigiFashionERC1155.json";
import DigiFashionERC1155Abi from "../abis/1155abi.json";
// import EthSwap from "../abis/EthSwap.json";
import Token from "../abis/Token.json";
import CryptoBoyNFTDetails from "./CryptoBoyNFTDetails/CryptoBoyNFTDetails";
import CryptoBoyERC1155Details from "./CryptoBoyERC1155Details/CryptoBoyERC1155Details";
import FormAndPreview from "../components/FormAndPreview/FormAndPreview";
import AllCryptoBoys from "./AllCryptoBoys/AllCryptoBoys";
import AllCryptoBoysERC1155 from "./AllCryptoBoysERC1155/AllCryptoBoysERC1155";
import AllCreators from "./AllCreators/AllCreators";
import AccountDetails from "./AccountDetails/AccountDetails";
import Chat from "./Chat/Chat";
import Loading from "./Loading/Loading";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import MyCryptoBoys from "./MyCryptoBoys/MyCryptoBoys";
import TheirCryptoBoys from "./TheirCryptoBoys/TheirCryptoBoys";
import Footer from "./Footer/Footer";
import SizeDetails from "./SizeDetails/SizeDetails";
import {Container,Box, responsiveFontSizes} from '@material-ui/core';
import ipfs from './ipfs';
import UserDataService from "../services/UserService";
import NFTDataService from "../services/NFTService";
import Swal from 'sweetalert2';
import axios from 'axios'
// const ipfsClient = require("ipfs-http-client");
// const ipfs = ipfsClient({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// });
const PAGE_NUMBER=1;
const initialUserState = {
  userId: null,
  userName: "",
  userEmail: "",
  userSocial: "",
  userRepo: "",
  userBio: "",
  userAvatarHash: "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
  userAddress: "",

};
let token;
let res;
let response;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      DigiFashionContract: null,
      DigiFashionERC1155Contract: null,
      tokenContract:null,
      networkData:null,
      networkERC1155Data:null,
      tokenData:null,
      ehtSwap:null,
      usersContract:null,
      cryptoBoysCount: 0,
      cryptoERC1155Count:0,
      usersCount: 0,
      cryptoBoys: [],
      cryptoERC1155: [],
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
      currentUser:initialUserState,
      page:PAGE_NUMBER,
      start:1,
      startState:1,
      end:2,
      endState:2,
      endOfDesigns:false,
      searchedDesign:null,
      tokenExists:true,
      userExists:true,
      usAdd:"",
      dressTokenId:"",
      dressPrice:"",
      sendEmailTo:"",
      sendName:"",
      inputFields:[],
      designName:"",
      user:initialUserState,
      allUsers:[],
      ethSwapDataAdd:""
     
    };
     this.loadWeb3();
    this.loadCurrentUser();
  }
 
  componentDidMount = async () => {
    await this.loadWeb3();
     await this.loadCurrentUser();
    
    await this.loadBlockchainData();
    await this.loadAllUsers();
   
  //  await this.loadDesigns(this.state.startState,this.state.endState);
  await this.setMetaData();
  //  await this.setMintBtnTimer();
  };
  async componentDidUpdate(prevProps,prevState){
    console.log("prevState",prevState)
    console.log("this state",this.state)
    if(prevState.accountAddress!=this.state.accountAddress){
      await this.loadWeb3()
     // await this.loadBlockchainData()
      await this.loadCurrentUser()
      await this.setMetaData();
    }
    // else if(prevState.cryptoBoys!=this.state.cryptoBoys){
    //   await this.loadBlockchainData()
    // }
    
  }
  
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
    Number.prototype.toFixedSpecial = function(n) {
      var str = this.toFixed(n);
      if (str.indexOf('e+') === -1)
        return str;
    
      // if number is in scientific notation, pick (b)ase and (p)ower
      str = str.replace('.', '').split('e+').reduce(function(b, p) {
        return b + Array(p - b.length + 2).join(0);
      });
      
      if (n > 0)
        str += '.' + Array(n + 1).join(0);
      
      return str;
    };
    console.log("Load Blockchain")
   let res;
    const web3 = window.web3;
     const accounts = await web3.eth.getAccounts();
    
     console.log(accounts[0])
    //res = await axios.get('http://localhost:8080/accounts')
       
      //const accounts=res.data;
     // console.log(res.data[0]);
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ userLoggedIn: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      // let myTokenBalance = await this.state.tokenContract.methods.balanceOf(this.state.accountAddress).call()
      // this.setState({ accountBalance:myTokenBalance });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
       accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      console.log(accountBalance)
      this.setState({ accountBalance });
      //res = await axios.post('http://localhost:8080/accountBalance',{account:this.state.accountAddress})
      //console.log(res)
      //here
      // NFTDataService.getAccountBalance(this.state.accountAddress)
      //         .then(response=>
      //           {
      //             console.log(response)
      //             let myBalance=parseFloat(response.data)
      //             myBalance=myBalance.toFixedSpecial(0)
      //             this.setState({ accountBalance:myBalance });
      //           })
      //till here
      // let accountBalance = web3.utils.toWei(res.data);
      // let myBalance=parseFloat(res.data)
     // myBalance=myBalance.toFixedSpecial(0)
      //this.setState({ accountBalance:myBalance });
      //this.setState({ accountBalance:res.data });
      //console.log(myBalance)
    //console.log(myBalance.toFixed())
     // console.log(window.web3.utils.fromWei(this.state.accountBalance.toString()))
      this.setState({ loading: false });
      
    
      
      //Network ID
     const networkId = await web3.eth.net.getId();
     const networkData = DigiFashion.networks[networkId];
     const networkERC1155Data = DigiFashionERC1155.networks[networkId];
    //  const ethSwapData = EthSwap.networks[networkId]
      const tokenData = Token.networks[networkId]
     // this.setState({ethSwapDataAdd:ethSwapData.address})
      this.setState({networkData});
      console.log(this.state.networkData)
      this.setState({networkERC1155Data});
      this.setState({tokenData});
      if (networkData) {
        this.setState({ loading: true });
        const DigiFashionContract = web3.eth.Contract(
          DigiFashion.abi,
          networkData.address
        );
        //set contract
        this.setState({ DigiFashionContract });
        console.log(DigiFashionContract)
        this.setState({ contractDetected: true });
        //get number of designs minted on the platform
        const cryptoBoysCount = await DigiFashionContract.methods
          .cryptoBoyCounter()
          .call();
        this.setState({ cryptoBoysCount });
        
       
         //get all the designs
         
         for (var i = 1; i <=cryptoBoysCount; i++) {
           
         
          const cryptoBoy = await DigiFashionContract.methods
            .allCryptoBoys(i)
            .call();
          this.setState({
            cryptoBoys: [...this.state.cryptoBoys, cryptoBoy],
          });
        }
       
       
        
        //get number of tokens on the platform
        let totalTokensMinted = await DigiFashionContract.methods
          .getNumberOfTokensMinted()
          .call();
        totalTokensMinted = totalTokensMinted.toNumber();
        this.setState({ totalTokensMinted });
        //get tokens owned by current account
        let totalTokensOwnedByAccount = await DigiFashionContract.methods
          .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
          .call();
        totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
        this.setState({ totalTokensOwnedByAccount });
        this.setState({ loading: false });
      } else {
        this.setState({ contractDetected: false });
      }
      if(tokenData){
        const tokenContract = new web3.eth.Contract(Token.abi, tokenData.address)
        
        this.setState({ tokenContract });
        let myTokenBalance = await this.state.tokenContract.methods.balanceOfERC20(this.state.accountAddress).call()
        this.setState({ accountBalance:myTokenBalance });
        console.log(this.state.accountBalance);
      }
      else {
        this.setState({ contractDetected: false });
      }
      //if(networkERC1155Data){
        const contractAddress="0x9a3Aa3BBe16B933e7Ded5C6604c70600065a3557";
       // const DigiFashionERC1155Contract = new web3.eth.Contract(DigiFashionERC1155.abi,networkERC1155Data.address)
        const DigiFashionERC1155Contract = new web3.eth.Contract(DigiFashionERC1155Abi.abi,contractAddress);
        
        this.setState({ DigiFashionERC1155Contract });
        // let myTokenBalance = await this.state.tokenContract.methods.balanceOfERC20(this.state.accountAddress).call()
        // this.setState({ accountBalance:myTokenBalance });
        this.setState({ contractDetected: true });
        let cryptoERC1155Count = await DigiFashionERC1155Contract.methods
          ._tokensMintedCount()
          .call();
          cryptoERC1155Count=cryptoERC1155Count.toNumber();
        this.setState({ cryptoERC1155Count });
        console.log(cryptoERC1155Count);
        // const currentOwned=await DigiFashionERC1155Contract.methods.tokenIdToAdd(1).call();
        // console.log(currentOwned)
         //get all the designs
         
         for (var i = 1; i <=cryptoERC1155Count; i++) {
           
         
          const metaDataURI = await DigiFashionERC1155Contract.methods
            .getTokenMetaData(i)
            .call();
          let result = await fetch(`https://ipfs.infura.io/ipfs/${metaDataURI}`);
          const metaDataERC1155 = await result.json();
          console.log(metaDataERC1155)
          const priceERC1155=await DigiFashionERC1155Contract.methods
          .tokenPrice(i)
          .call();
          const cry1155=[{...metaDataERC1155,"price":priceERC1155,"tokenId":i}]
          console.log("cry1155",cry1155);
          this.setState({
            cryptoERC1155: [...this.state.cryptoERC1155,cry1155],
          });
          console.log(this.state.cryptoERC1155);
      }
   // }
    //  else {
        this.setState({ contractDetected: false });
    //  }
     
    //  if (networkData) {
    //    this.setState({ loading: true });
    //     const cryptoBoysContract = web3.eth.Contract(
    //       CryptoBoys.abi,
    //       networkData1.address
    //     );
    //     const token = new web3.eth.Contract(Token.abi, tokenData.address)
    //     const  ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
    //     //set contract
    //     this.setState({ cryptoBoysContract });
    //     this.setState({ token });
    //     this.setState({ ethSwap });
    //     console.log(cryptoBoysContract)
    //     this.setState({ contractDetected: true });
    

        //get number of designs minted on the platform
        // const cryptoBoysCount = await cryptoBoysContract.methods
        //   .cryptoBoyCounter()
        //   .call();
        
        //res = await axios.get('http://localhost:8080/count')
       //console.log(res)
       //here
      //  NFTDataService.getCount()
      //  .then(response=>
      //    {
      //      console.log(response)
      //      this.setState({ cryptoBoysCount:response.data });
      //    })
        //till here
       //this.setState({ cryptoBoysCount:res.data });
         //get all the designs
         
         //for (var i = 1; i <=this.state.cryptoBoysCount; i++) {
           
         
          // const cryptoBoy = await cryptoBoysContract.methods
          //   .allCryptoBoys(i)
          //   .call();
          //   console.log(cryptoBoy)
          //   this.setState({
          //     cryptoBoys: [...this.state.cryptoBoys, cryptoBoy],
          //   });
          //res = await axios.post('http://localhost:8080/allDesigns',{index:i})
          //res = await axios.get('http://localhost:8080/allDesigns')
          //console.log(res.data)
          // NFTDataService.getAllDesigns()
          // .then(response=>
          //   {
          //     console.log(response)
          //     this.setState({
          //       cryptoBoys: response.data,
          //     });
          //   })
          // this.setState({
          //   cryptoBoys: res.data,
          // });
        //}
       
       
        
        //get number of tokens on the platform
        // let totalTokensMinted = await cryptoBoysContract.methods
        //   .getNumberOfTokensMinted()
        //   .call();
        // totalTokensMinted = totalTokensMinted;
        // console.log(totalTokensMinted)
        // this.setState({ totalTokensMinted });
        //res = await axios.get('http://localhost:8080/tokensMinted')
        
        //console.log(res.data)
        //here
        // NFTDataService.getTokensMinted()
        // .then(response=>
        //   {
        //     console.log(response)
        //     this.setState({ totalTokensMinted:response.data });
        //   })
       //till here
        //this.setState({ totalTokensMinted:res.data });
        //get tokens owned by current account
        // let totalTokensOwnedByAccount = await cryptoBoysContract.methods
        //   .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
        //   .call();
        // totalTokensOwnedByAccount = totalTokensOwnedByAccount;
        // this.setState({ totalTokensOwnedByAccount });
        //res = await axios.post('http://localhost:8080/tokensOwnedByAccount',{account:this.state.accountAddress})
      //console.log(res)
      //here
      // NFTDataService.getTokensOwnedByAccount(this.state.accountAddress)
      //   .then(response=>
      //     {
      //       console.log(response)
      //       this.setState({ totalTokensMinted:response.data });
      //     })
      // //this.setState({ totalTokensOwnedByAccount:res.data });
      //   this.setState({ loading: false });
      // //} else {
      //   this.setState({ contractDetected: false });
      //}
      //till here

   
  }
  };

loadAllUsers=()=>{
  UserDataService.getAll()
  .then(response=>{
    console.log(response.data);
    this.setState({
      allUsers:response.data
    });
    console.log(this.state.allUsers)
  })
  .catch(e => {
    console.log(e);
  });

  
}  
loadCurrentUser=async()=>{
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
 
  console.log(accounts[0])
 //res = await axios.get('http://localhost:8080/accounts')
    
   //const accounts=res.data;
  // console.log(res.data[0]);
 if (accounts.length === 0) {
   this.setState({ metamaskConnected: false });
 } else {
   this.setState({ metamaskConnected: true });
   this.setState({ userLoggedIn: true });
   this.setState({ loading: true });
   this.setState({ accountAddress: accounts[0] });
  UserDataService.getByAddress(accounts[0])
      .then(response => 
        { 
          console.log(response);
        this.setState({currentUser:{
          userId: response.data.data[0].userId,
          userName: response.data.data[0].userName,
          userEmail: response.data.data[0].userEmail,
          userSocial: response.data.data[0].userSocial,
          userRepo: response.data.data[0].userRepo,
          userBio: response.data.data[0].userBio,
          userAvatarHash: response.data.data[0].userAvatarHash,
          userAddress: response.data.data[0].userAddress
        }
        });
      console.log(response.data.token)
       localStorage.setItem('token',response.data.token);
       console.log(localStorage.getItem('token'))
       console.log(this.state.currentUser)
      
      })
      .catch(e => {
        console.log(e);
      });
    }
}

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.on('accountsChanged', function (accounts) {
        //console.log('accountchange',accounts)
        this.setState({ accountAddress: accounts[0]});
       document.location.reload();
      }.bind(this))
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.on('accountsChanged', function (accounts) {
        //console.log('accountchange',accounts)
        this.setState({ accountAddress: accounts[0]});
       document.location.reload();
       
       }.bind(this))
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
        let result = await fetch(cryptoboy.tokenURI);
        const metaData = await result.json();
        console.log(metaData)
        this.setState({
          cryptoBoys: this.state.cryptoBoys.map((cryptoboy) =>
            cryptoboy.tokenId === metaData.tokenId
              ? {
                  ...cryptoboy,
                  metaData,
                }
              : cryptoboy
          ),
        })
        console.log(this.state.cryptoBoys);
      });this.setState({loading:false});
    }
  };

  createUserFromApp=async(userName,email,social,repo,bio,avatar)=>{
   console.log(userName,email,social,repo,bio,avatar,this.state.accountAddress)
   
   let avatarHash;
   


const emailUsed=await UserDataService.getByEmail(email)
      .then(response => 
        { 
          //console.log(response);
          if(response.data[0]){
            return true;
          }
          else{
            return false;
          } 
      
      })
      .catch(e => {
        console.log(e);
        return false;
      });
const nameUsed=await UserDataService.getByName(userName)
.then(response => 
  { 
    if(response.data[0]){
      return true;
    }
    else{
      return false;
    }
  
  

})
.catch(e => {
  console.log(e);
  return false;
});
console.log("NameUsed",nameUsed)
console.log("EmailUsed",emailUsed)
if(!emailUsed && !nameUsed){
  if(avatar instanceof Blob){
    const  cid2= await ipfs.add(avatar);
    console.log(cid2.path);
     avatarHash = `https://ipfs.infura.io/ipfs/${cid2.path}`;
 }else{
   avatarHash=avatar
  }
  const data={
    
    userName:userName,
    userEmail:email,
    userSocial:social,
    userRepo:repo,
    userBio:bio,
    userAvatarHash:avatarHash,
    userAddress:this.state.accountAddress
  }

  console.log(data)
  UserDataService.create(data)
      .then(response => {
        this.setState({user:{
          userId: response.data.userId,
          userName: response.data.userName,
          userEmail: response.data.userEmail,
          userSocial: response.data.userSocial,
          userRepo: response.data.userRepo,
          userBio: response.data.userBio,
          userAvatarHash: response.data.userAvatarHash,
          userAddress: response.data.userAddress
        }
        });
       
       console.log(this.state.user)
       Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: `Creator Created`,
        confirmButtonText: 'Okay',
        icon: 'success',
        backdrop: false,
        customClass: {
          container: 'my-swal'
        }
        
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href=`/account`
       
        } 
        
      })
       
       this.setState({userLoggedIn:true});
      })
      .catch(e => {
        console.log(e);
      });

}

   else {
    {
    this.setState({nameIsUsed:nameUsed});
    this.setState({emailIsUsed:emailUsed});
    
     this.setState({ loading: false });
   }
 }
   
         
};

updateUserFromApp=async(userName,email,social,repo,bio,avatar,account)=>{
  console.log(userName,email,social,repo,bio,avatar,this.state.accountAddress)
  let avatarHash;
 


//check is email changed or not 
if(this.state.currentUser.userEmail==email){
  if (avatar instanceof Blob){
    console.log("email not changed and avatar is blob")
  const  cid2= await ipfs.add(avatar);
  console.log(cid2.path);
  
   avatarHash = `https://ipfs.infura.io/ipfs/${cid2.path}`;
  }
  else{
    console.log("email not changed and avatar is link")
    avatarHash=avatar;
  }
  const data={
    
    userName:userName,
    userEmail:email,
    userSocial:social,
    userRepo:repo,
    userBio:bio,
    userAvatarHash:avatarHash,
    userAddress:this.state.accountAddress
  }

  //console.log(data)
  UserDataService.update(this.state.accountAddress,data)
      .then(response => {
        this.setState({user:{
          userId: response.data.userId,
          userName: response.data.userName,
          userEmail: response.data.userEmail,
          userSocial: response.data.userSocial,
          userRepo: response.data.userRepo,
          userBio: response.data.userBio,
          userAvatarHash: response.data.userAvatarHash,
          userAddress: response.data.userAddress
        }
        });
       
       console.log(this.state.user)
       Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: `Creator Updated`,
        confirmButtonText: 'Okay',
        icon: 'success',
        backdrop: false,
        customClass: {
          container: 'my-swal'
        }
        
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href=`/account`
       
        } 
        
      })
       
      })
      .catch(e => {
        console.log(e);
      });
      this.setState({emailIsUsed:false})
}
else{

 const emailUsed=await UserDataService.getByEmail(email)
      .then(response => 
        { 
          console.log(response);
          if(response.data[0]){
            return true;
          }
          else{
            return false;
          }
        
       
      
      })
      .catch(e => {
        console.log(e);
        return false;
      });

if(!emailUsed){
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
  const data={
    userName:userName,
    userEmail:email,
    userSocial:social,
    userRepo:repo,
    userBio:bio,
    userAvatarHash:avatarHash,
    userAddress:this.state.accountAddress
  }

  //console.log(data)
  UserDataService.update(this.state.accountAddress,data)
      .then(response => {
        this.setState({user:{
          userId: response.data.userId,
          userName: response.data.userName,
          userEmail: response.data.userEmail,
          userSocial: response.data.userSocial,
          userRepo: response.data.userRepo,
          userBio: response.data.userBio,
          userAvatarHash: response.data.userAvatarHash,
          userAddress: response.data.userAddress
        }
        });
        
       console.log(this.state.user)
       Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: `Creator Updated`,
        confirmButtonText: 'Okay',
        icon: 'success',
        backdrop: false,
        customClass: {
          container: 'my-swal'
        }
        
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href=`/account`
       
        } 
        
      })
      
      })
      .catch(e => {
        console.log(e);
      });
}
  else {
   {
    
    this.setState({ emailIsUsed: true });
    this.setState({ loading: false });
  }
}
}


  
        
};

  mintMyNFT = async (name,description,buffer,tokenPrice,tokenDressPrice,finalbuffer,categories,sizeChart,amount) => {
    this.setState({ loading: true });
    const web3 = window.web3;
   console.log("buffer2",finalbuffer)
   console.log("categories",categories)
   console.log("sizechart",sizeChart)
   console.log("name",name)
   console.log("tokenPrice",tokenPrice)
    const nameIsUsed = await this.state.DigiFashionContract.methods
      .tokenNameExists(name)
      .call();
      console.log("nameisused",nameIsUsed)
      //here
    // let nameIsUsed;
    //   //res = await axios.post('http://localhost:8080/nameUsed',{name:name})
    //   NFTDataService.getNameIsUsed(name)
    //     .then(response=>
    //       {
    //         console.log(response)
    //         nameIsUsed=response.data;
    //       })
      //console.log(res.data)
      //nameIsUsed=res.data
      //here
    if ( !nameIsUsed) {
    //console.log(this.state.cryptoBoysContract)
      let imageHashes=[];
      //let allCategories=[];
      let previousTokenId;
      previousTokenId = await this.state.DigiFashionContract.methods
        .cryptoBoyCounter()
        .call();
      // previousTokenId = previousTokenId;
     // res = await axios.get('http://localhost:8080/count')
     //here
      // NFTDataService.getCount()
      // .then(response=>
      //   {
      //     console.log(response)
      //     previousTokenId=response.data;
      //   })
        //till here
     // console.log(res.data)
     // previousTokenId=res.data;

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
    
      //creating  a image hash to store on blockchain
      const imageHash = `https://ipfs.infura.io/ipfs/${file.path}`;
      
      const imageIsUsed=await this.state.DigiFashionContract.methods.imageExists(imageHash).call();
      // //this.setState({ imageIsUsed: imageIsUsed });
      // console.log(imageIsUsed);
      //let imageIsUsed;
      //res = await axios.post('http://localhost:8080/imageUsed',{image:imageHash})
      //here
      // NFTDataService.getImageIsUsed(name)
      //   .then(response=>
      //     {
      //       console.log(response)
      //       imageIsUsed=response.data;
      //     })
      //till here
      //console.log(res.data)
      //imageIsUsed=res.data
      if(!imageIsUsed){
      const tokenObject = {
        tokenName: "Crypto Boy",
        tokenSymbol: "CB",
        tokenId: `${tokenId}`,
        image:`${imageHash}`,
        name:name,
        description:description,
        //price:window.web3.utils.toWei(tokenPrice.toString(), "ether"),
        price:tokenPrice,
        dressPrice:tokenDressPrice,
        images:imageHashes,
        categories:categories,
        sizeChart:sizeChart,
        noOfTransfers:0
        
        }
        //storing the token object on ipfs
        const  cid= await ipfs.add(JSON.stringify(tokenObject))
        console.log(cid.path)
        //setting the token uri as the path of token object
        let tokenURI = `https://ipfs.infura.io/ipfs/${cid.path}`;
        //let tokenURI = `https://ipfs.infura.io/ipfs/${tokenId}`;
     const price = window.web3.utils.toWei(tokenPrice.toString(), "ether");
     //const price = window.web3.utils.fromWei(tokenPrice.toString());
     //const price=tokenPrice.toString();
     //console.log(price)
    const dressPrice = window.web3.utils.toWei(tokenDressPrice.toString(), "Ether");
  //const dressPrice = window.web3.utils.fromWei(tokenDressPrice.toString());
    //  res = await axios.post('http://localhost:8080/createDesign',{ name:name, tokenURI:tokenURI,
    //                                                                price:price, dressPrice:dressPrice,
    //                                                                //imageHash:imageHash,
    //                                                                amount:amount,account: this.state.accountAddress,fee:web3.eth.generate_gas_price() })
     
    this.state.DigiFashionContract.methods
        .mintCryptoBoy(name,tokenURI,price,dressPrice,imageHash)
        .send({ from: this.state.accountAddress })
        .on("confirmation", () => {
          localStorage.setItem(this.state.accountAddress, new Date().getTime());
          this.setState({ loading: false });
          Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            title: `Item Created`,
            confirmButtonText: 'Okay',
            icon: 'success',
            backdrop: false,
            customClass: {
              container: 'my-swal'
            }
            
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href="/marketplace";
           
            } 
            
          })
         
        })
        //here
    // const dataDesign= { name:name, tokenURI:tokenURI,
    //   price:price, dressPrice:dressPrice,
    //   imageHash:imageHash,amount:amount,account: this.state.accountAddress}                                                              
    // NFTDataService.createDesign(dataDesign)
    //     .then(response=>
    //       {
    //         console.log(response)
            
    //       })
          //till here
  //   console.log(response)
  //   if(response)
  //   {Swal.fire({
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     title: `Item Created`,
  //     confirmButtonText: 'Okay',
  //     icon: 'success',
  //     backdrop: false,
  //     customClass: {
  //       container: 'my-swal'
  //     }
      
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       window.location.href="/marketplace";
     
  //     } 
      
  //   })
  // }
     
    //     ;
      }
        else {
           {
            this.setState({ imageIsUsed: true });
            this.setState({ loading: false });
          }
        }}
     
    else {
     
        this.setState({ nameIsUsed: true });
        this.setState({ loading: false });
      
    }
  };

  //mint multiple 
  mintMultipleNFT = async (name,description,buffer,tokenPrice,finalbuffer,categories,amount) => {
    this.setState({ loading: true });
    const web3 = window.web3;
   console.log("buffer2",finalbuffer)
   console.log("categories",categories)
   //console.log("sizechart",sizeChart)
   console.log("name",name)
   console.log("tokenPrice",tokenPrice)
    // const nameIsUsed = await this.state.DigiFashionContract.methods
    //   .tokenNameExists(name)
    //   .call();
    //   console.log("nameisused",nameIsUsed)
      //here
    // let nameIsUsed;
    //   //res = await axios.post('http://localhost:8080/nameUsed',{name:name})
    //   NFTDataService.getNameIsUsed(name)
    //     .then(response=>
    //       {
    //         console.log(response)
    //         nameIsUsed=response.data;
    //       })
      //console.log(res.data)
      //nameIsUsed=res.data
      //here
  //  if ( !nameIsUsed) {
    //console.log(this.state.cryptoBoysContract)
      let imageHashes=[];
      //let allCategories=[];
     
      // previousTokenId = previousTokenId;
     // res = await axios.get('http://localhost:8080/count')
     //here
      // NFTDataService.getCount()
      // .then(response=>
      //   {
      //     console.log(response)
      //     previousTokenId=response.data;
      //   })
        //till here
     // console.log(res.data)
     // previousTokenId=res.data;

      //set Token ID 
     // const tokenId = previousTokenId + 1;
      //adding buffer of image on ipfs
      const  file= await ipfs.add(buffer)
     // const imageHash=file[0]["hash"]
      console.log(file.path)
      for(let i=0;i<finalbuffer.length;i++){
      const filesI=await ipfs.add(finalbuffer[i])
      console.log(filesI.path)
      imageHashes.push(`https://ipfs.infura.io/ipfs/${filesI.path}`);
      }
    
      //creating  a image hash to store on blockchain
      const imageHash = `https://ipfs.infura.io/ipfs/${file.path}`;
      
      //const imageIsUsed=await this.state.DigiFashionContract.methods.imageExists(imageHash).call();
      // //this.setState({ imageIsUsed: imageIsUsed });
      // console.log(imageIsUsed);
      //let imageIsUsed;
      //res = await axios.post('http://localhost:8080/imageUsed',{image:imageHash})
      //here
      // NFTDataService.getImageIsUsed(name)
      //   .then(response=>
      //     {
      //       console.log(response)
      //       imageIsUsed=response.data;
      //     })
      //till here
      //console.log(res.data)
      //imageIsUsed=res.data
      //if(!imageIsUsed){
      
     const price = window.web3.utils.toWei(tokenPrice.toString(), "ether");
     //const price = window.web3.utils.fromWei(tokenPrice.toString());
     //const price=tokenPrice.toString();
     //console.log(price)
    //const dressPrice = window.web3.utils.toWei(tokenDressPrice.toString(), "Ether");
  //const dressPrice = window.web3.utils.fromWei(tokenDressPrice.toString());
    //  res = await axios.post('http://localhost:8080/createDesign',{ name:name, tokenURI:tokenURI,
    //                                                                price:price, dressPrice:dressPrice,
    //                                                                //imageHash:imageHash,
    //                                                                amount:amount,account: this.state.accountAddress,fee:web3.eth.generate_gas_price() })
  
    //let ids=[];
    //let amounts=[];

    //for(var i=1; i<=amount ; i++ ) {
      
      //let itokenId=i+previousTokenId;
      // ids[i-1]=i+previousTokenId;
      //ids.push(i+previousTokenId);
     // amounts.push(1);
      const tokenObject = {
        tokenName: "Crypto Boy",
        tokenSymbol: "CB",
        //tokenId: `${itokenId}`,
        image:`${imageHash}`,
        name:name,
        description:description,
        mintedBy:this.state.accountAddress,
        //price:window.web3.utils.toWei(tokenPrice.toString(), "ether"),
        //price:tokenPrice,
        //dressPrice:tokenDressPrice,
        images:imageHashes,
        //categories:categories,
        //sizeChart:sizeChart,
        //noOfTransfers:0
        
        }
        //storing the token object on ipfs
        const  cid= await ipfs.add(JSON.stringify(tokenObject))
        console.log(cid.path)
        //setting the token uri as the path of token object
        // let tokenURI = `https://ipfs.infura.io/ipfs/${cid.path}`;
        //let tokenURI = `https://ipfs.infura.io/ipfs/${tokenId}`;
        let tokenURI=cid.path;
        // this.state.DigiFashionERC1155Contract.methods
        // .updateTokenMetadata(itokenId,tokenURI)
        // .send({ from: this.state.accountAddress })
        // .on("confirmation",()=>{

        // })
    //}
console.log(amount,tokenURI,window.web3.utils.toWei(tokenPrice, "Ether"))
    this.state.DigiFashionERC1155Contract.methods
        .mintMultipleTokens(amount,tokenURI,window.web3.utils.toWei(tokenPrice, "Ether"))
        .send({ from: this.state.accountAddress })
        .on("confirmation", () => {
          localStorage.setItem(this.state.accountAddress, new Date().getTime());
          this.setState({ loading: false });
          Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            title: `Item Created`,
            confirmButtonText: 'Okay',
            icon: 'success',
            backdrop: false,
            customClass: {
              container: 'my-swal'
            }
            
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href="/marketplace";
           
            } 
            
          })
         
        })
        //here
    // const dataDesign= { name:name, tokenURI:tokenURI,
    //   price:price, dressPrice:dressPrice,
    //   imageHash:imageHash,amount:amount,account: this.state.accountAddress}                                                              
    // NFTDataService.createDesign(dataDesign)
    //     .then(response=>
    //       {
    //         console.log(response)
            
    //       })
          //till here
  //   console.log(response)
  //   if(response)
  //   {Swal.fire({
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     title: `Item Created`,
  //     confirmButtonText: 'Okay',
  //     icon: 'success',
  //     backdrop: false,
  //     customClass: {
  //       container: 'my-swal'
  //     }
      
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       window.location.href="/marketplace";
     
  //     } 
      
  //   })
  // }
     
    //     ;
    //   }
    //     else {
    //        {
    //         this.setState({ imageIsUsed: true });
    //         this.setState({ loading: false });
    //       }
    //     }}
     
    // else {
     
    //     this.setState({ nameIsUsed: true });
    //     this.setState({ loading: false });
      
    // }
  };
// Put or remove from sale on the marketplace
  toggleForSale = async(tokenId) => {
    this.setState({ loading: true });
    this.state.DigiFashionContract.methods
      .toggleForSale(tokenId)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        Swal.fire({
          allowOutsideClick: false,
          allowEscapeKey: false,
          title: `Sale status changed`,
          confirmButtonText: 'Okay',
          icon: 'success',
          backdrop: false,
          customClass: {
            container: 'my-swal'
          }
          
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
         
          } 
          
        })
        
      });
    const web3 = window.web3;
    //res = await axios.post('http://localhost:8080/toggleSale',{ tokenId:tokenId,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
    //here
    // const toggleData={
    //   tokenId:tokenId,account: this.state.accountAddress
    // }
    // NFTDataService.toggleSale(toggleData)
    //     .then(response=>
    //       {
    //         console.log(response)
            
    //       })
    // console.log(response)
    // if(response){
    //   this.setState({ loading: false });
      // Swal.fire({
      //   allowOutsideClick: false,
      //   allowEscapeKey: false,
      //   title: `Sale status changed`,
      //   confirmButtonText: 'Okay',
      //   icon: 'success',
      //   backdrop: false,
      //   customClass: {
      //     container: 'my-swal'
      //   }
        
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     window.location.reload();
       
      //   } 
        
      // })
   // }
    //till here
    
  };
//Change the price of token 
  changeTokenPrice = async(tokenId, newPrice) => {
    this.setState({ loading: true });
    const web3 = window.web3;
    const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
    // res = await axios.post('http://localhost:8080/changeTokenPrice',{ tokenId:tokenId,
    // newTokenPrice:newTokenPrice,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
    this.state.DigiFashionContract.methods
    .changeTokenPrice(tokenId, newTokenPrice,false)
    .send({ from: this.state.accountAddress })
    .on("confirmation", () => {
      this.setState({ loading: false });
      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: `Price Changed`,
        confirmButtonText: 'Okay',
        icon: 'success',
        backdrop: false,
        customClass: {
          container: 'my-swal'
        }
        
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
       
        } 
        
      })
     
    });
    //here
    
    // const changePrice={tokenId:tokenId,
    //   newTokenPrice:newTokenPrice,account: this.state.accountAddress}
    // NFTDataService.changeTokenPrice(changePrice)
    // .then(response=>
    //   {
    //     console.log(response)
        
    //   })
    // //console.log(res)
    // if(response){
    //   this.setState({ loading: false });
    //   Swal.fire({
    //     allowOutsideClick: false,
    //     allowEscapeKey: false,
    //     title: `Price Changed`,
    //     confirmButtonText: 'Okay',
    //     icon: 'success',
    //     backdrop: false,
    //     customClass: {
    //       container: 'my-swal'
    //     }
        
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       window.location.reload();
       
    //     } 
        
    //   })
    // }
    //till  here
 
  };
//CHange erc1155 price
//Change the price of token 
changeTokenPriceERC1155 = async(tokenId, newPrice) => {
  this.setState({ loading: true });
  const web3 = window.web3;
  const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
  // res = await axios.post('http://localhost:8080/changeTokenPrice',{ tokenId:tokenId,
  // newTokenPrice:newTokenPrice,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
  this.state.DigiFashionERC1155Contract.methods
  .updateTokenPrice(tokenId, newTokenPrice)
  .send({ from: this.state.accountAddress })
  .on("confirmation", () => {
    this.setState({ loading: false });
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      title: `Price Changed`,
      confirmButtonText: 'Okay',
      icon: 'success',
      backdrop: false,
      customClass: {
        container: 'my-swal'
      }
      
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
     
      } 
      
    })
   
  });
  console.log("PriceChange");
  //here
  
  // const changePrice={tokenId:tokenId,
  //   newTokenPrice:newTokenPrice,account: this.state.accountAddress}
  // NFTDataService.changeTokenPrice(changePrice)
  // .then(response=>
  //   {
  //     console.log(response)
      
  //   })
  // //console.log(res)
  // if(response){
  //   this.setState({ loading: false });
  //   Swal.fire({
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     title: `Price Changed`,
  //     confirmButtonText: 'Okay',
  //     icon: 'success',
  //     backdrop: false,
  //     customClass: {
  //       container: 'my-swal'
  //     }
      
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       window.location.reload();
     
  //     } 
      
  //   })
  // }
  //till  here

};
//Change the price of tokenDress 
changeTokenDressPrice = async(tokenId, newPrice) => {
  this.setState({ loading: true });
  const web3 = window.web3;
  const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
  this.state.DigiFashionContract.methods
    .changeTokenDressPrice(tokenId, newTokenPrice,true)
    .send({ from: this.state.accountAddress })
    .on("confirmation", () => {
      this.setState({ loading: false });
      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title:  `Price Changed`,
        confirmButtonText: 'Okay',
        icon: 'success',
        backdrop: false,
        customClass: {
          container: 'my-swal'
        }
        
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
       
        } 
        
      })
      
    });
  // res = await axios.post('http://localhost:8080/changeTokenDressPrice',{ tokenId:tokenId,
  //   newTokenPrice:newTokenPrice,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
  //here 
  // const changeDressPrice={tokenId:tokenId,
  //     newTokenPrice:newTokenPrice,account: this.state.accountAddress}
  //   NFTDataService.changeTokenDressPrice(changeDressPrice)
  //   .then(response=>
  //     {
  //       console.log(response)
        
  //     })
  //   //console.log(res)
  //   if(response){
  //     this.setState({ loading: false });
  //     Swal.fire({
  //       allowOutsideClick: false,
  //       allowEscapeKey: false,
  //       title: `Price Changed`,
  //       confirmButtonText: 'Okay',
  //       icon: 'success',
  //       backdrop: false,
  //       customClass: {
  //         container: 'my-swal'
  //       }
        
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         window.location.reload();
       
  //       } 
        
  //     })
  //   }
    //till here
};  

//Buy a token  
  buyCryptoBoy = async(tokenId, price) => {
    //console.log(typeof(parseInt(price)));
    //price = window.web3.utils.toWei(price);
    const web3 = window.web3;
    this.setState({ loading: true });
    await this.state.tokenContract.methods.approve(this.state.networkData.address, price).send({ from: this.state.accountAddress}).on('transactionHash', (hash) => {
      console.log('approved')
     // this.state.token.methods.transfer(this.state.accountAddress,price).send({ from: this.state.accountAddress }).on('transactionHash', (hash) => {
      //console.log("here ")
      this.state.DigiFashionContract.methods
      .buyToken(tokenId,price,this.state.networkData.address)
      .send({ from:this.state.accountAddress})
      .on("transactionHash",(hash)=>{
       console.log("done")
       this.setState({ loading: false });
       Swal.fire({
         allowOutsideClick: false,
         allowEscapeKey: false,
         title: `Item Bought`,
         confirmButtonText: 'Okay',
         icon: 'success',
         backdrop: false,
         customClass: {
           container: 'my-swal'
         }
         
       }).then((result) => {
         if (result.isConfirmed) {
           window.location.reload();
        
         }
      })
    })
  });
    // this.state.cryptoBoysContract.methods
    //   .buyToken(tokenId)
    //   .send({ from: this.state.accountAddress, value: price })
    //   .on("confirmation", () => {
    //     this.setState({ loading: false });
    //     Swal.fire({
    //       allowOutsideClick: false,
    //       allowEscapeKey: false,
    //       title: `Item Bought`,
    //       confirmButtonText: 'Okay',
    //       icon: 'success',
    //       backdrop: false,
    //       customClass: {
    //         container: 'my-swal'
    //       }
          
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         window.location.reload();
         
    //       } 
          
    //     })
       
    //   });
    // res = await axios.post('http://localhost:8080/buyCryptoBoy',{ tokenId:tokenId,
    // price:price,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
    //here
    // const onlyDesign={tokenId:tokenId,
    //   price:price,account: this.state.accountAddress}
    // NFTDataService.buyCryptoBoy(onlyDesign)
    // .then(response=>
    //   {
    //     console.log(response)
        
    //   })
    // //console.log(res)
    // if(!response){
    //   Swal.fire({
    //     allowOutsideClick: false,
    //     allowEscapeKey: false,
    //     title: `Could Not Bought`,
    //     confirmButtonText: 'Okay',
    //     icon: 'anger',
    //     backdrop: false,
    //     customClass: {
    //       container: 'my-swal'
    //     }
        
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       window.location.reload();
       
    //     } 
        
    //   })
    // }
   
    // else{
    //   this.setState({ loading: false });
    //   Swal.fire({
    //     allowOutsideClick: false,
    //     allowEscapeKey: false,
    //     title: `Item Bought`,
    //     confirmButtonText: 'Okay',
    //     icon: 'success',
    //     backdrop: false,
    //     customClass: {
    //       container: 'my-swal'
    //     }
        
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       window.location.reload();
       
    //     } 
        
    //   })
    // }
    //till here
  
  };

// bUy erc 1155
//Buy a token  
buyCryptoBoyERC1155 = async(tokenId, price) => {
  //console.log(typeof(parseInt(price)));
  //price = window.web3.utils.toWei(price);
  console.log(price);
  const web3 = window.web3;
  this.setState({ loading: true });
  //await this.state.tokenContract.methods.approve(this.state.networkData.address, price).send({ from: this.state.accountAddress}).on('transactionHash', (hash) => {
   // console.log('approved')
   // this.state.token.methods.transfer(this.state.accountAddress,price).send({ from: this.state.accountAddress }).on('transactionHash', (hash) => {
    //console.log("here ")
    this.state.DigiFashionERC1155Contract.methods
    .buySingleToken(tokenId)
    .send({ from:this.state.accountAddress ,value:price})
    .on("transactionHash",(hash)=>{
     console.log("done")
     this.setState({ loading: false });
     Swal.fire({
       allowOutsideClick: false,
       allowEscapeKey: false,
       title: `Item Bought`,
       confirmButtonText: 'Okay',
       icon: 'success',
       backdrop: false,
       customClass: {
         container: 'my-swal'
       }
       
     }).then((result) => {
       if (result.isConfirmed) {
         window.location.reload();
      
       }
    })
  })
//});
  // this.state.cryptoBoysContract.methods
  //   .buyToken(tokenId)
  //   .send({ from: this.state.accountAddress, value: price })
  //   .on("confirmation", () => {
  //     this.setState({ loading: false });
  //     Swal.fire({
  //       allowOutsideClick: false,
  //       allowEscapeKey: false,
  //       title: `Item Bought`,
  //       confirmButtonText: 'Okay',
  //       icon: 'success',
  //       backdrop: false,
  //       customClass: {
  //         container: 'my-swal'
  //       }
        
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         window.location.reload();
       
  //       } 
        
  //     })
     
  //   });
  // res = await axios.post('http://localhost:8080/buyCryptoBoy',{ tokenId:tokenId,
  // price:price,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
  //here
  // const onlyDesign={tokenId:tokenId,
  //   price:price,account: this.state.accountAddress}
  // NFTDataService.buyCryptoBoy(onlyDesign)
  // .then(response=>
  //   {
  //     console.log(response)
      
  //   })
  // //console.log(res)
  // if(!response){
  //   Swal.fire({
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     title: `Could Not Bought`,
  //     confirmButtonText: 'Okay',
  //     icon: 'anger',
  //     backdrop: false,
  //     customClass: {
  //       container: 'my-swal'
  //     }
      
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       window.location.reload();
     
  //     } 
      
  //   })
  // }
 
  // else{
  //   this.setState({ loading: false });
  //   Swal.fire({
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     title: `Item Bought`,
  //     confirmButtonText: 'Okay',
  //     icon: 'success',
  //     backdrop: false,
  //     customClass: {
  //       container: 'my-swal'
  //     }
      
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       window.location.reload();
     
  //     } 
      
  //   })
  // }
  //till here

};
//Buy a token with dress
buyCryptoBoyWithDress = async(tokenId, price) => {
  console.log(price)
  const web3 = window.web3;
  this.setState({ loading: true });
  this.setState({ loading: true });
    await this.state.tokenContract.methods.approve(this.state.networkData.address, price).send({ from: this.state.accountAddress}).on('transactionHash', (hash) => {
      console.log('approved')
     // this.state.token.methods.transfer(this.state.accountAddress,price).send({ from: this.state.accountAddress }).on('transactionHash', (hash) => {
      //console.log("here ")
      this.state.DigiFashionContract.methods
      .buyToken(tokenId,price,this.state.networkData.address)
      .send({ from:this.state.accountAddress })
      .on("transactionHash",(hash)=>{
       console.log("done")
       this.setState({ loading: false });
       Swal.fire({
         allowOutsideClick: false,
         allowEscapeKey: false,
         title: `Item Bought`,
         confirmButtonText: 'Okay',
         icon: 'success',
         backdrop: false,
         customClass: {
           container: 'my-swal'
         }
         
       }).then((result) => {
         if (result.isConfirmed) {
           window.location.reload();
        
         }
      })
    })
  });
  // res = await axios.post('http://localhost:8080/buyCryptoBoyWithDress',{ tokenId:tokenId,
  //   price:price,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
  //here
  // const DressDesign={tokenId:tokenId,
  //   price:price,account: this.state.accountAddress}
  // NFTDataService.buyCryptoBoyWithDress(DressDesign)
  // .then(response=>
  //   {
  //     console.log(response)
      
  //   })
  //  // console.log(res)
  //   if(response){
  //     this.setState({ loading: false });
  //     Swal.fire({
  //       allowOutsideClick: false,
  //       allowEscapeKey: false,
  //       title: `Item Bought`,
  //       confirmButtonText: 'Okay',
  //       icon: 'success',
  //       backdrop: false,
  //       customClass: {
  //         container: 'my-swal'
  //       }
        
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         window.location.reload();
       
  //       } 
        
  //     })
  //   }
    //till here
  // this.state.cryptoBoysContract.methods
  //   .buyToken(tokenId)
  //   .send({ from: this.state.accountAddress, value: price })
  //   .on("confirmation", () => {
  //     this.setState({ loading: false });
  //     Swal.fire({
  //       allowOutsideClick: false,
  //       allowEscapeKey: false,
  //       title: `Item Bought`,
  //       confirmButtonText: 'Okay',
  //       icon: 'success',
  //       backdrop: false,
  //       customClass: {
  //         container: 'my-swal'
  //       }
        
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         window.location.href="/my-tokens";
       
  //       } 
        
  //     })
      
     
  //   });
};  
  tokenIdAndPrice=(tokenIdOfDress,tokenName,priceOfDress,ownedEmail,ownedName,sizeDetails)=>{
    console.log("tokenId",tokenIdOfDress)
    console.log("tokenName",tokenName)
    console.log("Price of dress",priceOfDress)
    console.log("Send Email To",ownedEmail)
    console.log("Send Name",ownedName)
    this.setState({dressTokenId:tokenIdOfDress});
    this.setState({designName:tokenName});
    this.setState({dressPrice:priceOfDress});
    this.setState({sendEmailTo:ownedEmail});
    this.setState({sendName:ownedName});
    this.setState({inputFields:sizeDetails})
   // window.location.href=`/sizeDetails/${tokenIdOfDress}/${priceOfDress}`
    
  } 
 searchTermfromApp=async(search)=>{
  
   UserDataService.getByName(search)
   .then(response => 
     { 
       console.log(response);
       this.setState({clickedAddress:response.data[0].userAddress})
     //  setSubmitted(true);
    // console.log(response.data);
   window.location.href=`/their-tokens/${this.state.clickedAddress}`
   
   })
   .catch(e => {
     console.log(e);
     this.setState({userExists:false});
       console.log("username doesnt exist")
   });
   
 }

 searchNFTFromApp=async(val)=>{
  //  result=await this.state.cryptoBoysContract.methods.
  //  nameToId(val).call();
   let result=await this.state.cryptoBoys.find( (cryptoboy) =>cryptoboy.tokenName===val);
   this.setState({clickedAddress: result.tokenId})
                    
   window.location.href=`/nftDetails/${result.tokenId}`
 }
  
  render() {
    
    //console.log(this.state.cryptoBoysContract)
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
      <> <Container maxWidth="false" style={{padding:"0%",minHeight:"100vh"}}> 
    <Router>

    <Navbar connectToMetamask={this.connectToMetamask}
     metamaskConnected={this.state.metamaskConnected} 
     userLoggedIn={this.state.userLoggedIn}
     currentUser={this.state.currentUser}
     searchTermfromApp={this.searchTermfromApp}
     searchData={this.state.allUsers}
     cryptoBoys={this.state.cryptoBoys}
     searchNFTFromApp={this.searchNFTFromApp}/>
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
                //cryptoBoysContract={this.state.cryptoBoysContract}
                // usersContract={this.state.usersContract}
               
                //users={this.state.users}
              />
              )}
            />
            <Route
              path="/account"
      
              render={() => (
                <AccountDetails
                  
                  accountAddress={this.state.accountAddress}
                  accountBalance={this.state.accountBalance}
                  currentUser={this.state.currentUser}
                  
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
                  accountAddress={this.state.accountAddress}
                  accountBalance={this.state.accountBalance}
                  nameIsUsed={this.state.nameIsUsed}
                  emailIsUsed={this.state.emailIsUsed}
                 
                />
              )}
            />
            <Route
              path="/marketplace"
              
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
                //cryptoBoysContract={this.state.cryptoBoysContract}
                // usersContract={this.state.usersContract}
                
                //users={this.state.users}
              />
              )}
            />
             <Route
              path="/marketplacemore"
              
              render={() => (
                <AllCryptoBoysERC1155
                accountAddress={this.state.accountAddress}
               // allcryptoBoys={this.state.allcryptoBoys}
                cryptoBoys={this.state.cryptoERC1155}
                totalTokensMinted={this.state.cryptoERC1155Count}
                changeTokenPrice={this.changeTokenPriceERC1155}
                toggleForSale={this.toggleForSale}
                buyCryptoBoy={this.buyCryptoBoyERC1155}
                callbackFromParent={this.myCallback2}
                erc1155contract={this.state.DigiFashionERC1155Contract}
                //cryptoBoysContract={this.state.cryptoBoysContract}
                // usersContract={this.state.usersContract}
                
                //users={this.state.users}
              />
              )}
            />
            <Route 
              path="/creators"
              render={()=>(
                <AllCreators
                allusers={this.state.allUsers}
                usersContract={this.state.usersContract}
                usersCount={this.state.usersCount}
               // allCreators={this.state.allUsers}
               cryptoBoys={this.state.cryptoBoys}
               />
              )}/>
            <Route
              path="/mint"
             
              render={() => (
                <FormAndPreview
                  mintMyNFT={this.mintMyNFT}
                  nameIsUsed={this.state.nameIsUsed}
                  imageIsUsed={this.state.imageIsUsed}
                  mintMultipleNFT={this.mintMultipleNFT}
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
                  
                 callbackFromParent1={this.myCallback2}
                 
                />
              )}
            />
            <Route
              path="/chat"
              
              render={() => (
                <Chat
                  accountAddress={this.state.accountAddress}
                  currentUser={this.state.currentUser}
                  allusers={this.state.allUsers}
                />
              )}
            />
            <Route
              path={`/their-tokens/${this.state.clickedAddress}`}
              
              render={() => (
                <TheirCryptoBoys
                  accountAddress={this.state.clickedAddress}
                  cryptoBoys={this.state.cryptoBoys}
                  
                  callbackFromParent1={this.myCallback2}
                  //cryptoBoysContract={this.state.cryptoBoysContract}
                  
                  userExists={this.state.userExists}
                  
                 // loading={this.state.loading}
                />
                
              )}
            />
            
             <Route
                path={`/nftDetails/${this.state.clickedAddress}`}
             
              
              render={() => (
              <CryptoBoyNFTDetails
               accountAddress={this.state.accountAddress}
               //cryptoboy={this.state.cryptoBoys[this.state.clickedAddress-1]}
               totalTokensMinted={this.state.totalTokensMinted}
               changeTokenPrice={this.changeTokenPrice}
               changeTokenDressPrice={this.changeTokenDressPrice}
               toggleForSale={this.toggleForSale}
               buyCryptoBoy={this.buyCryptoBoy}
               buyCryptoBoyWithDress={this.buyCryptoBoyWithDress}
               clickedAddress={this.state.clickedAddress}
               callbackFromParent={this.myCallback2}
               callBack={this.tokenIDfun}
               //cryptoBoysContract={this.state.cryptoBoysContract}
               
               cryptoBoys={this.state.cryptoBoys}
               loading={this.state.loading}
               tokenExists={this.state.tokenExists}
              
               tokenIdAndPrice={this.tokenIdAndPrice}
               />
              )}
             />
              <Route
                path={`/multiDetails/${this.state.clickedAddress}`}
             
              
              render={() => (
              <CryptoBoyERC1155Details
               accountAddress={this.state.accountAddress}
               //cryptoboy={this.state.cryptoBoys[this.state.clickedAddress-1]}
               totalTokensMinted={this.state.cryptoERC1155Count}
               changeTokenPrice={this.changeTokenPriceERC1155}
               changeTokenDressPrice={this.changeTokenDressPrice}
               toggleForSale={this.toggleForSale}
               buyCryptoBoy={this.buyCryptoBoyERC1155}
               buyCryptoBoyWithDress={this.buyCryptoBoyWithDress}
               clickedAddress={this.state.clickedAddress}
               callbackFromParent={this.myCallback2}
               callBack={this.tokenIDfun}
               //cryptoBoysContract={this.state.cryptoBoysContract}
               cryptoBoys={this.state.cryptoERC1155}
               loading={this.state.loading}
               //tokenExists={this.state.tokenExists}
               tokenExists={true}
               tokenIdAndPrice={this.tokenIdAndPrice}
               erc1155contract={this.state.DigiFashionERC1155Contract}
               />
              )}
             />
             <Route
              path={`/sizeDetails`}
              
              render={() => (
                <SizeDetails
                  tokenNoOfDress={this.state.dressTokenId}
                  designName={this.state.designName}
                  sizeInputField={this.state.inputFields}
                  priceOfDress={this.state.dressPrice}
                  sendEmailTo={this.state.sendEmailTo}
                  sendName={this.state.sendName}
                  currentUser={this.state.currentUser}
                  buyCryptoBoyWithDress={this.buyCryptoBoyWithDress}
                />
              )}
            />
          
        
          </Switch>
    </Router>
    <Box mt={8}>
        <Footer />
      </Box>
      </Container></>
      {/* ) } */}
       
      </div>

    );
  }
}

export default App;
