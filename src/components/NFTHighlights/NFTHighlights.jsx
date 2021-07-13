import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Loading from "../Loading/Loading";
import Avatar from '@material-ui/core/Avatar';


const NFTHighlights=(props)=> {
  console.log(props)
    
      const [mintedByName,setMintedByName]=useState(props.cryptoboy.mintedBy) 
      const [mintedAvatar,setMintedAvatar]=useState(null) 
      const [ownedByName,setOwnedByName]=useState(props.cryptoboy.currentOwner) 
      const [ownedAvatar,setOwnedAvatar]=useState(null) 
   
     
      const getCurrentUser=async()=>{
       if(props.usersContract){
         console.log(props)
          const current1=await props.usersContract.methods
          .allUsers(props.cryptoboy.mintedBy)
          .call();
          setMintedByName(current1[1]);
          setMintedAvatar(current1[6])
          const current2=await props.usersContract.methods
          .allUsers(props.cryptoboy.currentOwner)
          .call();
          setOwnedByName(current2[1]);
          setOwnedAvatar(current2[6]);
        }
        
       
        
      }
      useEffect(()=>{
        getCurrentUser();
      },[props.cryptoboy]);
console.log(mintedByName,ownedByName)

//   callChangeTokenPriceFromApp = (tokenId, newPrice) => {
//     props.changeTokenPrice(tokenId, newPrice);
//   };
  const handleClick=(address)=>{
    props.callbackFromParent(address)
    console.log(address)
  }

  
    //console.log(props.cryptoboy.imageHash)
    //console.log(props.toggleForSale)
    return (
      <>
      {props.cryptoboy?( <div key={props.cryptoboy.tokenId.toNumber()} className="mt-4">
       
      
      <p>
       
        <h4>{props.cryptoboy.tokenName}</h4>
      </p>
      <hr/>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <span className="font-weight-bold">Created By :&nbsp;</span>
        <Link to="/their-tokens" onClick={()=>{handleClick(props.cryptoboy.mintedBy)}}>
           {/* {props.cryptoboy.mintedBy.substr(0, 5) +
          "..." +
          props.cryptoboy.mintedBy.slice(
            props.cryptoboy.mintedBy.length - 5
          )} */}
          {!(mintedByName=="")?(<div style={{display:"flex",alignItems:"center",fontWeight:"bolder"}}> <Avatar alt={mintedByName} src={mintedAvatar}/>&nbsp;@{mintedByName}</div>):(props.cryptoboy.mintedBy.substr(0, 5) +
              "..." +
              props.cryptoboy.mintedBy.slice(
                props.cryptoboy.mintedBy.length - 5))}
          </Link>
      </div>
      <hr/>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <span className="font-weight-bold">Owned By :&nbsp;</span>
        <Link to="/their-tokens" onClick={()=>{handleClick(props.cryptoboy.currentOwner)}}> 
        {/* {props.cryptoboy.currentOwner.substr(0, 5) +
          "..." +
          props.cryptoboy.currentOwner.slice(
            props.cryptoboy.currentOwner.length - 5
          )} */}
          {!(ownedByName=="")?(<div style={{display:"flex",alignItems:"center",fontWeight:"bolder"}}> <Avatar alt={ownedByName} src={ownedAvatar}/>&nbsp;@{ownedByName}</div>):(props.cryptoboy.currentOwner.substr(0, 5) +
              "..." +
              props.cryptoboy.currentOwner.slice(
                props.cryptoboy.currentOwner.length - 5
              ))}
          </Link>
      </div>
  
     <hr/>
      <p>
        <span className="font-weight-bold">Price</span> :{" "}
        {window.web3.utils.fromWei(
          props.cryptoboy.price.toString(),
          "Ether"
        )}{" "}
        Ξ
      </p>
     
     <hr/>
   <Link to="/nftDetails" style={{textDecoration:"none"}}onClick={()=>handleClick(props.cryptoboy.tokenId.toNumber())} ><Button variant="contained" >View NFT</Button></Link> 
     
    
    </div>):(<Loading/>)}
     </>
    );
 
}

export default NFTHighlights;
