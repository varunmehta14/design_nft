import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Paper,Grid,Button,Select,Divider} from '@material-ui/core';
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage"; 
import Queries from "../Queries/Queries";
import Loading from "../Loading/Loading";



class CryptoBoyNFTDetails extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      newCryptoBoyPrice: "",
      isHidden:true,
     




    };
  }
  
  
  
  
  callChangeTokenPriceFromApp = (tokenId, newPrice) => {
    this.props.changeTokenPrice(tokenId, newPrice);
  };
  handleClick=(address)=>{
    this.props.callbackFromParent(address)
  }
  sendTokenID=(tokId)=>{
    this.props.callBack(tokId)
  }
  render() {
    //console.log(this.props.cryptoboy.imageHash)
   
    return (
      <>{this.props.cryptoboy?
        (<div className="d-flex flex-wrap mb-2" style={{padding:"1%"}}>
        <div
                key={this.props.cryptoboy.tokenId.toNumber()}
                className="w-50 p-4 mt-1 border "
                
              >
                <div className="col-md-6" style={{margin:"auto"}}>
               
                <img style={{width:"inherit"}} src={this.props.cryptoboy.imageHash}/>
                  </div>
          </div>
         <div className="col-md-6 w-50  mt-1 border">
          
          <p>
           <b style={{fontSize:"-webkit-xxx-large"}}>
            {this.props.cryptoboy.tokenName}
            </b>
          </p>
          <hr/>
          <div className="d-flex flex-wrap " style={{justifyContent:"space-evenly"}}>
          <div style={{display:"flex"}}>
          
            <span className="font-weight-bold">Creator</span> :{" "}
            <Link to="/their-tokens" onClick={()=>{this.handleClick(this.props.cryptoboy.mintedBy)}}><b>{this.props.cryptoboy.mintedBy.substr(0, 5) +
              "..." +
              this.props.cryptoboy.mintedBy.slice(
                this.props.cryptoboy.mintedBy.length - 5
              )}</b> </Link>
          
          </div>
          <Divider orientation="vertical" flexItem />
          <div style={{display:"flex",paddingLeft:"5px"}}>
          
            <span className="font-weight-bold">Owner</span> :{" "}
            <Link to="/their-tokens" onClick={()=>{this.handleClick(this.props.cryptoboy.currentOwner)}}><b>{this.props.cryptoboy.currentOwner.substr(0, 5) +
              "..." +
              this.props.cryptoboy.currentOwner.slice(
                this.props.cryptoboy.currentOwner.length - 5
              )}</b> </Link>
          
          </div>
          </div>
          <hr/>
          
          <p>
            <span className="font-weight-bold">Price</span> :{" "}
            <b style={{fontSize:"xx-large"}}>
            {window.web3.utils.fromWei(
              this.props.cryptoboy.price.toString(),
              "Ether"
            )}{" "}
            Ξ
            </b>
          </p>
          <hr/>
          
        
          <div>
            {this.props.accountAddress === this.props.cryptoboy.currentOwner ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.callChangeTokenPriceFromApp(
                    this.props.cryptoboy.tokenId.toNumber(),
                    this.state.newCryptoBoyPrice
                  );
                }}
              >
                <div className="form-group mt-4 ">
                  <label htmlFor="newCryptoBoyPrice">
                    <span className="font-weight-bold">Change Token Price</span> :
                  </label>{" "}
                  <input
                    required
                    type="number"
                    name="newCryptoBoyPrice"
                    id="newCryptoBoyPrice"
                    value={this.state.newCryptoBoyPrice}
                    className="form-control w-50"
                    placeholder="Enter new price"
                    onChange={(e) =>
                      this.setState({
                        newCryptoBoyPrice: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="submit"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  className="btn btn-outline-info mt-0 w-50"
                >
                  change price
                </button>
              </form>
            ) : null}
          </div>
          <div>
            {this.props.accountAddress === this.props.cryptoboy.currentOwner ? (
              this.props.cryptoboy.forSale ? (
                <button
                  className="btn btn-outline-danger mt-4 w-50"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  onClick={() =>
                    this.props.toggleForSale(
                      this.props.cryptoboy.tokenId.toNumber()
                    )
                  }
                >
                  Remove from sale
                </button>
              ) : (
                <button
                  className="btn btn-outline-success mt-4 w-50"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  onClick={() =>
                    this.props.toggleForSale(
                      this.props.cryptoboy.tokenId.toNumber()
                    )
                  }
                >
                  Keep for sale
                </button>
              )
            ) : null}
            </div>
          
          <div>
            {this.props.accountAddress !== this.props.cryptoboy.currentOwner ? (
              this.props.cryptoboy.forSale ? (
                <button
                  className="btn btn-outline-primary mt-3 w-50"
                  value={this.props.cryptoboy.price}
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  onClick={(e) =>
                    this.props.buyCryptoBoy(
                      this.props.cryptoboy.tokenId.toNumber(),
                      e.target.value
                    )
                  }
                >
                  Buy For{" "}
                  {window.web3.utils.fromWei(
                    this.props.cryptoboy.price.toString(),
                    "Ether"
                  )}{" "}
                  Ξ
                </button>
              ) : (
                <>
                  <button
                    disabled
                    style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                    className="btn btn-outline-primary mt-3 w-50"
                  >
                    Buy For{" "}
                    {window.web3.utils.fromWei(
                      this.props.cryptoboy.price.toString(),
                      "Ether"
                    )}{" "}
                    Ξ
                  </button>
                  <p className="mt-2">Currently not for sale!</p>
                </>
              )
            ) : null}
          </div>
         
          </div>
         
          <div className="col-md-6 w-50  mt-1 border">
          
         
          <div className="card mt-1">
        <div className="card-body   justify-content-center">
        <h5>Description</h5>
        <hr/>
        <p>{this.props.cryptoboy.metaData.description}</p>
        </div>
      </div>
            
           
      <div className="card mt-1">
        <div className="card-body   justify-content-center">
        <h5>Sales History</h5>
        <hr/>
            <p>
            <span className="font-weight-bold">Previous Owner</span> :{" "}
            <Link to="/their-tokens" onClick={()=>{this.handleClick(this.props.cryptoboy.previousOwner)}}>{this.props.cryptoboy.previousOwner.substr(0, 5) +
              "..." +
              this.props.cryptoboy.previousOwner.slice(
                this.props.cryptoboy.previousOwner.length - 5
              )}</Link>
          </p>
          <p>
            <span className="font-weight-bold">No. of Transfers</span> :{" "}
            {this.props.cryptoboy.numberOfTransfers.toNumber()}
          </p>
        </div>
      </div>   
          
           
         
        

         
          </div>
          <Grid item xs={12} sm={6}> 
          
          <div className="col-md-12   mt-1 border">
         <Queries cryptoBoysContract={this.props.cryptoBoysContract} token={this.props.cryptoboy.tokenId.toNumber()} imageUrl={this.props.cryptoboy.imageHash} />
         </div>
         </Grid>
        </div>):(<><Loading/>
        <h1 style={{textAlign:"center"}}>Select a nft</h1></>)
      }
     </>
    );
  }
}

export default CryptoBoyNFTDetails;
