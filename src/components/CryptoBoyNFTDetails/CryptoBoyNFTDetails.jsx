import React, { useState,useEffect,useCallback } from "react";
import { Link } from "react-router-dom";

import {Paper,Grid,Button,Select,Divider} from '@material-ui/core';
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage"; 
import Queries from "../Queries/Queries";
import Loading from "../Loading/Loading";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
alignItems: "center",
justifyContent: "center",
backgroundSize: "cover"
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  img: {
    height: '100%',
    maxHeight:400,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}));

const CryptoBoyNFTDetails=(props)=> {

  const classes=useStyles();
  const theme=useTheme();
  console.log(props.cryptoBoysContract)
  console.log(props.cryptoboy)
  const [ newCryptoBoyPrice,setNewCryptoBoyPrice]=useState("");
  const [ isHidden,setIsHidden]=useState(true);
  const [mintedByName,setMintedByName]=useState("") 
  const [ownedByName,setOwnedByName]=useState("") 
  const [prevByName,setPrevByName]=useState("") 
  const [mintedAvatar,setMintedAvatar]=useState(null) 
  const [ownedAvatar,setOwnedAvatar]=useState(null) 
  const [prevAvatar,setPrevAvatar]=useState(null) 
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = props.cryptoboy.metaData.images.length;

  const getCurrentUser=(async()=>{
    if(props.usersContract){
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
    const current3=await props.usersContract.methods
    .allUsers(props.cryptoboy.previousOwner)
    .call();
    setPrevByName(current3[1]);
     setPrevAvatar(current3[6]);
    }
  }) 
 
  useEffect(()=>{
    getCurrentUser();
  },[props.cryptoboy]);
  
console.log(mintedByName,ownedByName,prevByName)         
  
  const callChangeTokenPriceFromApp = (tokenId, newPrice) => {
    props.changeTokenPrice(tokenId, newPrice);
  };
  const handleClick=(address)=>{
    props.callbackFromParent(address)
  }
  const sendTokenID=(tokId)=>{
    props.callBack(tokId)
  }

 
  const properties = {
    duration: 3000,
    autoplay: false,
    indicators: true,
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
    //console.log(props.cryptoboy.imageHash)
   
    return (
      <>{props.cryptoboy?
       
        (<div className="d-flex flex-wrap mb-2" style={{padding:"1%"}}>
        <div
                key={props.cryptoboy.tokenId.toNumber()}
                className="w-50 p-4 mt-1 border "
                
              >
                <div className="col-md-6" style={{margin:"auto"}}>
               
                <img style={{width:"inherit"}} src={props.cryptoboy.imageHash}/>
               
                  </div>
          </div>
         <div className="col-md-6 w-50  mt-1 border">
          
          <p>
           <b style={{fontSize:"-webkit-xxx-large",color:"black",fontWeight:"bold"}}>
            {props.cryptoboy.tokenName}
            </b>
          </p>
          <div className="d-flex flex-wrap " style={{justifyContent:"space-evenly"}}>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <span className="font-weight-bold">Created By :&nbsp;</span>
        <Link to="/their-tokens" onClick={()=>{handleClick(props.cryptoboy.mintedBy)}}>
           {/* {props.cryptoboy.mintedBy.substr(0, 5) +
          "..." +
          props.cryptoboy.mintedBy.slice(
            props.cryptoboy.mintedBy.length - 5
          )} */}
          {!(mintedByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={mintedByName} src={mintedAvatar}/>&nbsp;<b style={{color:"black",fontWeight:"bold"}}>@{mintedByName}</b></div>):(props.cryptoboy.mintedBy.substr(0, 5) +
              "..." +
              props.cryptoboy.mintedBy.slice(
                props.cryptoboy.mintedBy.length - 5))}
          </Link>
      </div>
          <Divider orientation="vertical" flexItem style={{width:"0.4%",backgroundColor:"black"}}/>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <span className="font-weight-bold">Owned By :&nbsp;</span>
        <Link to="/their-tokens" onClick={()=>{handleClick(props.cryptoboy.currentOwner)}}> 
        {/* {props.cryptoboy.currentOwner.substr(0, 5) +
          "..." +
          props.cryptoboy.currentOwner.slice(
            props.cryptoboy.currentOwner.length - 5
          )} */}
          {!(ownedByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={ownedByName} src={ownedAvatar}/>&nbsp;<b style={{color:"black",fontWeight:"bold"}}>@{ownedByName}</b></div>):(props.cryptoboy.currentOwner.substr(0, 5) +
              "..." +
              props.cryptoboy.currentOwner.slice(
                props.cryptoboy.currentOwner.length - 5
              ))}
          </Link>
      </div>
          </div>
          <hr style={{borderWidth:"medium",borderColor:"revert"}}/>
          
          <p>
            <span className="font-weight-bold">Price</span> :{" "}
            <b style={{fontSize:"xx-large",color:"black"}}>
            {window.web3.utils.fromWei(
              props.cryptoboy.price.toString(),
              "Ether"
            )}{" "}
            Ξ
            </b>
          </p>
          <hr/>
          
        
          <div>
            {props.accountAddress === props.cryptoboy.currentOwner ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  callChangeTokenPriceFromApp(
                    props.cryptoboy.tokenId.toNumber(),
                    newCryptoBoyPrice
                  );
                  
                }}
               
              >
                <div className="form-group mt-4 " >
                  <label htmlFor="newCryptoBoyPrice">
                    <span className="font-weight-bold">Change Token Price</span> :
                  </label>{" "}
                  <input
                    required
                    type="number"
                    name="newCryptoBoyPrice"
                    id="newCryptoBoyPrice"
                    value={newCryptoBoyPrice}
                    className="form-control w-50"
                    placeholder="Enter new price"
                    onChange={(e) =>
                      setNewCryptoBoyPrice(e.target.value)
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
            {props.accountAddress === props.cryptoboy.currentOwner ? (
              props.cryptoboy.forSale ? (
                <button
                  className="btn btn-outline-danger mt-4 w-50"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  onClick={() =>
                    props.toggleForSale(
                      props.cryptoboy.tokenId.toNumber()
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
                    props.toggleForSale(
                      props.cryptoboy.tokenId.toNumber()
                    )
                  }
                >
                  Keep for sale
                </button>
              )
            ) : null}
            </div>
          
          <div style={{display:"flex",justifyContent:"center"}}>
            {props.accountAddress !== props.cryptoboy.currentOwner ? (
              props.cryptoboy.forSale ? (
                <button
                  className="btn btn-outline-primary mt-3 w-50"
                  value={props.cryptoboy.price}
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  onClick={(e) =>
                    props.buyCryptoBoy(
                      props.cryptoboy.tokenId.toNumber(),
                      e.target.value
                    )
                  }
                >
                  Buy For{" "}
                  {window.web3.utils.fromWei(
                    props.cryptoboy.price.toString(),
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
                      props.cryptoboy.price.toString(),
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
          
         
          {/* <div className="card mt-1">
        <div className="card-body   justify-content-center"> */}
        <h5>Description</h5>
        
        <p>{props.cryptoboy.metaData.description}</p>
        {/* </div>
      </div> */}
             <hr/>
            <h5>Sales History</h5>  
      <div className="card mt-1" style={{backgroundColor:"ghostwhite",borderRadius:"15px"}}>
        <div className="card-body   justify-content-center">
        
       
        <div style={{display:"flex",alignItems:"center"}}>
        <span className="font-weight-bold">Previous Owner :&nbsp;</span>
        <Link to="/their-tokens" onClick={()=>{handleClick(props.cryptoboy.previousOwner)}}> 
        {/* {props.cryptoboy.currentOwner.substr(0, 5) +
          "..." +
          props.cryptoboy.currentOwner.slice(
            props.cryptoboy.currentOwner.length - 5
          )} */}
          {!(prevByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={prevByName} src={prevAvatar}/>&nbsp;{prevByName}</div>):(props.cryptoboy.previousOwner.substr(0, 5) +
              "..." +
              props.cryptoboy.previousOwner.slice(
                props.cryptoboy.previousOwner.length - 5
              ))}
          </Link>
      </div>
      <hr/>
          <p>
            <span className="font-weight-bold">No. of Transfers</span> :{" "}
            {props.cryptoboy.numberOfTransfers.toNumber()}
          </p>
        </div>
        <br/>
        
      </div>   
      {/* <div className="card mt-1">
        {props.cryptoboy.metaData.images.map
                ((image)=>{return (
                              <div className="card-body "style={{display:"contents"}} ><img src={image}/></div>
                              );
                          }
                )
        } 
      </div>   */}
      
      {/* <div className={useStyles.root} >
      <GridList className={useStyles.gridList} cols={3}>
        {props.cryptoboy.metaData.images.map((image) => (
          <GridListTile key={image} style={{width:"40%",height:"40%"}}>
            <img src={image} style={{width:"inherit",height:"inherit"}}/>
            
          </GridListTile>
        ))}
      </GridList>
    </div> */}
    
    {/* <Carousel showArrows={true} dynamicHeight={true}>
    {props.cryptoboy.metaData.images.map((image) => (
         
            <img src={image}/>
         
        
            
          
        ))}
    </Carousel> */}
    <br/>
    <div>
    <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.cryptoboy.metaData.images.map((image,index) => (
          <div style={{display:"flex",justifyContent:"center"}}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={image}  />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        style={{backgroundColor:"#173e43",color:"aliceblue"}}
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep === maxSteps - 1}>
           
            {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
           
          </Button>
        }
      />
      </div>
    {/* <div>
    <Slide slidesToShow={2}slidesToScroll={2}{...properties}>
    {props.cryptoboy.metaData.images.map((image) => (
        
        <div className={useStyles.root} style={{padding:"2%"}}>
          <a href={image} target="_blank">
        <img src={image} style={{height: "100%", width: "100%", objectFit:"contain"}}/>
        </a>
         
        </div>
        
    
        
            
          
        ))}
          </Slide>
      </div> */}
    
         
        

         
          </div>
          <Grid item xs={12} sm={6}> 
          
          <div className="col-md-12   mt-1 border">
         <Queries cryptoBoysContract={props.cryptoBoysContract} token={props.cryptoboy.tokenId.toNumber()} imageUrl={props.cryptoboy.imageHash} />
         </div>
         </Grid>
        </div>):(<><Loading/>{props.loading?(<> <h1 style={{textAlign:"center"}}>Select a nft</h1></>):(null)}</>
       )
      }
     </>
    );
 
}

export default CryptoBoyNFTDetails;
