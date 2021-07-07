import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Loading from "../Loading/Loading";


const NFTHighlights=(props)=> {
  console.log(props)
    
      const [mintedByName,setMintedByName]=useState(" ") 
      const [ownedByName,setOwnedByName]=useState(" ") 
   
     
      const getCurrentUser=async()=>{
       if(props.usersContract){
         console.log(props)
          const current1=await props.usersContract.methods
          .allUsers(props.cryptoboy.mintedBy)
          .call();
          setMintedByName(current1[1]);
          const current2=await props.usersContract.methods
          .allUsers(props.cryptoboy.currentOwner)
          .call();
          setOwnedByName(current2[1]);
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
      <p>
        <span className="font-weight-bold">Created By</span> :{" "}
        <Link to="/their-tokens" onClick={()=>{handleClick(props.cryptoboy.mintedBy)}}>
           {/* {props.cryptoboy.mintedBy.substr(0, 5) +
          "..." +
          props.cryptoboy.mintedBy.slice(
            props.cryptoboy.mintedBy.length - 5
          )} */}
          {mintedByName}
          </Link>
      </p>
      <p>
        <span className="font-weight-bold">Owned By</span> :{" "}
        <Link to="/their-tokens" onClick={()=>{handleClick(props.cryptoboy.currentOwner)}}> 
        {/* {props.cryptoboy.currentOwner.substr(0, 5) +
          "..." +
          props.cryptoboy.currentOwner.slice(
            props.cryptoboy.currentOwner.length - 5
          )} */}
          {ownedByName}
          </Link>
      </p>
   
     
      <p>
        <span className="font-weight-bold">Price</span> :{" "}
        {window.web3.utils.fromWei(
          props.cryptoboy.price.toString(),
          "Ether"
        )}{" "}
        Ξ
      </p>
     
     
   <Link to="/nftDetails" style={{textDecoration:"none"}}onClick={()=>handleClick(props.cryptoboy.tokenId.toNumber())} ><Button variant="contained" >View NFT</Button></Link> 
     
    
    </div>):(<Loading/>)}
     </>
    );
 
}

export default NFTHighlights;
