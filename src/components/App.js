import React, { Component } from "react";
import { HashRouter,Route } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import CryptoBoys from "../abis/CryptoBoys.json";
import CryptoBoyNFTDetails from "./CryptoBoyNFTDetails/CryptoBoyNFTDetails";
import FormAndPreview from "../components/FormAndPreview/FormAndPreview";
import AllCryptoBoys from "./AllCryptoBoys/AllCryptoBoys";
import AccountDetails from "./AccountDetails/AccountDetails";
import ContractNotDeployed from "./ContractNotDeployed/ContractNotDeployed";
import ConnectToMetamask from "./ConnectMetamask/ConnectToMetamask";
import Loading from "./Loading/Loading";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      cryptoBoysContract: null,
      cryptoBoysCount: 0,
      cryptoBoys: [],
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      totalTokensMinted: 0,
      totalTokensOwnedByAccount: 0,
      imageIsUsed: false,
      clickedAddress:"",
      tokenID:"",
      lastMintTime: null,
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
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
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      this.setState({ loading: false });
      //Network ID
      const networkId = await web3.eth.net.getId();
      const networkData = CryptoBoys.networks[networkId];
      if (networkData) {
        this.setState({ loading: true });
        const cryptoBoysContract = web3.eth.Contract(
          CryptoBoys.abi,
          networkData.address
        );
        //set contract
        this.setState({ cryptoBoysContract });
        this.setState({ contractDetected: true });
        //get number of designs minted on the platform
        const cryptoBoysCount = await cryptoBoysContract.methods
          .cryptoBoyCounter()
          .call();
        this.setState({ cryptoBoysCount });
        //get all the designs
        for (var i = 1; i <= cryptoBoysCount; i++) {
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
    }
  };
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
      });
    }
  };

  mintMyNFT = async (name,description,buffer,tokenPrice,finalbuffer) => {
    this.setState({ loading: true });
   console.log("buffer2",finalbuffer)
   
  //   const nameIsUsed = await this.state.cryptoBoysContract.methods
  //     .tokenNameExists(name)
  //     .call();
  //  if ( !nameIsUsed) {
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

  render() {
    
    return (
    
      <div>
      {/* {
      !this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : 
        !this.state.contractDetected ? (
        <ContractNotDeployed />
      ) 
      this.state.loading ? (
        <Loading />
      ) :( */}
      <> <Container maxWidth="xl"> 
    
      
        <HashRouter basename="/">
          
            <Navbar connectToMetamask={this.connectToMetamask} metamaskConnected={this.state.metamaskConnected}/>
            <Route
              path="/"
              exact
              render={() => (
               <AllCryptoBoys
               accountAddress={this.state.accountAddress}
               cryptoBoys={this.state.cryptoBoys}
               totalTokensMinted={this.state.totalTokensMinted}
               changeTokenPrice={this.changeTokenPrice}
               toggleForSale={this.toggleForSale}
               buyCryptoBoy={this.buyCryptoBoy}
               callbackFromParent={this.myCallback2}/>
              )}
            />
            <Route
              path="/account"
      
              render={() => (
                <AccountDetails
                  accountAddress={this.state.accountAddress}
                  accountBalance={this.state.accountBalance}
                />
              )}
            />
             <Route
              path="/profile"
      
              render={() => (
                <Profile
                  accountAddress={this.state.accountAddress}
                  accountBalance={this.state.accountBalance}
                />
              )}
            />
            <Route
              path="/marketplace"
              
              render={() => (
                <AllCryptoBoys
                  accountAddress={this.state.accountAddress}
                  cryptoBoys={this.state.cryptoBoys}
                  totalTokensMinted={this.state.totalTokensMinted}
                  changeTokenPrice={this.changeTokenPrice}
                  toggleForSale={this.toggleForSale}
                  buyCryptoBoy={this.buyCryptoBoy}
                  callbackFromParent={this.myCallback2}
                />
              )}
            />
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
                />
              )}
            />
            <Route
              path="/their-tokens"
              
              render={() => (
                <TheirCryptoBoys
                  accountAddress={this.state.clickedAddress}
                  cryptoBoys={this.state.cryptoBoys}
                  totalTokensOwnedByAccount={
                    this.state.totalTokensOwnedByAccount
                  }
                  callbackFromParent1={this.myCallback2}
                />
                
              )}
            />
            
             <Route
              // path={`/nftDetails/${this.clickedAddress}`}
              path="/nftDetails"
              
              render={() => (
              <CryptoBoyNFTDetails
               accountAddress={this.state.accountAddress}
               cryptoboy={this.state.cryptoBoys[this.state.clickedAddress-1]}
               totalTokensMinted={this.state.totalTokensMinted}
               changeTokenPrice={this.changeTokenPrice}
               toggleForSale={this.toggleForSale}
               buyCryptoBoy={this.buyCryptoBoy}
               clickedAddress={this.state.clickedAddress}
               callbackFromParent={this.myCallback2}
               callBack={this.tokenIDfun}
               cryptoBoysContract={this.state.cryptoBoysContract}/>
              )}
            />
          
          </HashRouter>
     
      </Container></>
      {/* ) } */}
       
      </div>

    );
  }
}

export default App;
