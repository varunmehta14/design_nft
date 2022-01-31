import React, {
  Component
} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";

import Web3 from "web3";
import DigiFashionAbi from "../abis/1155abi.json";
import CryptoBoyNFTDetails from "./CryptoBoyNFTDetails/CryptoBoyNFTDetails";
import Home from '../components/Home/Home';
import FormAndPreview from "../components/FormAndPreview/FormAndPreview";
import AllCryptoBoys from "./AllCryptoBoys/AllCryptoBoys";
import AllCreators from "./AllCreators/AllCreators";
import AccountDetails from "./AccountDetails/AccountDetails";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import MyCryptoBoys from "./MyCryptoBoys/MyCryptoBoys";
import TheirCryptoBoys from "./TheirCryptoBoys/TheirCryptoBoys";
import Footer from "./Footer/Footer";
import SizeDetails from "./SizeDetails/SizeDetails";
import {
  Container,
  Box
} from '@material-ui/core';
import ipfs from './ipfs';
import UserDataService from "../services/UserService";
import NFTDataService from "../services/NFTService";
import Swal from 'sweetalert2';
import imgData from './SizeDetails/imagebase64';
import jsPDF from 'jspdf';


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

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          accountAddress: "",
          accountBalance: "",
          DigiFashionContract: null,

          cryptoBoysCount: 0,
          cryptoERC1155Count: 0,
          usersCount: 0,
          cryptoBoys: [],
          cryptoERC1155: [],
          searchData: [],
          users: [],
          loading: true,
          metamaskConnected: false,
          contractDetected: false,
          totalTokensMinted: 0,
          totalTokensOwnedByAccount: 0,
          imageIsUsed: false,
          nameIsUsed: false,
          emailIsUsed: false,
          clickedAddress: "",
          tokenID: "",
          lastMintTime: null,
          userLoggedIn: false,
          cancelled: null,
          signedUp: false,
          currentUser: initialUserState,
          searchedDesign: null,
          tokenExists: true,
          userExists: true,
          usAdd: "",
          dressTokenId: "",
          dressPrice: "",
          sendEmailTo: "",
          sendName: "",
          inputFields: [],
          designName: "",
          user: initialUserState,
          allUsers: [],


      };
      this.loadWeb3();
      this.loadCurrentUser();
  }

  componentDidMount = async () => {
      await this.loadWeb3();
      await this.loadCurrentUser();
      await this.loadBlockchainData();
      await this.loadAllUsers();
      // await this.setMetaData();

  };
  async componentDidUpdate(prevProps, prevState) {
      console.log("prevState", prevState)
      console.log("this state", this.state)
      if (prevState.accountAddress != this.state.accountAddress) {
          await this.loadWeb3()
          await this.loadCurrentUser()
      }
  }


  myCallback2 = (dataFromChild2) => {
      console.log(dataFromChild2)
      this.setState({
          clickedAddress: dataFromChild2
      })
  }


  tokenIDfun = (tokenIDdata) => {
      console.log(tokenIDdata)
      this.setState({
          tokenID: tokenIDdata
      })
  }

  // setMintBtnTimer = () => {
  //   const mintBtn = document.getElementById("mintBtn");
  //   if (mintBtn !== undefined && mintBtn !== null) {
  //     this.setState({
  //       lastMintTime: localStorage.getItem(this.state.accountAddress),
  //     });
  //     this.state.lastMintTime === undefined || this.state.lastMintTime === null
  //       ? (mintBtn.innerHTML = "Mint My Crypto Boy")
  //       : this.checkIfCanMint(parseInt(this.state.lastMintTime));
  //   }
  // };

  // checkIfCanMint = (lastMintTime) => {
  //   const mintBtn = document.getElementById("mintBtn");
  //   const timeGap = 300000; //5min in milliseconds
  //   const countDownTime = lastMintTime + timeGap;
  //   const interval = setInterval(() => {
  //     const now = new Date().getTime();
  //     const diff = countDownTime - now;
  //     if (diff < 0) {
  //       mintBtn.removeAttribute("disabled");
  //       mintBtn.innerHTML = "Mint My Crypto Boy";
  //       localStorage.removeItem(this.state.accountAddress);
  //       clearInterval(interval);
  //     } else {
  //       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //       const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  //       mintBtn.setAttribute("disabled", true);
  //       mintBtn.innerHTML = `Next mint in ${minutes}m ${seconds}s`;
  //     }
  //   }, 1000);
  // };



  loadBlockchainData = async () => {
      // Number.prototype.toFixedSpecial = function(n) {
      //   var str = this.toFixed(n);
      //   if (str.indexOf('e+') === -1)
      //     return str;

      //   // if number is in scientific notation, pick (b)ase and (p)ower
      //   str = str.replace('.', '').split('e+').reduce(function(b, p) {
      //     return b + Array(p - b.length + 2).join(0);
      //   });

      //   if (n > 0)
      //     str += '.' + Array(n + 1).join(0);

      //   return str;
      // };
      console.log("Load Blockchain")

      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();

      console.log(accounts[0])
      //res = await axios.get('http://localhost:8080/accounts')

      //const accounts=res.data;
      // console.log(res.data[0]);
      if (accounts.length === 0) {
          this.setState({
              metamaskConnected: false
          });
      } else {
          this.setState({
              metamaskConnected: true
          });
          this.setState({
              userLoggedIn: true
          });
          this.setState({
              loading: true
          });
          this.setState({
              accountAddress: accounts[0]
          });
          // let myTokenBalance = await this.state.tokenContract.methods.balanceOf(this.state.accountAddress).call()
          // this.setState({ accountBalance:myTokenBalance });
          let accountBalance = await web3.eth.getBalance(accounts[0]);
          accountBalance = web3.utils.fromWei(accountBalance, "Ether");
          console.log(accountBalance)
          this.setState({
              accountBalance: accountBalance
          });
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
          this.setState({
              loading: false
          });



          //Network ID
          //  const networkId = await web3.eth.net.getId();
          //  const networkData = DigiFashion.networks[networkId];
          //  const networkERC1155Data = DigiFashion.networks[networkId];
          // //  const ethSwapData = EthSwap.networks[networkId]
          //   const tokenData = Token.networks[networkId]
          //  // this.setState({ethSwapDataAdd:ethSwapData.address})
          //   this.setState({networkData});
          //   console.log(this.state.networkData)
          //   this.setState({networkERC1155Data});
          //   this.setState({tokenData});
          //if (networkData) {
          //this.setState({ loading: true });
        //   const contractAddress = "0xC9E1B45EFDB18e13F430deF73fA745722307c5EC";
        // const contractAddress="0x4ECB963c02afFEA726f60A866b57B469e73bEB53";
        const contractAddress="0xdC45e39Fc63C89BDF06dc2Efc03Bad9B87691b80";
          const DigiFashionContract = new web3.eth.Contract(
              DigiFashionAbi,
              contractAddress
          );
          //set contract
          this.setState({
              DigiFashionContract
          });
          console.log(DigiFashionContract)
          this.setState({
              contractDetected: true
          });
          //get number of designs minted on the platform
          let cryptoBoysCount = await DigiFashionContract.methods
              ._tokensMintedCount()
              .call();
          cryptoBoysCount = cryptoBoysCount
          // .toNumber();
          this.setState({
              cryptoBoysCount
          });


          //get all the designs
          let tempDes = [];
          for (var i = 1; i <= cryptoBoysCount; i++) {


              let cryptoBoy = await DigiFashionContract.methods
                  .allDesigns(i)
                  .call();
              // const metaDataURI = await DigiFashionContract.methods
              // .getTokenMetaData(i)
              // .call();
              const metaDataURI = cryptoBoy.tokenURI
              let result = await fetch(metaDataURI);
              const metaDataERC1155 = await result.json();

              // console.log(metaDataERC1155)
              cryptoBoy = [{
                  ...cryptoBoy,
                  "metadata": metaDataERC1155
              }];
              tempDes.push(cryptoBoy);

          }
          this.setState({
              cryptoBoys: tempDes,
          });



          //get number of tokens on the platform
          // let totalTokensMinted = await DigiFashionContract.methods
          //   .getNumberOfTokensMinted()
          //   .call();
          // totalTokensMinted = totalTokensMinted.toNumber();
          // this.setState({ totalTokensMinted });
          //get tokens owned by current account
          // let totalTokensOwnedByAccount = await DigiFashionContract.methods
          //   .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
          //   .call();
          // totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
          // this.setState({ totalTokensOwnedByAccount });
          this.setState({
              loading: false
          });
          //} 
          //else {
          //this.setState({ contractDetected: false });
          //}
          // if(tokenData){
          //   const tokenContract = new web3.eth.Contract(Token.abi, tokenData.address)

          //   this.setState({ tokenContract });
          //   let myTokenBalance = await this.state.tokenContract.methods.balanceOfERC20(this.state.accountAddress).call()
          //   this.setState({ accountBalance:myTokenBalance });
          //   console.log(this.state.accountBalance);
          // }
          // else {
          //   this.setState({ contractDetected: false });
          // }
          //     //if(networkERC1155Data){
          //       const contractAddress="0x9a3Aa3BBe16B933e7Ded5C6604c70600065a3557";
          //      // const DigiFashionContract = new web3.eth.Contract(DigiFashion.abi,networkERC1155Data.address)
          //       const DigiFashionContract = new web3.eth.Contract(DigiFashionAbi.abi,contractAddress);

          //       this.setState({ DigiFashionContract });
          //       // let myTokenBalance = await this.state.tokenContract.methods.balanceOfERC20(this.state.accountAddress).call()
          //       // this.setState({ accountBalance:myTokenBalance });
          //       this.setState({ contractDetected: true });
          // let cryptoERC1155Count = await DigiFashionContract.methods
          //   ._tokensMintedCount()
          //   .call();
          //   cryptoERC1155Count=cryptoERC1155Count.toNumber();
          // this.setState({ cryptoERC1155Count });
          //       console.log(cryptoERC1155Count);
          //       // const currentOwned=await DigiFashionContract.methods.tokenIdToAdd(1).call();
          //       // console.log(currentOwned)
          //        //get all the designs

          //        for (var i = 1; i <=cryptoERC1155Count; i++) {


          //         const metaDataURI = await DigiFashionContract.methods
          //           .getTokenMetaData(i)
          //           .call();
          //         let result = await fetch(`https://ipfs.infura.io/ipfs/${metaDataURI}`);
          //         const metaDataERC1155 = await result.json();
          //         console.log(metaDataERC1155)
          //         const priceERC1155=await DigiFashionContract.methods
          //         .tokenPrice(i)
          //         .call();
          //         const cry1155=[{...metaDataERC1155,"price":priceERC1155,"tokenId":i}]
          //         console.log("cry1155",cry1155);
          //         this.setState({
          //           cryptoERC1155: [...this.state.cryptoERC1155,cry1155],
          //         });
          //         console.log(this.state.cryptoERC1155);
          //     }
          //  // }
          //   //  else {
          //       this.setState({ contractDetected: false });
          //   //  }

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

  loadAllUsers = async () => {
      UserDataService.getAll()
          .then(response => {
              console.log(response.data);
              this.setState({
                  allUsers: response.data
              });
              console.log(this.state.allUsers)
          })
          .catch(e => {
              console.log(e);
          });


  }
  loadCurrentUser = async () => {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();

      console.log(accounts[0])
      //res = await axios.get('http://localhost:8080/accounts')

      //const accounts=res.data;
      // console.log(res.data[0]);
      if (accounts.length === 0) {
          this.setState({
              metamaskConnected: false
          });
      } else {
          this.setState({
              metamaskConnected: true
          });
          this.setState({
              userLoggedIn: true
          });
          this.setState({
              loading: true
          });
          this.setState({
              accountAddress: accounts[0]
          });
          UserDataService.getByAddress(accounts[0])
              .then(response => {
                  console.log(response);
                  this.setState({
                      currentUser: {
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
                  localStorage.setItem('token', response.data.token);
                  console.log('token', localStorage.getItem('token'))
                  console.log(this.state.currentUser)
                  this.setState({
                      signedUp: true
                  });
              })
              .catch(e => {
                  console.log(e);
                  localStorage.setItem('token', 'invalid token');

                  if (window.location.pathname != '/profile' || this.state.cancelled) {
                      Swal.fire({
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          showCancelButton: true,

                          title: `Unauthorized user`,
                          confirmButtonText: 'Sign Up',
                          icon: 'error',
                          backdrop: false,
                          customClass: {
                              container: 'my-swal'
                          }

                      }).then((result) => {
                          if (result.isConfirmed) {
                              window.location.href = `/profile`

                          } else if (result.dismiss) {
                              console.log('dismiss');
                              this.setState({
                                  cancelled: true
                              });
                          }

                      }).catch(e => {
                          console.log(e);
                      });
                  }

              });
      }
  }

  loadWeb3 = async () => {
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.on('accountsChanged', function(accounts) {
              //console.log('accountchange',accounts)
              this.setState({
                  accountAddress: accounts[0]
              });
              document.location.reload();

              localStorage.setItem('token', 'invalid token');
          }.bind(this))
      } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          window.ethereum.on('accountsChanged', function(accounts) {
              //console.log('accountchange',accounts)
              this.setState({
                  accountAddress: accounts[0]
              });
              document.location.reload();
              localStorage.setItem('token', 'invalid token');

          }.bind(this))
      } else {
          window.alert(
              "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
      }
  };
  connectToMetamask = async () => {
      await window.ethereum.enable();
      this.setState({
          metamaskConnected: true
      });
      window.location.reload();
  };

  // setMetaData = async () => {
  //   if (this.state.cryptoBoys.length !== 0) {
  //     this.setState({loading:true})
  //     this.state.cryptoBoys.map(async (cryptoboy) => {
  //       let result = await fetch(cryptoboy.tokenURI);
  //       const metaData = await result.json();
  //       console.log(metaData)
  //       this.setState({
  //         cryptoBoys: this.state.cryptoBoys.map((cryptoboy) =>
  //           cryptoboy.tokenId === metaData.tokenId
  //             ? {
  //                 ...cryptoboy,
  //                 metaData,
  //               }
  //             : cryptoboy
  //         ),
  //       })
  //       console.log(this.state.cryptoBoys);
  //     });this.setState({loading:false});
  //   }
  // };

  createUserFromApp = async (userName, email, social, repo, bio, avatar) => {
      console.log(userName, email, social, repo, bio, avatar, this.state.accountAddress)

      let avatarHash;



      const emailUsed = await UserDataService.getByEmail(email)
          .then(response => {
              //console.log(response);
              if (response.data[0]) {
                  return true;
              } else {
                  return false;
              }

          })
          .catch(e => {
              console.log(e);
              return false;
          });
      const nameUsed = await UserDataService.getByName(userName)
          .then(response => {
              if (response.data[0]) {
                  return true;
              } else {
                  return false;
              }



          })
          .catch(e => {
              console.log(e);
              return false;
          });
      console.log("NameUsed", nameUsed)
      console.log("EmailUsed", emailUsed)
      if (!emailUsed && !nameUsed) {
          if (avatar instanceof Blob) {
              const cid2 = await ipfs.add(avatar);
              console.log(cid2.path);
              avatarHash = `https://ipfs.infura.io/ipfs/${cid2.path}`;
          } else {
              avatarHash = avatar
          }
          const data = {

              userName: userName,
              userEmail: email,
              userSocial: social,
              userRepo: repo,
              userBio: bio,
              userAvatarHash: avatarHash,
              userAddress: this.state.accountAddress
          }

          console.log(data)
          await UserDataService.create(data)
              .then(async response => {
                  this.setState({
                      user: {
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
                  let useemail = response.data.userEmail;
                  const res = await fetch("http://localhost:8080/send", {
                          method: "POST",
                          headers: {
                              "Content-type": "application/json",
                          },
                          mode: "cors",
                          body: JSON.stringify({
                              useemail
                          }),
                      })
                      .then((res) => res.json())
                      .then(async (res) => {
                          const resData = await res;
                          console.log(resData);
                          if (resData.status === "success") {
                              alert("Message Sent");

                          } else if (resData.status === "fail") {
                              alert("Message failed to send");
                          }
                      })

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

                  }).then(async (result) => {
                      if (result.isConfirmed) {

                          window.location.href = `/account`

                      }

                  })

                  this.setState({
                      userLoggedIn: true
                  });
              })
              .catch(e => {
                  console.log(e);
              });

      } else {
          {
              this.setState({
                  nameIsUsed: nameUsed
              });
              this.setState({
                  emailIsUsed: emailUsed
              });

              this.setState({
                  loading: false
              });
          }
      }


  };

  updateUserFromApp = async (userName, email, social, repo, bio, avatar, account) => {
      console.log(userName, email, social, repo, bio, avatar, this.state.accountAddress)
      let avatarHash;



      //check is email changed or not 
      if (this.state.currentUser.userEmail == email) {
          if (avatar instanceof Blob) {
              console.log("email not changed and avatar is blob")
              const cid2 = await ipfs.add(avatar);
              console.log(cid2.path);

              avatarHash = `https://ipfs.infura.io/ipfs/${cid2.path}`;
          } else {
              console.log("email not changed and avatar is link")
              avatarHash = avatar;
          }
          const data = {

              userName: userName,
              userEmail: email,
              userSocial: social,
              userRepo: repo,
              userBio: bio,
              userAvatarHash: avatarHash,
              userAddress: this.state.accountAddress
          }

          //console.log(data)
          UserDataService.update(this.state.accountAddress, data)
              .then(response => {
                  this.setState({
                      user: {
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
                          window.location.href = `/account`

                      }

                  })

              })
              .catch(e => {
                  console.log(e);
              });
          this.setState({
              emailIsUsed: false
          })
      } else {

          const emailUsed = await UserDataService.getByEmail(email)
              .then(response => {
                  console.log(response);
                  if (response.data[0]) {
                      return true;
                  } else {
                      return false;
                  }



              })
              .catch(e => {
                  console.log(e);
                  return false;
              });

          if (!emailUsed) {
              if (avatar instanceof Blob) {
                  console.log("name is  used and avatar is blob")
                  const cid2 = await ipfs.add(avatar);
                  console.log(cid2.path);

                  avatarHash = `https://ipfs.infura.io/ipfs/${cid2.path}`;
              } else {
                  console.log("name is  used and avatar is link")
                  avatarHash = avatar;
              }
              const data = {
                  userName: userName,
                  userEmail: email,
                  userSocial: social,
                  userRepo: repo,
                  userBio: bio,
                  userAvatarHash: avatarHash,
                  userAddress: this.state.accountAddress
              }

              //console.log(data)
              UserDataService.update(this.state.accountAddress, data)
                  .then(response => {
                      this.setState({
                          user: {
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
                              window.location.href = `/account`

                          }

                      })

                  })
                  .catch(e => {
                      console.log(e);
                  });
          } else {
              {

                  this.setState({
                      emailIsUsed: true
                  });
                  this.setState({
                      loading: false
                  });
              }
          }
      }




  };



  //mint multiple 
  mintMultipleNFT = async (name, description, buffer, tokenPrice, finalbuffer, categories, sizeChart, amount, customToken) => {
      this.setState({
          loading: true
      });
      
      console.log('token', localStorage.getItem('token'))
      let tok =localStorage.getItem('token') 
      if (tok === 'invalid token') {
          console.log('invalid token')
          Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              title: `Unauthorized user`,
              confirmButtonText: 'Sign Up',
              icon: 'error',
              backdrop: false,
              customClass: {
                  container: 'my-swal'
              }

          }).then((result) => {
              if (result.isConfirmed) {
                  window.location.href = `/profile`

              }

          }).catch(e => {
              console.log(e);
          });
      } else {
          console.log('valid user')
          const web3 = window.web3;
          console.log("buffer2", finalbuffer)
          console.log("categories", categories)
          //console.log("sizechart",sizeChart)
          console.log("name", name)
          console.log("tokenPrice", tokenPrice)
          let isCustom = false;
          if (customToken == "VAR") {
              isCustom = true;
          }

          const nameIsUsed = await this.state.DigiFashionContract.methods
              .tokenNameExists(name)
              .call();
          console.log("nameisused", nameIsUsed)
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
          if (!nameIsUsed) {
              //console.log(this.state.cryptoBoysContract)
              let imageHashes = [];
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
              const file = await ipfs.add(buffer)
              // const imageHash=file[0]["hash"]
              console.log(file.path)
              for (let i = 0; i < finalbuffer.length; i++) {
                  const filesI = await ipfs.add(finalbuffer[i])
                  console.log(filesI.path)
                  imageHashes.push(`https://ipfs.infura.io/ipfs/${filesI.path}`);
              }

              //creating  a image hash to store on blockchain
              const imageHash = `https://ipfs.infura.io/ipfs/${file.path}`;
            let imageHash2=`/ipfs/${file.path}`;
              const imageIsUsed = await this.state.DigiFashionContract.methods.imageExists(imageHash).call();
              console.log("imageisused", imageIsUsed)
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
              if (!imageIsUsed) {
                  let price = tokenPrice;
                  // if(!isCustom){
                  price = window.web3.utils.toWei(tokenPrice.toString(), "Ether");
                  // }

                  //  const dressPrice = window.web3.utils.toWei(tokenDressPrice.toString(), "Ether");
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
                      tokenName: "Digi Art",
                      tokenSymbol: "DIG",
                      //tokenId: `${itokenId}`,
                      image: `${imageHash2}`,
                      name: name,
                      description: description,
                      mintedBy: this.state.accountAddress,
                      //price:window.web3.utils.toWei(tokenPrice.toString(), "ether"),
                      price: price,
                      // dressPrice:tokenDressPrice,
                      customToken: customToken,
                      quantity:amount,
                    //   payment_token:customToken,
                    //   total_price:price,
                      images: imageHashes,
                     categories: categories,
                    //   sizeChart: sizeChart,
                      noOfTransfers: 0

                  }
                  //storing the token object on ipfs
                  const cid = await ipfs.add(JSON.stringify(tokenObject))
                  console.log(cid.path)
                  //setting the token uri as the path of token object
                  // let tokenURI = `https://ipfs.infura.io/ipfs/${cid.path}`;
                  //let tokenURI = `https://ipfs.infura.io/ipfs/${tokenId}`;
                  let tokenURI = `https://ipfs.infura.io/ipfs/${cid.path}`;
                  // this.state.DigiFashionContract.methods
                  // .updateTokenMetadata(itokenId,tokenURI)
                  // .send({ from: this.state.accountAddress })
                  // .on("confirmation",()=>{

                  // })



                  console.log(amount, tokenURI, window.web3.utils.toWei(tokenPrice, "Ether"))
                  this.state.DigiFashionContract.methods
                      .mintMultipleTokens(amount, name, imageHash, tokenURI, price, isCustom)
                      .send({
                          from: this.state.accountAddress
                      })
                      .on("confirmation", () => {
                          localStorage.setItem(this.state.accountAddress, new Date().getTime());
                          this.setState({
                              loading: false
                          });
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
                                  window.location.href = "/marketplace";

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
              } else {
                  {
                      this.setState({
                          imageIsUsed: true
                      });
                      this.setState({
                          loading: false
                      });
                  }
              }
          } else {

              this.setState({
                  nameIsUsed: true
              });
              this.setState({
                  loading: false
              });

          }
      }

  };
  // Put or remove from sale on the marketplace
  toggleForSale = async (tokenId, tokprice, saleStatus) => {

      this.setState({
          loading: true
      });

      console.log('token', localStorage.getItem('token'))
      let tok = localStorage.getItem('token')
      if (tok === 'invalid token') {
          console.log('invalid token')
          Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              title: `Unauthorized user`,
              confirmButtonText: 'Sign Up',
              icon: 'error',
              backdrop: false,
              customClass: {
                  container: 'my-swal'
              }

          }).then((result) => {
              if (result.isConfirmed) {
                  window.location.href = `/profile`

              }

          }).catch(e => {
              console.log(e);
          });
      } else {
          // const web3 = window.web3;
          // let price = window.web3.utils.toWei(tokprice, "Ether");
          this.state.DigiFashionContract.methods
              .updateTokenData(tokenId, tokprice, saleStatus)
              .send({
                  from: this.state.accountAddress
              })
              .on("confirmation", () => {
                  this.setState({
                      loading: false
                  });
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
      }

      
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
  changeTokenPriceERC1155 = async (tokenId, newPrice, saleStatus) => {
      this.setState({
          loading: true
      });
      console.log('token', localStorage.getItem('token'))
      let tok = await localStorage.getItem('token')
      if (tok === 'invalid token') {
          console.log('invalid token')
          Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              title: `Unauthorized user`,
              confirmButtonText: 'Sign Up',
              icon: 'error',
              backdrop: false,
              customClass: {
                  container: 'my-swal'
              }

          }).then((result) => {
              if (result.isConfirmed) {
                  window.location.href = `/profile`

              }

          }).catch(e => {
              console.log(e);
          });
      } else {
          //const web3 = window.web3;
          const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
          // res = await axios.post('http://localhost:8080/changeTokenPrice',{ tokenId:tokenId,
          // newTokenPrice:newTokenPrice,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
          this.state.DigiFashionContract.methods
              .updateTokenData(tokenId, newTokenPrice, saleStatus)
              .send({
                  from: this.state.accountAddress
              })
              .on("confirmation", () => {
                  this.setState({
                      loading: false
                  });
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
      }



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
  // changeTokenDressPrice = async(tokenId, newPrice) => {
  //   this.setState({ loading: true });
  //   const web3 = window.web3;
  //   const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
  //   this.state.DigiFashionContract.methods
  //     .changeTokenDressPrice(tokenId, newTokenPrice,true)
  //     .send({ from: this.state.accountAddress })
  //     .on("confirmation", () => {
  //       this.setState({ loading: false });
  //       Swal.fire({
  //         allowOutsideClick: false,
  //         allowEscapeKey: false,
  //         title:  `Price Changed`,
  //         confirmButtonText: 'Okay',
  //         icon: 'success',
  //         backdrop: false,
  //         customClass: {
  //           container: 'my-swal'
  //         }

  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           window.location.reload();

  //         } 

  //       })

  //     });
  //   // res = await axios.post('http://localhost:8080/changeTokenDressPrice',{ tokenId:tokenId,
  //   //   newTokenPrice:newTokenPrice,account: this.state.accountAddress,fee:web3.eth.generate_gas_price()  })
  //   //here 
  //   // const changeDressPrice={tokenId:tokenId,
  //   //     newTokenPrice:newTokenPrice,account: this.state.accountAddress}
  //   //   NFTDataService.changeTokenDressPrice(changeDressPrice)
  //   //   .then(response=>
  //   //     {
  //   //       console.log(response)

  //   //     })
  //   //   //console.log(res)
  //   //   if(response){
  //   //     this.setState({ loading: false });
  //   //     Swal.fire({
  //   //       allowOutsideClick: false,
  //   //       allowEscapeKey: false,
  //   //       title: `Price Changed`,
  //   //       confirmButtonText: 'Okay',
  //   //       icon: 'success',
  //   //       backdrop: false,
  //   //       customClass: {
  //   //         container: 'my-swal'
  //   //       }

  //   //     }).then((result) => {
  //   //       if (result.isConfirmed) {
  //   //         window.location.reload();

  //   //       } 

  //   //     })
  //   //   }
  //     //till here
  // };  

  jsPdfGenerator = (tokenId, price, owner, designName, ownerName) => {
      var doc = new jsPDF('p', 'pt');
      let priceEth = window.web3.utils.fromWei(price, "Ether");

      doc.text("Digitart", 460, 30)
      doc.addImage(imgData, "PNG", 525, 5, 30, 30)


      doc
          .setFontSize(14);
      doc
          .setTextColor(
              46, 116, 181);
      doc.text("Design details", 250, 50)



      doc.autoTable({
          head: [
              ['Id', 'Name', 'Price']
          ],
          body: [
              [tokenId, designName, priceEth],


          ],
          startY: 65
      })

      doc
          .setFontSize(14);
      doc
          .setTextColor(
              46, 116, 181);
      doc.text("Buyer Details", 250, 135)
      doc.autoTable({
          head: [
              ['Buyer Name', 'Buyer Email']
          ],
          body: [
              [this.state.currentUser.userName, this.state.currentUser.userEmail],


          ],
          startY: 150
      })

      doc.setFontSize(14);
      doc.setTextColor(46, 116, 181);
      doc.text("Seller Details", 250, 220)
      doc.autoTable({
          head: [
              ['Seller Name', 'Seller Email']
          ],
          body: [
              [ownerName, owner],
          ],
          startY: 235
      })

      var docu = doc.output('datauristring')
      console.log(docu)
      //  doc.save(`${designName}.pdf`)
      return (docu)


  }

  //Buy a token  
  buyCryptoBoy = async (tokenId, price, dress, owner, designName, ownerName) => {
      //console.log(typeof(parseInt(price)));
      //price = window.web3.utils.toWei(price);
      console.log(owner)

      console.log('token', localStorage.getItem('token'))
      let tok = await localStorage.getItem('token')
      if (tok === 'invalid token') {
          console.log('invalid token')
          Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              title: `Unauthorized user`,
              confirmButtonText: 'Sign Up',
              icon: 'error',
              backdrop: false,
              customClass: {
                  container: 'my-swal'
              }

          }).then((result) => {
              if (result.isConfirmed) {
                  window.location.href = `/profile`

              }

          }).catch(e => {
              console.log(e);
          });
      } else {
          const web3 = window.web3;
          this.setState({
              loading: true
          });

          //await this.state.tokenContract.methods.approve(this.state.networkData.address, price).send({ from: this.state.accountAddress}).on('transactionHash', (hash) => {
          //  console.log('approved')
          // this.state.token.methods.transfer(this.state.accountAddress,price).send({ from: this.state.accountAddress }).on('transactionHash', (hash) => {
          //console.log("here ")
          await this.state.DigiFashionContract.methods
              .buySingleToken(tokenId)
              .send({
                  from: this.state.accountAddress
              })
              .on("transactionHash", (hash) => {
                  console.log("done")
                  this.setState({
                      loading: false
                  });
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

                  }).then(async (result) => {
                      if (result.isConfirmed) {
                          console.log('hereeeeee')
                          let pdf;
                          pdf = await this.jsPdfGenerator(tokenId, price, owner, designName, ownerName)
                          let curUser = this.state.currentUser.userEmail
                          const res = await fetch("http://localhost:8080/sendEmail", {
                                  method: "POST",
                                  headers: {
                                      "Content-type": "application/json",
                                  },
                                  mode: "cors",
                                  body: JSON.stringify({
                                      owner,
                                      curUser,
                                      pdf
                                  }),
                              })
                              .then((res) => res.json())
                              .then(async (res) => {
                                  const resData = await res;
                                  console.log(resData);
                                  if (resData.status === "success") {
                                      alert("Message Sent");

                                  } else if (resData.status === "fail") {
                                      alert("Message failed to send");
                                  }
                              })
                          window.location.reload();

                      }
                  })
              })
      }



      //)
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


  // bUy erc 1155
  // //Buy a token  
  // buyCryptoBoyERC1155 = async(tokenId, price) => {
  //   //console.log(typeof(parseInt(price)));
  //   //price = window.web3.utils.toWei(price);
  // console.log('token',localStorage.getItem('token'))
  //     let tok=await localStorage.getItem('token')
  //     if(tok==='invalid token'){
  //       console.log('invalid token')
  //       Swal.fire({
  //         allowOutsideClick: false,
  //         allowEscapeKey: false,
  //         title: `Unauthorized user`,
  //         confirmButtonText: 'Sign Up',
  //         icon: 'error',
  //         backdrop: false,
  //         customClass: {
  //           container: 'my-swal'
  //         }

  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           window.location.href=`/profile`

  //         } 

  //       }) .catch(e => {
  //         console.log(e);
  //       });
  //     }
  //     else{
  //       console.log(price);
  //   const web3 = window.web3;
  //   this.setState({ loading: true });
  //   //await this.state.tokenContract.methods.approve(this.state.networkData.address, price).send({ from: this.state.accountAddress}).on('transactionHash', (hash) => {
  //    // console.log('approved')
  //    // this.state.token.methods.transfer(this.state.accountAddress,price).send({ from: this.state.accountAddress }).on('transactionHash', (hash) => {
  //     //console.log("here ")
  //     this.state.DigiFashionContract.methods
  //     .buySingleToken(tokenId)
  //     .send({ from:this.state.accountAddress ,value:price})
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
  //     }  




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

  //};
  //Buy a token with dress
  // buyCryptoBoyWithDress = async(tokenId, price) => {
  //   console.log(price)
  //   const web3 = window.web3;
  //   this.setState({ loading: true });
  //   this.setState({ loading: true });
  //     await this.state.tokenContract.methods.approve(this.state.networkData.address, price).send({ from: this.state.accountAddress}).on('transactionHash', (hash) => {
  //       console.log('approved')
  //      // this.state.token.methods.transfer(this.state.accountAddress,price).send({ from: this.state.accountAddress }).on('transactionHash', (hash) => {
  //       //console.log("here ")
  //       this.state.DigiFashionContract.methods
  //       .buyToken(tokenId,price,this.state.networkData.address)
  //       .send({ from:this.state.accountAddress })
  //       .on("transactionHash",(hash)=>{
  //        console.log("done")
  //        this.setState({ loading: false });
  //        Swal.fire({
  //          allowOutsideClick: false,
  //          allowEscapeKey: false,
  //          title: `Item Bought`,
  //          confirmButtonText: 'Okay',
  //          icon: 'success',
  //          backdrop: false,
  //          customClass: {
  //            container: 'my-swal'
  //          }

  //        }).then((result) => {
  //          if (result.isConfirmed) {
  //            window.location.reload();

  //          }
  //       })
  //     })
  //   });
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
  //};  
  // tokenIdAndPrice = (tokenIdOfDress, tokenName, priceOfDress, ownedEmail, ownedName, sizeDetails) => {
  //     console.log("tokenId", tokenIdOfDress)
  //     console.log("tokenName", tokenName)
  //     console.log("Price of dress", priceOfDress)
  //     console.log("Send Email To", ownedEmail)
  //     console.log("Send Name", ownedName)
  //     this.setState({
  //         dressTokenId: tokenIdOfDress
  //     });
  //     this.setState({
  //         designName: tokenName
  //     });
  //     this.setState({
  //         dressPrice: priceOfDress
  //     });
  //     this.setState({
  //         sendEmailTo: ownedEmail
  //     });
  //     this.setState({
  //         sendName: ownedName
  //     });
  //     this.setState({
  //         inputFields: sizeDetails
  //     })
  //     // window.location.href=`/sizeDetails/${tokenIdOfDress}/${priceOfDress}`

  // }
  searchTermfromApp = async (search) => {

      UserDataService.getByName(search)
          .then(response => {
              console.log(response);
              this.setState({
                  clickedAddress: response.data[0].userAddress
              })
              //  setSubmitted(true);
              // console.log(response.data);
              window.location.href = `/their-tokens/${this.state.clickedAddress}`

          })
          .catch(e => {
              console.log(e);
              this.setState({
                  userExists: false
              });
              console.log("username doesnt exist")
          });

  }

  searchNFTFromApp = async (val, id) => {
      //  result=await this.state.cryptoBoysContract.methods.
      //  nameToId(val).call();
      console.log(id)
      let result = await this.state.cryptoBoys.find((cryptoboy) => cryptoboy[0].tokenId === id);
      console.log("result", result);
      if (result) {
          this.setState({
              clickedAddress: result[0].tokenId.toNumber()
          })

          window.location.href = `/nftDetails/${result[0].tokenId.toNumber()}`
      }
  }
  
  render() {
    
    //console.log(this.state.cryptoBoysContract)
    console.log(this.state.cryptoBoys)
    return (
    
      <div className="fashion" 
      style={{//backgroundColor:"#f1f1ef"
        // backgroundColor: "#b8c6db",
        // backgroundImage: "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
        // backgroundColor: '#e7eff9',
        // backgroundImage:'linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)'
        // backgroundColor: '#bdcad9',
        // backgroundImage: 'linear-gradient(315deg, #bdcad9 0%, #e1dada 74%)'
        // backgroundImage:`url('https://image.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg')`,
        // backgroundRepeat:'no-repeat',
        // backgroundSize:'cover',
        // backgroundColor: '#aee1f9',
        // backgroundImage: 'linear-gradient(315deg, #aee1f9 0%, #f6ebe6 74%)'
        //backgroundColor: '#d9e4f5',
        //backgroundImage: 'linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%)'
        // backgroundColor: '#e3efe8',
        // backgroundImage: 'linear-gradient(315deg, #e3efe8 0%, #96a7cf 74%)'
      
        
      }}
      >
      
      {/* {!this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : 
        !this.state.contractDetected ? (
        <ContractNotDeployed />
      ) :
      this.state.loading ? (
        <Loading />
      ) :( */}
      <> <Container maxWidth="false" style={{padding:"0%",minHeight:"100vh"}}> 
    <Router>

    <Navbar 
     connectToMetamask={this.connectToMetamask}
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
            <Home/>
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
                cryptoBoys={this.state.cryptoBoys}
                totalTokensMinted={this.state.cryptoBoysCount}
                callbackFromParent={this.myCallback2}  
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
                cryptoBoys={this.state.cryptoBoys}
               />
              )}/>
            <Route
              path="/mint"
             
              render={() => (
                <FormAndPreview
                  // mintMyNFT={this.mintMyNFT}
                  nameIsUsed={this.state.nameIsUsed}
                  imageIsUsed={this.state.imageIsUsed}
                  mintMultipleNFT={this.mintMultipleNFT}
                  // setMintBtnTimer={this.setMintBtnTimer}
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
              path={`/their-tokens/${this.state.clickedAddress}`}
              
              render={() => (
                <TheirCryptoBoys
                  accountAddress={this.state.clickedAddress}
                  cryptoBoys={this.state.cryptoBoys}
                  callbackFromParent1={this.myCallback2}
                  userExists={this.state.userExists}
                />
                
              )}
            />
            
             <Route
                path={`/nftDetails/${this.state.clickedAddress}`}
              render={() => (
              <CryptoBoyNFTDetails
               accountAddress={this.state.accountAddress}
               totalTokensMinted={this.state.cryptoBoysCount}
               changeTokenPrice={this.changeTokenPriceERC1155}
               toggleForSale={this.toggleForSale}
               buyCryptoBoy={this.buyCryptoBoy}
               clickedAddress={this.state.clickedAddress}
               callbackFromParent={this.myCallback2}
               callBack={this.tokenIDfun} 
               cryptoBoys={this.state.cryptoBoys}
               loading={this.state.loading}
               tokenExists={this.state.tokenExists}
              //  tokenIdAndPrice={this.tokenIdAndPrice}
               />
              )}
             />
            
             {/* <Route
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
                  buyCryptoBoyWithDress={this.buyCryptoBoy}
                />
              )}
            /> */}
          
        
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
