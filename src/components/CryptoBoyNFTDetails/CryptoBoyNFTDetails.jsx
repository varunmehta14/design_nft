import React, { useState,useEffect,useCallback } from "react";
import { Link } from "react-router-dom";

import {Paper,Grid,Button,Select,Divider} from '@material-ui/core';

import Queries from "../Queries/Queries";
import Loading from "../Loading/Loading";


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import 'react-slideshow-image/dist/styles.css';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Typography from '@material-ui/core/Typography';
import UserDataService from "../../services/UserService";
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
   // height: '100%',
    maxHeight:400,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
   // width: '100%',
  },
  title: {
    fontFamily: 'fantasy',
    fontSize: '2rem',
    color: 'alicewhite',
  //  textTransform: 'uppercase',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent:"center"
    },
  },
  sectionMobile: {
    //display: 'flex',
  
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const CryptoBoyNFTDetails=(props)=> {

  

 console.log(props.cryptoBoys)
  console.log(window.location.href.split("/")[4])
  const classes=useStyles();
  const theme=useTheme();

  
  const [ newCryptoBoyPrice,setNewCryptoBoyPrice]=useState("");
  const [ newCryptoBoyDressPrice,setNewCryptoBoyDressPrice]=useState("");
  const [loading, setLoading] = useState(false);

  const [mintedByName,setMintedByName]=useState("") 
  const [ownedByName,setOwnedByName]=useState("") 
  const [ownedByEmail,setOwnedByEmail]=useState("") 
  const [prevByName,setPrevByName]=useState("") 
  const [mintedAvatar,setMintedAvatar]=useState(null) 
  const [ownedAvatar,setOwnedAvatar]=useState(null) 
  const [prevAvatar,setPrevAvatar]=useState(null) 
  const [activeStep, setActiveStep] = useState(0);
  
 
 let thistokenId=props.clickedAddress-1;
 if(!props.clickedAddress){thistokenId=window.location.href.split("/")[4]-1};
 console.log("nft",props.cryptoBoys)
console.log(props.cryptoBoys[thistokenId])


// const [designmetadata,setDesignmetadata]=useState("");


  const getCurrentUser=(async()=>{
   
    
    console.log("before")
   
  if(props.cryptoBoys[thistokenId]){
    console.log("after")
    console.log(thistokenId);
   await UserDataService.getByAddress(props.cryptoBoys[thistokenId][0].mintedBy)
   .then(response => 
     { 
       console.log(response);
       setMintedByName(response.data.data[0].userName)
       setMintedAvatar(response.data.data[0].userAvatarHash)

     
     
     //  setSubmitted(true);
    // console.log(response.data);
    
   
   })
   .catch(e => {
     console.log(e);
   });
   await UserDataService.getByAddress(props.cryptoBoys[thistokenId][0].currentOwner)
   .then(response => 
     { 
       console.log(response);
       setOwnedByName(response.data.data[0].userName)
       setOwnedByEmail(response.data.data[0].userEmail)
       setOwnedAvatar(response.data.data[0].userAvatarHash)

     
     })
     //  setSubmitted(true);
    // console.log(response.data);
   
   
   .catch(e => {
     console.log(e);
   });
   await UserDataService.getByAddress(props.cryptoBoys[thistokenId][0].previousOwner)
   .then(response => 
     { 
       console.log(response);
       setPrevByName(response.data.data[0].userName)
       setPrevAvatar(response.data.data[0].userAvatarHash)

     
     
   
    
   
   })
   .catch(e => {
     console.log(e);
   });
   
  //  if(props.cryptoBoys[thistokenId][0].metadata==undefined){
  //   console.log("undefined")
  //  const result = await fetch(props.cryptoBoys[thistokenId][0].tokenURI);
  //  const metadata = await result.json();
  // // props.cryptoBoys[thistokenId][0]
  //  setDesignmetadata(metadata)
  //   console.log(designmetadata)
  // }   
    }
  })
  // const getmetadata=(async()=>{
  //   console.log("Before")
  //   console.log(props.cryptoBoys)
  //   if(props.cryptoBoys[thistokenId][0]){
  //     console.log("after")
  //   const result = await fetch(props.cryptoBoys[thistokenId][0].tokenURI);
  //   const metadata = await result.json();
  //  // props.cryptoBoys[thistokenId][0]
  //   setDesignmetadata(metadata)
  //    console.log(designmetadata)
  //   }
  // })

  useEffect(()=>{
    if(props.cryptoBoys!=undefined){
    getCurrentUser();
    
     // getmetadata();
    }

    }
    
    
  ,[props.cryptoBoys,props.clickedAddress,thistokenId]);
 
       
  
  const callChangeTokenPriceFromApp = (tokenId, newPrice) => {
    props.changeTokenPrice(tokenId, newPrice,false);
  };
  const callChangeTokenDressPriceFromApp = (tokenId, newPrice) => {
    props.changeTokenPrice(tokenId, newPrice,true);
  };
  const handleClick=(address)=>{
    props.callbackFromParent(address)
  }
  const handleClick2=(e)=>{
    e.preventDefault();
    console.log("view on ipfs")
    //window.open(props.cryptoBoys[thistokenId][0].metadata.image, "_blank") 
  }
  const handleImage=(e,id)=>{
    e.preventDefault();
    window.open(props.cryptoBoys[thistokenId][0].metadata.images[id], "_blank") 
  }
 
  console.log(props.cryptoBoys[thistokenId]);
 
 

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
    //console.log(props.cryptoBoys[thistokenId][0].imageHash)
  const renderDesktop=(
    <>
    {!props.tokenExists?(<><h3>Token Doesnt exist</h3></>):props.cryptoBoys==undefined?(<><Loading/></>):props.cryptoBoys[thistokenId] ?
     
      (<div className="d-flex flex-wrap mb-2" style={{padding:"1%",alignItems:"center"}}>
      <div
              key={props.cryptoBoys[thistokenId][0].tokenId.toNumber()}
              className="col-md-6 w-50 p-4 mt-1 border "
              style={{display:"flex",justifyContent:"center"}}
            >
              
             
              <img style={{height:"inherit",width:"inherit"}}src={props.cryptoBoys[thistokenId][0].metadata.image}/>
             
               
        </div>
       <div className="col-md-6 w-50  mt-1 border">
        
        <p>
         <b style={{fontSize:"-webkit-xxx-large",color:"black",fontWeight:"bold"}}>
          {props.cryptoBoys[thistokenId][0].metadata.name}
          </b>
        </p>
        <div className="d-flex flex-wrap " style={{justifyContent:"space-evenly"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <span className="font-weight-bold">Created By :&nbsp;</span>
      <Link to={`/their-tokens/${props.cryptoBoys[thistokenId][0].mintedBy}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId][0].mintedBy)}}style={{textDecorationLine:"none"}}>
      
        {!(mintedByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={mintedByName} src={mintedAvatar}/>&nbsp;<b style={{color:"black",fontWeight:"bold"}}>@{mintedByName}</b></div>):(<>{props.cryptoBoys[thistokenId][0].mintedBy.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId][0].mintedBy.slice(
              props.cryptoBoys[thistokenId][0].mintedBy.length - 5)}</>)}
        </Link>
    </div>
        <Divider orientation="vertical" flexItem style={{width:"0.4%",backgroundColor:"black"}}/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <span className="font-weight-bold">Owned By :&nbsp;</span>
      <Link to={`/their-tokens/${props.cryptoBoys[thistokenId][0].currentOwner}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId][0].currentOwner)}}style={{textDecorationLine:"none"}}> 
     
        {!(ownedByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={ownedByName} src={ownedAvatar}/>&nbsp;<b style={{color:"black",fontWeight:"bold"}}>@{ownedByName}</b></div>):(<>{props.cryptoBoys[thistokenId][0].currentOwner.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId][0].currentOwner.slice(
              props.cryptoBoys[thistokenId][0].currentOwner.length - 5
            )}</>)}
        </Link>
    </div>
        </div>
        <hr style={{borderWidth:"medium",borderColor:"revert"}}/>
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <p>
          <span className="font-weight-bold">Price</span> :{" "}
          <b style={{fontSize:"xx-large",color:"black"}}>
          {window.web3.utils.fromWei(
            props.cryptoBoys[thistokenId][0].price.toString(),
            "Ether"
          )}{" "}
          Ξ
          </b>
        </p>
      
        {props.cryptoBoys[thistokenId][0].numberOfTransfers.toNumber()==0 ?(<>
          {/* {!props.cryptoBoys[thistokenId][0].metadata?(<>
          {designmetadata.categories=="fashionDesign"?(<>
            <p>
          <span className="font-weight-bold">Price with dress</span> :{" "}
          <b style={{fontSize:"xx-large",color:"black"}}>
          {window.web3.utils.fromWei(
            props.cryptoBoys[thistokenId][0].dressPrice.toString(),
            "Ether"
          )}{" "}
          Ξ
          </b>
        </p>
          </>):null}</>):(<>
          {props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
            <p>
          <span className="font-weight-bold">Price with dress</span> :{" "}
          <b style={{fontSize:"xx-large",color:"black"}}>
          {window.web3.utils.fromWei(
            props.cryptoBoys[thistokenId][0].dressPrice.toString(),
            "Ether"
          )}{" "}
          Ξ
          </b>
        </p></>):null}</>)} */}
          {props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
            <p>
          <span className="font-weight-bold">Price with dress</span> :{" "}
          <b style={{fontSize:"xx-large",color:"black"}}>
          {window.web3.utils.fromWei(
            props.cryptoBoys[thistokenId][0].dressPrice.toString(),
            "Ether"
          )}{" "}
          Ξ
          </b>
        </p></>):null}
        </>):(null)}
        </div>
      
        <hr/>
        
      
        <div>
          {props.accountAddress === props.cryptoBoys[thistokenId][0].currentOwner ? (
           <div >
           <form
              onSubmit={(e) => {
                e.preventDefault();
                callChangeTokenPriceFromApp(
                  props.cryptoBoys[thistokenId][0].tokenId.toNumber(),
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
                  className="form-control "
                  placeholder="Enter new price"
                  onChange={(e) =>
                    setNewCryptoBoyPrice(e.target.value)
                  }
                />
              </div>
              <div style={{display:"flex",justifyContent:"center",padding:"0 2% 0 2%"}}>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn btn-outline-info mt-0 "
              >
                change price
              </button>
              </div>
            </form>
            {props.cryptoBoys[thistokenId][0].numberOfTransfers.toNumber()==0 ?(<>
              {/* {!props.cryptoBoys[thistokenId][0].metadata ?( <>
              {designmetadata.categories=="fashionDesign"?(<>
                <form
            onSubmit={(e) => {
              e.preventDefault();
              callChangeTokenDressPriceFromApp(
                props.cryptoBoys[thistokenId][0].tokenId.toNumber(),
                newCryptoBoyDressPrice
              );
              
            }}
           
          >
            <div className="form-group mt-4 " >
              <label htmlFor="newCryptoBoyDressPrice">
                <span className="font-weight-bold">Change Token Price with Dress</span> :
              </label>{" "}
              <input
                required
                type="number"
                name="newCryptoBoyDressPrice"
                id="newCryptoBoyDressPrice"
                value={newCryptoBoyDressPrice}
                className="form-control "
                placeholder="Enter new price with dress"
                onChange={(e) =>
                  setNewCryptoBoyDressPrice(e.target.value)
                }
              />
            </div>
            <div style={{display:"flex",justifyContent:"center",padding:"0 2% 0 2%"}}>
            <button
              type="submit"
              style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
              className="btn btn-outline-info mt-0 "
            >
              change price
            </button>
            </div>
          </form>
              </>):null}</>):(<>{props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
                <form
            onSubmit={(e) => {
              e.preventDefault();
              callChangeTokenDressPriceFromApp(
                props.cryptoBoys[thistokenId][0].tokenId.toNumber(),
                newCryptoBoyDressPrice
              );
              
            }}
           
          >
            <div className="form-group mt-4 " >
              <label htmlFor="newCryptoBoyDressPrice">
                <span className="font-weight-bold">Change Token Price with Dress</span> :
              </label>{" "}
              <input
                required
                type="number"
                name="newCryptoBoyDressPrice"
                id="newCryptoBoyDressPrice"
                value={newCryptoBoyDressPrice}
                className="form-control "
                placeholder="Enter new price with dress"
                onChange={(e) =>
                  setNewCryptoBoyDressPrice(e.target.value)
                }
              />
            </div>
            <div style={{display:"flex",justifyContent:"center",padding:"0 2% 0 2%"}}>
            <button
              type="submit"
              style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
              className="btn btn-outline-info mt-0 "
            >
              change price
            </button>
            </div>
          </form></>):null}</>)} */}
          {props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
                <form
            onSubmit={(e) => {
              e.preventDefault();
              callChangeTokenDressPriceFromApp(
                props.cryptoBoys[thistokenId][0].tokenId.toNumber(),
                newCryptoBoyDressPrice
              );
              
            }}
           
          >
            <div className="form-group mt-4 " >
              <label htmlFor="newCryptoBoyDressPrice">
                <span className="font-weight-bold">Change Token Price with Dress</span> :
              </label>{" "}
              <input
                required
                type="number"
                name="newCryptoBoyDressPrice"
                id="newCryptoBoyDressPrice"
                value={newCryptoBoyDressPrice}
                className="form-control "
                placeholder="Enter new price with dress"
                onChange={(e) =>
                  setNewCryptoBoyDressPrice(e.target.value)
                }
              />
            </div>
            <div style={{display:"flex",justifyContent:"center",padding:"0 2% 0 2%"}}>
            <button
              type="submit"
              style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
              className="btn btn-outline-info mt-0 "
            >
              change price
            </button>
            </div>
          </form></>):null}
           </>):(null)}
          </div>
          ) : null}
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
          {props.accountAddress === props.cryptoBoys[thistokenId][0].currentOwner ? (
            props.cryptoBoys[thistokenId][0].forSale ? (
              <button
                className="btn btn-outline-danger mt-4 w-50"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={() =>
                  props.toggleForSale(
                    props.cryptoBoys[thistokenId][0].tokenId.toNumber()
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
                    props.cryptoBoys[thistokenId][0].tokenId.toNumber()
                  )
                }
              >
                Keep for sale
              </button>
            )
          ) : null}
          </div>
        
        <div style={{display:"flex",justifyContent:"center"}}>
          {props.accountAddress !== props.cryptoBoys[thistokenId][0].currentOwner ? (
            props.cryptoBoys[thistokenId][0].forSale ? (
              <div>
                
              <button
                className="btn btn-outline-primary mt-3 "
                value={props.cryptoBoys[thistokenId][0].price}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={(e) =>
                  props.buyCryptoBoy(
                    props.cryptoBoys[thistokenId][0].tokenId.toNumber(),
                    e.target.value,false
                  )
                }
              >
                Buy For{" "}
                {window.web3.utils.fromWei(
                  props.cryptoBoys[thistokenId][0].price.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </button>
              {"   "}
             {props.cryptoBoys[thistokenId][0].numberOfTransfers.toNumber()==0?(<>
              {/* {!props.cryptoBoys[thistokenId][0].metadata?(<>
                {designmetadata.categories=="fashionDesign"?(<>
                  <Link to={`/sizeDetails`}
                className="btn btn-outline-primary mt-3 "
                value={props.cryptoBoys[thistokenId][0].dressPrice}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                // onClick={(e) =>
                //   props.buyCryptoBoyWithDress(
                //     props.cryptoBoys[thistokenId][0].tokenId,
                //     e.target.value
                //   )
                // }
               onClick={()=>{props.tokenIdAndPrice(props.cryptoBoys[thistokenId][0].tokenId.toNumber(),props.cryptoBoys[thistokenId][0].tokenName,props.cryptoBoys[thistokenId][0].dressPrice,ownedByEmail,ownedByName,props.cryptoBoys[thistokenId][0].metadata.sizeChart)}}
               //onClick={handleOpen}
              >
                Buy with Dress For{" "}
                {window.web3.utils.fromWei(
                  props.cryptoBoys[thistokenId][0].dressPrice.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </Link>
                </>):null}</>):(<>{props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
                <Link to={`/sizeDetails`}
                className="btn btn-outline-primary mt-3 "
                value={props.cryptoBoys[thistokenId][0].dressPrice}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                // onClick={(e) =>
                //   props.buyCryptoBoyWithDress(
                //     props.cryptoBoys[thistokenId][0].tokenId,
                //     e.target.value
                //   )
                // }
               onClick={()=>{props.tokenIdAndPrice(props.cryptoBoys[thistokenId][0].tokenId.toNumber(),props.cryptoBoys[thistokenId][0].tokenName,props.cryptoBoys[thistokenId][0].dressPrice,ownedByEmail,ownedByName,props.cryptoBoys[thistokenId][0].metadata.sizeChart)}}
               //onClick={handleOpen}
              >
                Buy with Dress For{" "}
                {window.web3.utils.fromWei(
                  props.cryptoBoys[thistokenId][0].dressPrice.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </Link></>):null}</>)} */}
              {props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
                <Link to={`/sizeDetails`}
                className="btn btn-outline-primary mt-3 "
                value={props.cryptoBoys[thistokenId][0].dressPrice}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
              
               onClick={()=>{props.tokenIdAndPrice(props.cryptoBoys[thistokenId][0].tokenId.toNumber(),props.cryptoBoys[thistokenId][0].metadata.name,props.cryptoBoys[thistokenId][0].dressPrice,ownedByEmail,ownedByName,props.cryptoBoys[thistokenId][0].metadata.sizeChart)}}
               
              >
                Buy with Dress For{" "}
                {window.web3.utils.fromWei(
                  props.cryptoBoys[thistokenId][0].dressPrice.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </Link></>):null}
                </>
             ):(null)}
             
              
              
              </div>
            ) : (
              <>
              
                <button
                  disabled
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  className="btn btn-outline-primary mt-3 w-50"
                >
                  Buy For{" "}
                  {window.web3.utils.fromWei(
                    props.cryptoBoys[thistokenId][0].price.toString(),
                    "Ether"
                  )}{" "}
                  Ξ
                </button>
                
                <div>
                <p className="mt-2">Currently not for sale!</p></div>
              </>
            )
          ) : null}
        </div>
       
        </div>
       
        <div className="col-md-6 w-50  mt-1 border">
        
       
        {/* <div className="card mt-1">
      <div className="card-body   justify-content-center"> */}
      <h5>Description</h5>
      
      {/* <p>{!props.cryptoBoys[thistokenId][0].metadata?(<>{designmetadata.description}</>):(<>{props.cryptoBoys[thistokenId][0].metadata.description}</>)}</p> */}
      <p>{props.cryptoBoys[thistokenId][0].metadata.description}</p>
      {/* </div>
    </div> */}
           <hr/>
          <h5>Sales History</h5>  
    <div className="card mt-1" style={{backgroundColor:"ghostwhite",borderRadius:"15px"}}>
      <div className="card-body   justify-content-center">
      
     
      <div style={{display:"flex",alignItems:"center"}}>
      <span className="font-weight-bold">Previous Owner :&nbsp;</span>
      <Link to={`/their-tokens/${props.cryptoBoys[thistokenId][0].previousOwner}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId][0].previousOwner)}}style={{textDecorationLine:"none"}}> 
     
        {!(prevByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={prevByName} src={prevAvatar}/>&nbsp;@{prevByName}</div>):(<>{props.cryptoBoys[thistokenId][0].previousOwner.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId][0].previousOwner.slice(
              props.cryptoBoys[thistokenId][0].previousOwner.length - 5
            )}</>)}
        </Link>
    </div>
    <hr/>
        <p>
          <span className="font-weight-bold">No. of Transfers</span> :{" "}
          {props.cryptoBoys[thistokenId][0].numberOfTransfers.toNumber()}
        </p>
      </div>
      <br/>
      
    </div>   
   
  <br/>
  <div>
  {props.cryptoBoys[thistokenId][0].metadata.images.length!=0?(<>
      <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {props.cryptoBoys[thistokenId][0].metadata.images.map((image,index) => (
        <div style={{display:"flex",justifyContent:"center"}}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img className={classes.img} src={image} onClick={(e)=>{handleImage(e,index)}} />
           
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      style={{backgroundColor:"#173e43",color:"aliceblue"}}
      steps={props.cryptoBoys[thistokenId][0].metadata.images.length}
      position="static"
      variant="text"
      activeStep={activeStep}
      nextButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep ===props.cryptoBoys[thistokenId][0].metadata.images.length - 1}>
         
          {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         
        </Button>
      }
    /></>):null}
    {/* {!props.cryptoBoys[thistokenId][0].metadata?(
      <>
      {console.log("metadata undefined",designmetadata)}
      {designmetadata?(<>
        {designmetadata.images.length!=0 ?(<>
        <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {designmetadata.images.map((image,index) => (
        <div style={{display:"flex",justifyContent:"center"}}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img className={classes.img} src={image}  />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      style={{backgroundColor:"#173e43",color:"aliceblue"}}
      steps={designmetadata.images.length}
      position="static"
      variant="text"
      activeStep={activeStep}
      nextButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep ===designmetadata.images.length - 1}>
         
          {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         
        </Button>
      }
    />
    </>):null}
      </>):(null)}
      
      
    </>
    ):(<>
    {props.cryptoBoys[thistokenId][0].metadata.images.length!=0?(<>
      <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {props.cryptoBoys[thistokenId][0].metadata.images.map((image,index) => (
        <div style={{display:"flex",justifyContent:"center"}}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img className={classes.img} src={image} onClick={(e)=>{handleImage(e,index)}} />
           
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      style={{backgroundColor:"#173e43",color:"aliceblue"}}
      steps={props.cryptoBoys[thistokenId][0].metadata.images.length}
      position="static"
      variant="text"
      activeStep={activeStep}
      nextButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep ===props.cryptoBoys[thistokenId][0].metadata.images.length - 1}>
         
          {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         
        </Button>
      }
    /></>):null}
    </>)} */}
  
    </div>
  
       
      

       
        </div>
        <Grid item xs={12} sm={6}> 
        
        <div className="col-md-12   mt-1 border">
       <Queries cryptoBoysContract={props.cryptoBoysContract} token={props.cryptoBoys[thistokenId][0].tokenId.toNumber()} imageUrl={props.cryptoBoys[thistokenId][0].imageHash} />
       </div>
       </Grid>
      </div>):(<><Loading/></>
     )
    }
   </>
  )
  
  const renderMobile=(
    <>
     {!props.tokenExists?(<><h3>Token Doesnt exist</h3></>):props.cryptoBoys==undefined?(<><Loading/></>):props.cryptoBoys[thistokenId] ?
     
     (
       <div style={{padding:"2%",height:"100%"}}>
        <div  style={{margin:"auto",padding:"2%",display:"flex",justifyContent:"center"}}>    
        <Paper>
             <img style={{width:"100%",height:"100%"}} src={props.cryptoBoys[thistokenId][0].metadata.image}/>       
             </Paper>
        </div>

        <div style={{paddingLeft:"2%"}}>
        <p >
         <b style={{fontSize:"-webkit-xxx-large",color:"black",fontWeight:"bold"}}>
          {props.cryptoBoys[thistokenId][0].tokenName}
          </b>

        </p>

        </div>
        
        <div className="d-flex flex-wrap " style={{justifyContent:"space-evenly"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
     
      <Link to={`/their-tokens/${props.cryptoBoys[thistokenId][0].mintedBy}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId][0].mintedBy)}}style={{textDecorationLine:"none"}}>
        
        {!(mintedByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={mintedByName} src={mintedAvatar}/>&nbsp;@{mintedByName}<br/>   <>&nbsp;Creator</></div>):(<>{props.cryptoBoys[thistokenId][0].mintedBy.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId][0].mintedBy.slice(
              props.cryptoBoys[thistokenId][0].mintedBy.length - 5)}<br/>  <>&nbsp;Creator</></>)}
        </Link>
    </div>
        <Divider orientation="vertical" flexItem style={{width:"0.4%",backgroundColor:"black"}}/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
         <Link to={`/their-tokens/${props.cryptoBoys[thistokenId][0].currentOwner}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId][0].currentOwner)}}style={{textDecorationLine:"none"}}> 
     
        {!(ownedByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={ownedByName} src={ownedAvatar}/>&nbsp;@{ownedByName} <br/> <>&nbsp;Owner</></div>):(<>{props.cryptoBoys[thistokenId][0].currentOwner.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId][0].currentOwner.slice(
              props.cryptoBoys[thistokenId][0].currentOwner.length - 5
            )}<br/> <>&nbsp;Owner</></>)}
        </Link>
    </div>
    
    </div>
    <hr style={{borderWidth:"medium",borderColor:"revert"}}/>
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <div style={{marginLeft:"2%",display:"contents",justifyContent:"space-between"}}>
      <div>
    Price:
        <Typography className={classes.title} variant={'h4'} style={{color:"black",textTransform:"none"}}>
       
          {window.web3.utils.fromWei(
            props.cryptoBoys[thistokenId][0].price.toString(),
            "Ether"
          )}{" "}
          Ξ
         
        </Typography>
        </div>
        {props.cryptoBoys[thistokenId][0].numberOfTransfers.toNumber()==0?(<>
          {/* {!props.cryptoBoys[thistokenId][0].metadata?(<>
                {designmetadata.categories=="fashionDesign"?(<>
                  <div>
        <Divider orientation="vertical" flexItem style={{width:"0.4%",backgroundColor:"black"}}/>
        Price with Dress:
        <Typography className={classes.title} variant={'h4'} style={{color:"black",textTransform:"none"}}>
       
          {window.web3.utils.fromWei(
            props.cryptoBoys[thistokenId][0].dressPrice.toString(),
            "Ether"
          )}{" "}
          Ξ
         
        </Typography></div>
                </>):null}</>):(<>{props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
                 
        <Divider orientation="vertical" flexItem style={{width:"0.4%",backgroundColor:"black"}}/>
        <div>
        Price with Dress:
        <Typography className={classes.title} variant={'h4'} style={{color:"black",textTransform:"none"}}>
       
          {window.web3.utils.fromWei(
            props.cryptoBoys[thistokenId][0].dressPrice.toString(),
            "Ether"
          )}{" "}
          Ξ
         
        </Typography></div></>):null}</>)} */}
        {props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
                 
                 <Divider orientation="vertical" flexItem style={{width:"0.4%",backgroundColor:"black"}}/>
                 <div>
                 Price with Dress:
                 <Typography className={classes.title} variant={'h4'} style={{color:"black",textTransform:"none"}}>
                
                   {window.web3.utils.fromWei(
                     props.cryptoBoys[thistokenId][0].dressPrice.toString(),
                     "Ether"
                   )}{" "}
                   Ξ
                  
                 </Typography></div></>):null}
        
        </>):(null)}
        </div>
       
    </div>
    <div>
    <form onSubmit={(e)=>{handleClick2(e)}}>
           
              <button className="mt-3 btn btn-outline-primary" type="submit" style={{borderRadius:"20px",width:"100%"}}>
                View On IPFS
              </button>
            
            </form>
    </div>
        <div>
        {props.accountAddress === props.cryptoBoys[thistokenId][0].currentOwner ? (
           <div >
           <form
              onSubmit={(e) => {
                e.preventDefault();
                callChangeTokenPriceFromApp(
                  props.cryptoBoys[thistokenId][0].tokenId.toNumber(),
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
                  className="form-control "
                  placeholder="Enter new price"
                  onChange={(e) =>
                    setNewCryptoBoyPrice(e.target.value)
                  }
                />
              </div>
              <div style={{display:"flex",justifyContent:"center",padding:"0 2% 0 2%"}}>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn btn-outline-info mt-0 "
              >
                change price
              </button>
              </div>
            </form>
            {props.cryptoBoys[thistokenId][0].numberOfTransfers.toNumber()==0?(<>
               {/* {!props.cryptoBoys[thistokenId][0].metadata?(<>
                {designmetadata.categories=="fashionDesign"?(<>
                  <form
            onSubmit={(e) => {
              e.preventDefault();
              callChangeTokenDressPriceFromApp(
                props.cryptoBoys[thistokenId][0].tokenId.toNumber(),
                newCryptoBoyDressPrice
              );
              
            }}
           
          >
            <div className="form-group mt-4 " >
              <label htmlFor="newCryptoBoyDressPrice">
                <span className="font-weight-bold">Change Token Price with Dress</span> :
              </label>{" "}
              <input
                required
                type="number"
                name="newCryptoBoyDressPrice"
                id="newCryptoBoyDressPrice"
                value={newCryptoBoyDressPrice}
                className="form-control "
                placeholder="Enter new price with dress"
                onChange={(e) =>
                  setNewCryptoBoyDressPrice(e.target.value)
                }
              />
            </div>
            <div style={{display:"flex",justifyContent:"center",padding:"0 2% 0 2%"}}>
            <button
              type="submit"
              style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
              className="btn btn-outline-info mt-0 "
            >
              change price
            </button>
            </div>
          </form>

                </>):null}</>):(<>{props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
                
                  <form
            onSubmit={(e) => {
              e.preventDefault();
              callChangeTokenDressPriceFromApp(
                props.cryptoBoys[thistokenId][0].tokenId.toNumber(),
                newCryptoBoyDressPrice
              );
              
            }}
           
          >
            <div className="form-group mt-4 " >
              <label htmlFor="newCryptoBoyDressPrice">
                <span className="font-weight-bold">Change Token Price with Dress</span> :
              </label>{" "}
              <input
                required
                type="number"
                name="newCryptoBoyDressPrice"
                id="newCryptoBoyDressPrice"
                value={newCryptoBoyDressPrice}
                className="form-control "
                placeholder="Enter new price with dress"
                onChange={(e) =>
                  setNewCryptoBoyDressPrice(e.target.value)
                }
              />
            </div>
            <div style={{display:"flex",justifyContent:"center",padding:"0 2% 0 2%"}}>
            <button
              type="submit"
              style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
              className="btn btn-outline-info mt-0 "
            >
              change price
            </button>
            </div>
          </form></>):null}</>)} */}
          {props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
                
                <form
          onSubmit={(e) => {
            e.preventDefault();
            callChangeTokenDressPriceFromApp(
              props.cryptoBoys[thistokenId][0].tokenId.toNumber(),
              newCryptoBoyDressPrice
            );
            
          }}
         
        >
          <div className="form-group mt-4 " >
            <label htmlFor="newCryptoBoyDressPrice">
              <span className="font-weight-bold">Change Token Price with Dress</span> :
            </label>{" "}
            <input
              required
              type="number"
              name="newCryptoBoyDressPrice"
              id="newCryptoBoyDressPrice"
              value={newCryptoBoyDressPrice}
              className="form-control "
              placeholder="Enter new price with dress"
              onChange={(e) =>
                setNewCryptoBoyDressPrice(e.target.value)
              }
            />
          </div>
          <div style={{display:"flex",justifyContent:"center",padding:"0 2% 0 2%"}}>
          <button
            type="submit"
            style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
            className="btn btn-outline-info mt-0 "
          >
            change price
          </button>
          </div>
        </form></>):null}
            </>):(null)}
          </div>
          ) : null}
        </div>
        <div style={{display:"flex",justifyContent:"center",padding:"0 2% 0 2%"}}>
          {props.accountAddress === props.cryptoBoys[thistokenId][0].currentOwner ? (
            props.cryptoBoys[thistokenId][0].forSale ? (
              <button
                className="btn btn-outline-danger mt-4 w-50"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={() =>
                  props.toggleForSale(
                    props.cryptoBoys[thistokenId][0].tokenId.toNumber()
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
                    props.cryptoBoys[thistokenId][0].tokenId.toNumber()
                  )
                }
              >
                Keep for sale
              </button>
            )
          ) : null}
          </div>   
          <div >
          {props.accountAddress !== props.cryptoBoys[thistokenId][0].currentOwner ? (
            props.cryptoBoys[thistokenId][0].forSale ? (
              <>
              <div style={{display:"flex",justifyContent:"center",alignItems:"baseline"}}>
              <button
                className="btn btn-outline-primary mt-3 w-50"
                value={props.cryptoBoys[thistokenId][0].price}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={(e) =>
                  props.buyCryptoBoy(
                    props.cryptoBoys[thistokenId][0].tokenId.toNumber(),
                    e.target.value,false
                  )
                }
              >
                Buy For{" "}
                {window.web3.utils.fromWei(
                  props.cryptoBoys[thistokenId][0].price.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </button>
              
              </div>
              {props.cryptoBoys[thistokenId][0].numberOfTransfers.toNumber()==0?(<>
{/* 
                {!props.cryptoBoys[thistokenId][0].metadata?(<>
                {designmetadata.categories=="fashionDesign"?(<>
                  <div style={{display:"flex",justifyContent:"center",alignItems:"baseline"}}>
             <Link to={`/sizeDetails`}
                className="btn btn-outline-primary mt-3 "
                value={props.cryptoBoys[thistokenId][0].dressPrice}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                // onClick={(e) =>
                //   props.buyCryptoBoyWithDress(
                //     props.cryptoBoys[thistokenId][0].tokenId,
                //     e.target.value
                //   )
                // }
               onClick={()=>{props.tokenIdAndPrice(props.cryptoBoys[thistokenId][0].tokenId.toNumber(),props.cryptoBoys[thistokenId][0].tokenName,props.cryptoBoys[thistokenId][0].dressPrice,ownedByEmail,ownedByName,props.cryptoBoys[thistokenId][0].metadata.sizeChart)}}
               //onClick={handleOpen}
              >
                Buy with Dress For{" "}
                {window.web3.utils.fromWei(
                  props.cryptoBoys[thistokenId][0].dressPrice.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </Link>
              
              </div>
                </>):null}</>):(<>{props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
                  <div style={{display:"flex",justifyContent:"center",alignItems:"baseline"}}>
             <Link to={`/sizeDetails`}
                className="btn btn-outline-primary mt-3 "
                value={props.cryptoBoys[thistokenId][0].dressPrice}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                // onClick={(e) =>
                //   props.buyCryptoBoyWithDress(
                //     props.cryptoBoys[thistokenId][0].tokenId,
                //     e.target.value
                //   )
                // }
               onClick={()=>{props.tokenIdAndPrice(props.cryptoBoys[thistokenId][0].tokenId.toNumber(),props.cryptoBoys[thistokenId][0].tokenName,props.cryptoBoys[thistokenId][0].dressPrice,ownedByEmail,ownedByName,props.cryptoBoys[thistokenId][0].metadata.sizeChart)}}
               //onClick={handleOpen}
              >
                Buy with Dress For{" "}
                {window.web3.utils.fromWei(
                  props.cryptoBoys[thistokenId][0].dressPrice.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </Link>
              
              </div></>):null}</>)} */}
              {props.cryptoBoys[thistokenId][0].metadata.categories=="fashionDesign"?(<>
                  <div style={{display:"flex",justifyContent:"center",alignItems:"baseline"}}>
             <Link to={`/sizeDetails`}
                className="btn btn-outline-primary mt-3 "
                value={props.cryptoBoys[thistokenId][0].dressPrice}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
              
               onClick={()=>{props.tokenIdAndPrice(props.cryptoBoys[thistokenId][0].tokenId.toNumber(),props.cryptoBoys[thistokenId][0].metadata.name,props.cryptoBoys[thistokenId][0].dressPrice,ownedByEmail,ownedByName,props.cryptoBoys[thistokenId][0].metadata.sizeChart)}}
               //onClick={handleOpen}
              >
                Buy with Dress For{" "}
                {window.web3.utils.fromWei(
                  props.cryptoBoys[thistokenId][0].dressPrice.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </Link>
              
              </div></>):null}
             </>):(null)}
              </>
            ) : (
              <>
              <div style={{display:"flex",justifyContent:"center",alignItems:"baseline"}} >
              
                <button
                  disabled
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  className="btn btn-outline-primary mt-3 w-50"
                >
                  Buy For{" "}
                  {window.web3.utils.fromWei(
                    props.cryptoBoys[thistokenId][0].price.toString(),
                    "Ether"
                  )}{" "}
                  Ξ
                </button>
                </div>
                
                <p style={{textAlign:"center"}}>Currently not for sale!</p>
              </>
            )
          ) : null}
        </div>
       <hr/>
           <div style={{padding:"2%"}}>
           <h5>Description</h5>
      
      {/* <p>{!props.cryptoBoys[thistokenId][0].metadata?(<>{designmetadata.description}</>):(<>{props.cryptoBoys[thistokenId][0].metadata.description}</>)}</p> */}
          <p>{props.cryptoBoys[thistokenId][0].metadata.description}</p>
           </div>
           <hr/>
         <div  style={{padding:"2%"}}>
           <h5>Sales History</h5>  
    <div className="card mt-1" style={{backgroundColor:"ghostwhite",borderRadius:"15px"}}>
      <div className="card-body   justify-content-center">
      
     
      <div style={{display:"flex",alignItems:"center"}}>
      <span className="font-weight-bold">Previous Owner :&nbsp;</span>
      <Link to={`/their-tokens/${props.cryptoBoys[thistokenId][0].previousOwner}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId][0].previousOwner)}}> 
      
        {!(prevByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={prevByName} src={prevAvatar}/>&nbsp;{prevByName}</div>):(<>{props.cryptoBoys[thistokenId][0].previousOwner.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId][0].previousOwner.slice(
              props.cryptoBoys[thistokenId][0].previousOwner.length - 5
            )}</>)}
        </Link>
    </div>
    <hr/>
        <p>
          <span className="font-weight-bold">No. of Transfers</span> :{" "}
          {props.cryptoBoys[thistokenId][0].numberOfTransfers.toNumber()}
        </p>
      </div>
      <br/>
      
    </div>     
           </div>
           <hr/>
           <div style={{padding:"2%"}}>
        
    {/* {!props.cryptoBoys[thistokenId][0].metadata?(
      <>
      {designmetadata?(<>
        {designmetadata.images.length!=0 ?(<>
        <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {designmetadata.images.map((image,index) => (
        <div style={{display:"flex",justifyContent:"center"}}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img className={classes.img} src={image}  />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      style={{backgroundColor:"#173e43",color:"aliceblue"}}
      steps={designmetadata.images.length}
      position="static"
      variant="text"
      activeStep={activeStep}
      nextButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep ===designmetadata.images.length - 1}>
         
          {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         
        </Button>
      }
    /></>):null}
      </>):(null)}
      
      
    </>
    ):(<>
    {props.cryptoBoys[thistokenId][0].metadata.images.length!=0?(<>
      <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {props.cryptoBoys[thistokenId][0].metadata.images.map((image,index) => (
        <div style={{display:"flex",justifyContent:"center"}}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img className={classes.img} src={image} onClick={(e)=>{handleImage(e,index)}} />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      style={{backgroundColor:"#173e43",color:"aliceblue"}}
      steps={props.cryptoBoys[thistokenId][0].metadata.images.length}
      position="static"
      variant="text"
      activeStep={activeStep}
      nextButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep ===props.cryptoBoys[thistokenId][0].metadata.images.length - 1}>
         
          {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         
        </Button>
      }
    /></>):null}
    </>)} */}
       {props.cryptoBoys[thistokenId][0].metadata.images.length!=0?(<>
      <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {props.cryptoBoys[thistokenId][0].metadata.images.map((image,index) => (
        <div style={{display:"flex",justifyContent:"center"}}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img className={classes.img} src={image} onClick={(e)=>{handleImage(e,index)}} />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      style={{backgroundColor:"#173e43",color:"aliceblue"}}
      steps={props.cryptoBoys[thistokenId][0].metadata.images.length}
      position="static"
      variant="text"
      activeStep={activeStep}
      nextButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep ===props.cryptoBoys[thistokenId][0].metadata.images.length - 1}>
         
          {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         
        </Button>
      }
    /></>):null}
  
    </div>
   
    </div>
     )
               :(<><Loading/>{props.loading?(<> <h1 style={{textAlign:"center"}}>Select a nft</h1></>):(null)}</>
     )
    }
    </>
  );
    return (
      <div >
      <div className={classes.sectionMobile}>
       {renderMobile}
       </div>
       <div className={classes.sectionDesktop}>
       {renderDesktop}
     </div>
     </div>
    );
 
}

export default CryptoBoyNFTDetails;
