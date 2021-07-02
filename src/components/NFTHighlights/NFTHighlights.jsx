import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


class NFTHighlights extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   newCryptoBoyPrice: "",
    // };
  }

//   callChangeTokenPriceFromApp = (tokenId, newPrice) => {
//     this.props.changeTokenPrice(tokenId, newPrice);
//   };
  handleClick=(address)=>{
    this.props.callbackFromParent(address)
    console.log(address)
  }

  render() {
    //console.log(this.props.cryptoboy.imageHash)
    //console.log(this.props.toggleForSale)
    return (
      <div key={this.props.cryptoboy.tokenId.toNumber()} className="mt-4">
       
      
        <p>
         
          <h4>{this.props.cryptoboy.tokenName}</h4>
        </p>
        <p>
          <span className="font-weight-bold">Created By</span> :{" "}
          <Link to="/their-tokens" onClick={()=>{this.handleClick(this.props.cryptoboy.mintedBy)}}> {this.props.cryptoboy.mintedBy.substr(0, 5) +
            "..." +
            this.props.cryptoboy.mintedBy.slice(
              this.props.cryptoboy.mintedBy.length - 5
            )}</Link>
        </p>
        <p>
          <span className="font-weight-bold">Owned By</span> :{" "}
          <Link to="/their-tokens" onClick={()=>{this.handleClick(this.props.cryptoboy.currentOwner)}}> {this.props.cryptoboy.currentOwner.substr(0, 5) +
            "..." +
            this.props.cryptoboy.currentOwner.slice(
              this.props.cryptoboy.currentOwner.length - 5
            )}</Link>
        </p>
     
       
        <p>
          <span className="font-weight-bold">Price</span> :{" "}
          {window.web3.utils.fromWei(
            this.props.cryptoboy.price.toString(),
            "Ether"
          )}{" "}
          Ξ
        </p>
       
       
     <Link to="/nftDetails" style={{textDecoration:"none"}}onClick={()=>this.handleClick(this.props.cryptoboy.tokenId.toNumber())} ><Button variant="contained" >View NFT</Button></Link> 
       
      
      </div>
    );
  }
}

export default NFTHighlights;
