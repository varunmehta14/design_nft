import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Paper} from '@material-ui/core';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';



const MyCryptoBoyNFTDetails = ({callback1,cryptoboy,accountAddress}) => {
  
  const handleClick=(tokID)=>{
    console.log(tokID)
     callback1(tokID)
     
    }
  
  const {
    tokenId,
    tokenName,
    price,
    imageHash,
    mintedBy,
    previousOwner,
    numberOfTransfers,
  } = cryptoboy;



  return (
  
    <div key={tokenId.toNumber()} className="mt-4 ml-3">
      <p>
        <span className="font-weight-bold">Token Id</span> :{" "}
        {tokenId.toNumber()}
      </p>
      <p>
        <span className="font-weight-bold">Name</span> : {tokenName}
      </p>
      <p>
        <span className="font-weight-bold">Price</span> :{" "}
        {window.web3.utils.fromWei(price.toString(), "Ether")} Ξ
      </p>
      <p>
        <span className="font-weight-bold">No. of Transfers</span> :{" "}
        {numberOfTransfers.toNumber()}
      </p>
      {/* {props.accountAddress === mintedBy &&
      props.accountAddress !== previousOwner ? (
        <div className="alert alert-success w-50 text-center m-auto">
          Minted
        </div>
      ) : (
        <div className="alert alert-info w-50 text-center m-auto">Bought</div>
      )} */}
      <Link to="/nftDetails" style={{textDecoration:"none"}}onClick={()=>{handleClick(tokenId.toNumber())}} ><Button variant="contained" >View NFT</Button></Link> 
    </div>
  
  );
};

export default MyCryptoBoyNFTDetails;
