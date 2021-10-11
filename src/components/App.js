import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import { useHistory } from 'react-router';
import "./App.css";

import Web3 from "web3";
import CryptoBoys from "../abis/CryptoBoys.json";
import EthSwap from "../abis/EthSwap.json";
import Token from "../abis/Token.json";
import CryptoBoyNFTDetails from "./CryptoBoyNFTDetails/CryptoBoyNFTDetails";
import FormAndPreview from "../components/FormAndPreview/FormAndPreview";
import AllCryptoBoys from "./AllCryptoBoys/AllCryptoBoys";
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
import {Container,Box} from '@material-ui/core';
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

let res;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      cryptoBoysContract: null,
      token:null,
      ehtSwap:null,
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
  }
 
  componentDidMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.loadAllUsers();
    await this.loadCurrentUser();
  //  await this.loadDesigns(this.state.startState,this.state.endState);
  await this.setMetaData();
  //  await this.setMintBtnTimer();
  };
  async componentDidUpdate(prevProps,prevState){
    console.log("prevState",prevState)
    console.log("this state",this.state)
    if(prevState.accountAddress!=this.state.accountAddress){
      await this.loadWeb3()
      //await this.loadBlockchainData()
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
      
      //let accountBalance = await web3.eth.getBalance(accounts[0]);
       //accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      //console.log(accountBalance)
      // this.setState({ accountBalance });
      res = await axios.post('http://localhost:8080/accountBalance',{account:this.state.accountAddress})
      console.log(res)
      // NFTDataService.getAccountBalance(this.state.accountAddress)
      //         .then(response=>
      //           {
      //             console.log(response)
      //             let myBalance=parseFloat(response.data)
      //             myBalance=myBalance.toFixedSpecial(0)
      //             this.setState({ accountBalance:myBalance });
      //           })
      //let accountBalance = web3.utils.toWei(res.data);
      let myBalance=parseFloat(res.data)
      myBalance=myBalance.toFixedSpecial(0)
      this.setState({ accountBalance:myBalance });
      //this.setState({ accountBalance:res.data });
      console.log(myBalance)
    //console.log(myBalance.toFixed())
     // console.log(window.web3.utils.fromWei(this.state.accountBalance.toString()))
      this.setState({ loading: false });
      
    
      
      //Network ID
    //  const networkId = await web3.eth.net.getId();
    //   const networkData1 = CryptoBoys.networks[networkId];
    //  const ethSwapData = EthSwap.networks[networkId]
    //   const tokenData = Token.networks[networkId]
    //   this.setState({ethSwapDataAdd:ethSwapData.address})
     
    //  if (networkData1) {
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
        
        res = await axios.get('http://localhost:8080/count')
       console.log(res)
       this.setState({ cryptoBoysCount:res.data });
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
          res = await axios.get('http://localhost:8080/allDesigns')
          console.log(res.data)
          this.setState({
            cryptoBoys: res.data,
          });
        //}
       
       
        
        //get number of tokens on the platform
        // let totalTokensMinted = await cryptoBoysContract.methods
        //   .getNumberOfTokensMinted()
        //   .call();
        // totalTokensMinted = totalTokensMinted;
        // console.log(totalTokensMinted)
        // this.setState({ totalTokensMinted });
        res = await axios.get('http://localhost:8080/tokensMinted')
        console.log(res.data)
        this.setState({ totalTokensMinted:res.data });
        //get tokens owned by current account
        // let totalTokensOwnedByAccount = await cryptoBoysContract.methods
        //   .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
        //   .call();
        // totalTokensOwnedByAccount = totalTokensOwnedByAccount;
        // this.setState({ totalTokensOwnedByAccount });
        res = await axios.post('http://localhost:8080/tokensOwnedByAccount',{account:this.state.accountAddress})
      //console.log(res)
      this.setState({ totalTokensOwnedByAccount:res.data });
        this.setState({ loading: false });
      //} else {
        this.setState({ contractDetected: false });
      //}
   
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
loadCurrentUser=()=>{
  UserDataService.getByAddress(this.state.accountAddress)
      .then(response => 
        { 
          console.log(response);
        this.setState({currentUser:{
          userId: response.data[0].userId,
          userName: response.data[0].userName,
          userEmail: response.data[0].userEmail,
          userSocial: response.data[0].userSocial,
          userRepo: response.data[0].userRepo,
          userBio: response.data[0].userBio,
          userAvatarHash: response.data[0].userAvatarHash,
          userAddress: response.data[0].userAddress
        }
        });
      
       console.log(this.state.currentUser)
      
      })
      .catch(e => {
        console.log(e);
      });
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
    // const nameIsUsed = await this.state.cryptoBoysContract.methods
    //   .tokenNameExists(name)
    //   .call();
    //   console.log("nameisused",nameIsUsed)
    let nameIsUsed;
      res = await axios.post('http://localhost:8080/nameUsed',{name:name})
      console.log(res.data)
      nameIsUsed=res.data
    if ( !nameIsUsed) {
    //console.log(this.state.cryptoBoysContract)
      let imageHashes=[];
      //let allCategories=[];
      let previousTokenId;
      // previousTokenId = await this.state.cryptoBoysContract.methods
      //   .cryptoBoyCounter()
      //   .call();
      // previousTokenId = previousTokenId;
      res = await axios.get('http://localhost:8080/count')
      console.log(res.data)
      previousTokenId=res.data;

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
      
      // const imageIsUsed=await this.state.cryptoBoysContract.methods.imageExists(imageHash).call();
      // //this.setState({ imageIsUsed: imageIsUsed });
      // console.log(imageIsUsed);
      let imageIsUsed;
      res = await axios.post('http://localhost:8080/imageUsed',{image:imageHash})
      console.log(res.data)
      imageIsUsed=res.data
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
     res = await axios.post('http://localhost:8080/createDesign',{ name:name, tokenURI:tokenURI,
                                                                   price:price, dressPrice:dressPrice,
                                                                   //imageHash:imageHash,
                                                                   amount:amount,account: this.state.accountAddress,fee:web3.eth.generate_gas_price() })
    
    console.log(res)
    if(res)
    {Swal.fire({
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
  }
    //  this.state.cryptoBoysContract.methods
    //     .mintCryptoBoy(name,tokenURI,price,dressPrice,imageHash)
    //     .send({ from: this.state.accountAddress })
    //     .on("confirmation", () => {
    //       localStorage.setItem(this.state.accountAddress, new Date().getTime());
    //       this.setState({ loading: false });
         
         
    //     })
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
// Put or remove from sale on the marketplace
  toggleForSale = async(tokenId) => {
    this.setState({ loading: true });
    const web3 = window.web3;
    res = await axios.post('http://localhost:8080/toggleSale',{ tokenId:tokenId,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
    
    console.log(res)
    if(res){
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
    }
    // this.state.cryptoBoysContract.methods
    //   .toggleForSale(tokenId)
    //   .send({ from: this.state.accountAddress })
    //   .on("confirmation", () => {
    //     this.setState({ loading: false });
      
        
    //   });
  };
//Change the price of token 
  changeTokenPrice = async(tokenId, newPrice) => {
    this.setState({ loading: true });
    const web3 = window.web3;
    const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
    res = await axios.post('http://localhost:8080/changeTokenPrice',{ tokenId:tokenId,
    newTokenPrice:newTokenPrice,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
    
    console.log(res)
    if(res){
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
    }
    // this.state.cryptoBoysContract.methods
    //   .changeTokenPrice(tokenId, newTokenPrice)
    //   .send({ from: this.state.accountAddress })
    //   .on("confirmation", () => {
    //     this.setState({ loading: false });
        
       
    //   });
  };
//Change the price of tokenDress 
changeTokenDressPrice = async(tokenId, newPrice) => {
  this.setState({ loading: true });
  const web3 = window.web3;
  const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
  // this.state.cryptoBoysContract.methods
  //   .changeTokenDressPrice(tokenId, newTokenPrice)
  //   .send({ from: this.state.accountAddress })
  //   .on("confirmation", () => {
  //     this.setState({ loading: false });
  //     Swal.fire({
  //       allowOutsideClick: false,
  //       allowEscapeKey: false,
  //       title:  `Price Changed`,
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
  res = await axios.post('http://localhost:8080/changeTokenDressPrice',{ tokenId:tokenId,
    newTokenPrice:newTokenPrice,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
    
    console.log(res)
    if(res){
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
    }
};  

//Buy a token  
  buyCryptoBoy = async(tokenId, price) => {
    //console.log(typeof(parseInt(price)));
    //price = window.web3.utils.toWei(price);
    const web3 = window.web3;
    this.setState({ loading: true });
    res = await axios.post('http://localhost:8080/buyCryptoBoy',{ tokenId:tokenId,
    price:price,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
    
    console.log(res)
    if(!res){
      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: `Could Not Bought`,
        confirmButtonText: 'Okay',
        icon: 'anger',
        backdrop: false,
        customClass: {
          container: 'my-swal'
        }
        
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
       
        } 
        
      })
    }
   
    else{
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
    }
  //   await this.state.token.methods.approve(this.state.ethSwapDataAdd, price).send({ from: this.state.accountAddress}).on('transactionHash', (hash) => {
  //     console.log('approved')
  //    // this.state.token.methods.transfer(this.state.accountAddress,price).send({ from: this.state.accountAddress }).on('transactionHash', (hash) => {
  //     //console.log("here ")
  //     this.state.cryptoBoysContract.methods
  //     .buyToken(tokenId,price,this.state.ethSwapDataAdd)
  //     .send({ from:this.state.accountAddress })
  //     .on("transactionHash",(hash)=>{
  //      console.log("done")
  //      this.setState({ loading: false });
  //      Swal.fire({
  //        allowOutsideClick: false,
  //        allowEscapeKey: false,
  //        title: `Item Bought`,
  //        confirmButtonText: 'Okay',
  //        icon: 'success',
  //        backdrop: false,
  //        customClass: {
  //          container: 'my-swal'
  //        }
         
  //      }).then((result) => {
  //        if (result.isConfirmed) {
  //          window.location.reload();
        
  //        }
  //     })
  //   })
  // });
    // this.state.cryptoBoysContract.methods
    //   .buyToken(tokenId)
    //   .send({ from: this.state.accountAddress, value: price })
    //   .on("confirmation", () => {
        // this.setState({ loading: false });
        // Swal.fire({
        //   allowOutsideClick: false,
        //   allowEscapeKey: false,
        //   title: `Item Bought`,
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
          
    //     })
       
    //   });
  };
//Buy a token with dress
buyCryptoBoyWithDress = async(tokenId, price) => {
  console.log(price)
  const web3 = window.web3;
  this.setState({ loading: true });
  res = await axios.post('http://localhost:8080/buyCryptoBoyWithDress',{ tokenId:tokenId,
    price:price,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
    
    console.log(res)
    if(res){
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
    }
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
