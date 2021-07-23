import React, { useState,useEffect,useCallback } from "react";
import { Link } from "react-router-dom";
import queryString from 'query-string';
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
import Typography from '@material-ui/core/Typography';

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

  

 // const value=queryString.parse(props.location.search);
  console.log(window.location.href.split("/")[4])
  const classes=useStyles();
  const theme=useTheme();
  //console.log(props.cryptoBoys[thistokenId]sContract)
  
  const [ newCryptoBoyPrice,setNewCryptoBoyPrice]=useState("");
  //const [loading, setLoading] = useState(false);
  const [ isHidden,setIsHidden]=useState(true);
  const [mintedByName,setMintedByName]=useState("") 
  const [ownedByName,setOwnedByName]=useState("") 
  const [prevByName,setPrevByName]=useState("") 
  const [mintedAvatar,setMintedAvatar]=useState(null) 
  const [ownedAvatar,setOwnedAvatar]=useState(null) 
  const [prevAvatar,setPrevAvatar]=useState(null) 
  const [activeStep, setActiveStep] = useState(0);
  
 // const [props.cryptoBoys[thistokenId],setprops.cryptoBoys[thistokenId]]=useState("");
  //const [tokenNo,setTokenNo]=useState(window.location.href.split("/")[4]);
 // const maxSteps = props.cryptoBoys[thistokenId].metaData.images.length;
 let thistokenId=props.clickedAddress-1;
 if(!props.clickedAddress){thistokenId=window.location.href.split("/")[4]-1};
console.log(props.cryptoBoys[thistokenId])
//console.log(tokenNo)
console.log(props.users)
const [designMetadata,setDesignMetadata]=useState("");

// if (props.cryptoBoys[window.location.href.split("/")[4]].metaData) {
//   setLoading(false);
//   setprops.cryptoBoys[thistokenId](props.cryptoBoys[window.location.href.split("/")[4]-1]);
// } else {
//   setLoading(true);
// }

  const getCurrentUser=(async()=>{
    //setprops.cryptoBoys[thistokenId](props.cryptoBoys[window.location.href.split("/")[4]]);
   
     

    if(props.users&&props.usersContract&&props.cryptoBoysContract){
     // const currentMinted=await props.users.find((user)=>user.userAddress.includes(props.cryptoBoys[thistokenId].mintedBy));
   // console.log("Curent minted by array",currentMinted)
      const currentMinted=await props.usersContract.methods
    .allUsers(props.cryptoBoys[thistokenId].mintedBy)
    .call();
    setMintedByName(currentMinted[1]);
    setMintedAvatar(currentMinted[6]);
    //const currentOwned=await props.users.find((user)=>user.userAddress.includes(props.cryptoBoys[thistokenId].currentOwner));
    const currentOwned=await props.usersContract.methods
    .allUsers(props.cryptoBoys[thistokenId].currentOwner)
    .call();
    setOwnedByName(currentOwned[1]);
    setOwnedAvatar(currentOwned[6]);
    //const previousOwner=await props.users.find((user)=>user.userAddress.includes(props.cryptoboy[thistokenId].previousOwner));
    const previousOwner=await props.usersContract.methods
    .allUsers(props.cryptoBoys[thistokenId].previousOwner)
    .call();
    setPrevByName(previousOwner[1]);
     setPrevAvatar(previousOwner[6]);
     console.log(props.cryptoBoys[thistokenId].metaData)
    if(props.cryptoBoys[thistokenId].metaData!==undefined){
      console.log("undefined")
     const result = await fetch(props.cryptoBoys[thistokenId].tokenURI);
     const metaData = await result.json();
    // props.cryptoBoys[thistokenId]
     setDesignMetadata(metaData)
      console.log(designMetadata)
    }   
   }
     
    
    })

  useEffect(()=>{
    getCurrentUser();
  
  },[props.usersContract,props.users]);
 
  // useEffect(()=>{
  // // setTokenNo(window.location.href.split("/")[4])
  // console.log("useEffect called")
  // async function getCurrentUser(){
  //   if(props.usersContract&&props.cryptoBoysContract){
  //     const current1=await props.usersContract.methods
  //     .allUsers(props.cryptoBoys[thistokenId].mintedBy)
  //     .call();
  //     setMintedByName(current1[1]);
  //     setMintedAvatar(current1[6])
  //     const current2=await props.usersContract.methods
  //     .allUsers(props.cryptoBoys[thistokenId].currentOwner)
  //     .call();
  //     setOwnedByName(current2[1]);
  //     setOwnedAvatar(current2[6]);
  //     const current3=await props.usersContract.methods
  //     .allUsers(props.cryptoBoys[thistokenId].previousOwner)
  //     .call();
  //     setPrevByName(current3[1]);
  //      setPrevAvatar(current3[6]);
  //      console.log(props.cryptoBoys[thistokenId].metaData)
  //     if(props.cryptoBoys[thistokenId].metaData!==undefined){
  //       console.log("undefined")
  //      const result = await fetch(props.cryptoBoys[thistokenId].tokenURI);
  //      const metaData = await result.json();
  //     // props.cryptoBoys[thistokenId]
  //      setDesignMetadata(metaData)
  //       console.log(designMetadata)
  //     }   
  //    }
  // }
  //   getCurrentUser();
  
  
  // },[]);
  
//console.log(mintedByName,ownedByName,prevByName)         
  
  const callChangeTokenPriceFromApp = (tokenId, newPrice) => {
    props.changeTokenPrice(tokenId, newPrice);
  };
  const handleClick=(address)=>{
    props.callbackFromParent(address)
  }
  const handleClick2=(e)=>{
    e.preventDefault();
    window.open(props.cryptoBoys[thistokenId].imageHash, "_blank") 
  }
  const handleImage=(e,id)=>{
    e.preventDefault();
    window.open(props.cryptoBoys[thistokenId].metaData.images[id], "_blank") 
  }
  const sendTokenID=(tokId)=>{
    props.callBack(tokId)
  }
  console.log(props.cryptoBoys[thistokenId]);
 
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
    //console.log(props.cryptoBoys[thistokenId].imageHash)
  const renderDesktop=(
    <>
    {!props.tokenExists?(<><h3>Token Doesnt exist</h3></>):props.loading?(<><Loading/></>):props.cryptoBoys[thistokenId] ?
     
      (<div className="d-flex flex-wrap mb-2" style={{padding:"1%",height:"100%"}}>
      <div
              key={props.cryptoBoys[thistokenId].tokenId.toNumber()}
              className="w-50 h-50 p-4 mt-1 border "
              style={{display:"flex",justifyContent:"center"}}
            >
              
             
              <img style={{objectFit:"scale-down"}} src={props.cryptoBoys[thistokenId].imageHash}/>
             
               
        </div>
       <div className="col-md-6 w-50  mt-1 border">
        
        <p>
         <b style={{fontSize:"-webkit-xxx-large",color:"black",fontWeight:"bold"}}>
          {props.cryptoBoys[thistokenId].tokenName}
          </b>
        </p>
        <div className="d-flex flex-wrap " style={{justifyContent:"space-evenly"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <span className="font-weight-bold">Created By :&nbsp;</span>
      <Link to={`/their-tokens/${props.cryptoBoys[thistokenId].mintedBy}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId].mintedBy)}}style={{textDecorationLine:"none"}}>
         {/* {props.cryptoBoys[thistokenId].mintedBy.substr(0, 5) +
        "..." +
        props.cryptoBoys[thistokenId].mintedBy.slice(
          props.cryptoBoys[thistokenId].mintedBy.length - 5
        )} */}
        {!(mintedByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={mintedByName} src={mintedAvatar}/>&nbsp;<b style={{color:"black",fontWeight:"bold"}}>@{mintedByName}</b></div>):(props.cryptoBoys[thistokenId].mintedBy.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId].mintedBy.slice(
              props.cryptoBoys[thistokenId].mintedBy.length - 5))}
        </Link>
    </div>
        <Divider orientation="vertical" flexItem style={{width:"0.4%",backgroundColor:"black"}}/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <span className="font-weight-bold">Owned By :&nbsp;</span>
      <Link to={`/their-tokens/${props.cryptoBoys[thistokenId].currentOwner}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId].currentOwner)}}style={{textDecorationLine:"none"}}> 
      {/* {props.cryptoBoys[thistokenId].currentOwner.substr(0, 5) +
        "..." +
        props.cryptoBoys[thistokenId].currentOwner.slice(
          props.cryptoBoys[thistokenId].currentOwner.length - 5
        )} */}
        {!(ownedByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={ownedByName} src={ownedAvatar}/>&nbsp;<b style={{color:"black",fontWeight:"bold"}}>@{ownedByName}</b></div>):(props.cryptoBoys[thistokenId].currentOwner.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId].currentOwner.slice(
              props.cryptoBoys[thistokenId].currentOwner.length - 5
            ))}
        </Link>
    </div>
        </div>
        <hr style={{borderWidth:"medium",borderColor:"revert"}}/>
        
        <p>
          <span className="font-weight-bold">Price</span> :{" "}
          <b style={{fontSize:"xx-large",color:"black"}}>
          {window.web3.utils.fromWei(
            props.cryptoBoys[thistokenId].price.toString(),
            "Ether"
          )}{" "}
          Ξ
          </b>
        </p>
        <hr/>
        
      
        <div>
          {props.accountAddress === props.cryptoBoys[thistokenId].currentOwner ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                callChangeTokenPriceFromApp(
                  props.cryptoBoys[thistokenId].tokenId.toNumber(),
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
          {props.accountAddress === props.cryptoBoys[thistokenId].currentOwner ? (
            props.cryptoBoys[thistokenId].forSale ? (
              <button
                className="btn btn-outline-danger mt-4 w-50"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={() =>
                  props.toggleForSale(
                    props.cryptoBoys[thistokenId].tokenId.toNumber()
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
                    props.cryptoBoys[thistokenId].tokenId.toNumber()
                  )
                }
              >
                Keep for sale
              </button>
            )
          ) : null}
          </div>
        
        <div style={{display:"flex",justifyContent:"center"}}>
          {props.accountAddress !== props.cryptoBoys[thistokenId].currentOwner ? (
            props.cryptoBoys[thistokenId].forSale ? (
              <button
                className="btn btn-outline-primary mt-3 w-50"
                value={props.cryptoBoys[thistokenId].price}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={(e) =>
                  props.buyCryptoBoy(
                    props.cryptoBoys[thistokenId].tokenId.toNumber(),
                    e.target.value
                  )
                }
              >
                Buy For{" "}
                {window.web3.utils.fromWei(
                  props.cryptoBoys[thistokenId].price.toString(),
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
                    props.cryptoBoys[thistokenId].price.toString(),
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
      
      <p>{!props.cryptoBoys[thistokenId].metaData?(<>{designMetadata.description}</>):(<>{props.cryptoBoys[thistokenId].metaData.description}</>)}</p>
      {/* </div>
    </div> */}
           <hr/>
          <h5>Sales History</h5>  
    <div className="card mt-1" style={{backgroundColor:"ghostwhite",borderRadius:"15px"}}>
      <div className="card-body   justify-content-center">
      
     
      <div style={{display:"flex",alignItems:"center"}}>
      <span className="font-weight-bold">Previous Owner :&nbsp;</span>
      <Link to={`/their-tokens/${props.cryptoBoys[thistokenId].previousOwner}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId].previousOwner)}}style={{textDecorationLine:"none"}}> 
      {/* {props.cryptoBoys[thistokenId].currentOwner.substr(0, 5) +
        "..." +
        props.cryptoBoys[thistokenId].currentOwner.slice(
          props.cryptoBoys[thistokenId].currentOwner.length - 5
        )} */}
        {!(prevByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={prevByName} src={prevAvatar}/>&nbsp;{prevByName}</div>):(props.cryptoBoys[thistokenId].previousOwner.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId].previousOwner.slice(
              props.cryptoBoys[thistokenId].previousOwner.length - 5
            ))}
        </Link>
    </div>
    <hr/>
        <p>
          <span className="font-weight-bold">No. of Transfers</span> :{" "}
          {props.cryptoBoys[thistokenId].numberOfTransfers.toNumber()}
        </p>
      </div>
      <br/>
      
    </div>   
    {/* <div className="card mt-1">
      {props.cryptoBoys[thistokenId].metaData.images.map
              ((image)=>{return (
                            <div className="card-body "style={{display:"contents"}} ><img src={image}/></div>
                            );
                        }
              )
      } 
    </div>   */}
    
    {/* <div className={useStyles.root} >
    <GridList className={useStyles.gridList} cols={3}>
      {props.cryptoBoys[thistokenId].metaData.images.map((image) => (
        <GridListTile key={image} style={{width:"40%",height:"40%"}}>
          <img src={image} style={{width:"inherit",height:"inherit"}}/>
          
        </GridListTile>
      ))}
    </GridList>
  </div> */}
  
  {/* <Carousel showArrows={true} dynamicHeight={true}>
  {props.cryptoBoys[thistokenId].metaData.images.map((image) => (
       
          <img src={image}/>
       
      
          
        
      ))}
  </Carousel> */}
  <br/>
  <div>
    {!props.cryptoBoys[thistokenId].metaData?(
      <>
      {/* <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {designMetadata.images.map((image,index) => (
        <div style={{display:"flex",justifyContent:"center"}}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img className={classes.img} src={image}  />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      style={{backgroundColor:"#173e43",color:"aliceblue"}}
      steps={designMetadata.images.length}
      position="static"
      variant="text"
      activeStep={activeStep}
      nextButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep ===designMetadata.images.length - 1}>
         
          {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         
        </Button>
      }
    /> */}
    </>
    ):(<>
    <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {props.cryptoBoys[thistokenId].metaData.images.map((image,index) => (
        <div style={{display:"flex",justifyContent:"center"}}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img className={classes.img} src={image} onClick={(e)=>{handleImage(e,index)}} />
           
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      style={{backgroundColor:"#173e43",color:"aliceblue"}}
      steps={props.cryptoBoys[thistokenId].metaData.images.length}
      position="static"
      variant="text"
      activeStep={activeStep}
      nextButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep ===props.cryptoBoys[thistokenId].metaData.images.length - 1}>
         
          {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         
        </Button>
      }
    /></>)}
  
    </div>
  {/* <div>
  <Slide slidesToShow={2}slidesToScroll={2}{...properties}>
  {props.cryptoBoys[thistokenId].metaData.images.map((image) => (
      
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
       <Queries cryptoBoysContract={props.cryptoBoysContract} token={props.cryptoBoys[thistokenId].tokenId.toNumber()} imageUrl={props.cryptoBoys[thistokenId].imageHash} />
       </div>
       </Grid>
      </div>):(<><Loading/>{props.loading?(<> <h1 style={{textAlign:"center"}}>Select a nft</h1></>):(null)}</>
     )
    }
   </>
  )
  
  const renderMobile=(
    <>
     {!props.tokenExists?(<><h3>Token Doesnt exist</h3></>):props.loading?(<><Loading/></>):props.cryptoBoys[thistokenId] ?
     
     (
       <div style={{padding:"2%",height:"100%"}}>
        <div  style={{margin:"auto",padding:"2%",display:"flex",justifyContent:"center"}}>    
        <Paper>
             <img style={{width:"inherit"}} src={props.cryptoBoys[thistokenId].imageHash}/>       
             </Paper>
        </div>

        <div style={{paddingLeft:"2%"}}>
        <p >
         <b style={{fontSize:"-webkit-xxx-large",color:"black",fontWeight:"bold"}}>
          {props.cryptoBoys[thistokenId].tokenName}
          </b>

        </p>

        </div>
        
        <div className="d-flex flex-wrap " style={{justifyContent:"space-evenly"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
     
      <Link to={`/their-tokens/${props.cryptoBoys[thistokenId].mintedBy}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId].mintedBy)}}style={{textDecorationLine:"none"}}>
         {/* {props.cryptoBoys[thistokenId].mintedBy.substr(0, 5) +
        "..." +
        props.cryptoBoys[thistokenId].mintedBy.slice(
          props.cryptoBoys[thistokenId].mintedBy.length - 5
        )} */}
        {!(mintedByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={mintedByName} src={mintedAvatar}/>&nbsp;@{mintedByName}<br/>   <>&nbsp;Creator</></div>):(<>props.cryptoBoys[thistokenId].mintedBy.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId].mintedBy.slice(
              props.cryptoBoys[thistokenId].mintedBy.length - 5)<br/>  <>&nbsp;Creator</></>)}
        </Link>
    </div>
        <Divider orientation="vertical" flexItem style={{width:"0.4%",backgroundColor:"black"}}/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
         <Link to={`/their-tokens/${props.cryptoBoys[thistokenId].currentOwner}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId].currentOwner)}}style={{textDecorationLine:"none"}}> 
      {/* {props.cryptoBoys[thistokenId].currentOwner.substr(0, 5) +
        "..." +
        props.cryptoBoys[thistokenId].currentOwner.slice(
          props.cryptoBoys[thistokenId].currentOwner.length - 5
        )} */}
        {!(ownedByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={ownedByName} src={ownedAvatar}/>&nbsp;@{ownedByName} <br/> <>&nbsp;Owner</></div>):(<>props.cryptoBoys[thistokenId].currentOwner.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId].currentOwner.slice(
              props.cryptoBoys[thistokenId].currentOwner.length - 5
            )<br/> <>&nbsp;Owner</></>)}
        </Link>
    </div>
    
    </div>
    <hr style={{borderWidth:"medium",borderColor:"revert"}}/>
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <div style={{marginLeft:"2%"}}>
    Price
        <Typography className={classes.title} variant={'h4'} style={{color:"black",textTransform:"none"}}>
       
          {window.web3.utils.fromWei(
            props.cryptoBoys[thistokenId].price.toString(),
            "Ether"
          )}{" "}
          Ξ
         
        </Typography>
        </div>
        <div>
    <form onSubmit={(e)=>{handleClick2(e)}}>
           
              <button className="mt-3 btn btn-outline-primary" type="submit" style={{borderRadius:"20px"}}>
                View On IPFS
              </button>
            
            </form>
    </div>
    </div>
        <div>
        {props.accountAddress === props.cryptoBoys[thistokenId].currentOwner ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                callChangeTokenPriceFromApp(
                  props.cryptoBoys[thistokenId].tokenId.toNumber(),
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
          ) : null}
        </div>
        <div style={{display:"flex",justifyContent:"center",padding:"0 2% 0 2%"}}>
          {props.accountAddress === props.cryptoBoys[thistokenId].currentOwner ? (
            props.cryptoBoys[thistokenId].forSale ? (
              <button
                className="btn btn-outline-danger mt-4 w-50"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={() =>
                  props.toggleForSale(
                    props.cryptoBoys[thistokenId].tokenId.toNumber()
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
                    props.cryptoBoys[thistokenId].tokenId.toNumber()
                  )
                }
              >
                Keep for sale
              </button>
            )
          ) : null}
          </div>   
          <div >
          {props.accountAddress !== props.cryptoBoys[thistokenId].currentOwner ? (
            props.cryptoBoys[thistokenId].forSale ? (
              <div style={{display:"flex",justifyContent:"center",alignItems:"baseline"}}>
              <button
                className="btn btn-outline-primary mt-3 w-50"
                value={props.cryptoBoys[thistokenId].price}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={(e) =>
                  props.buyCryptoBoy(
                    props.cryptoBoys[thistokenId].tokenId.toNumber(),
                    e.target.value
                  )
                }
              >
                Buy For{" "}
                {window.web3.utils.fromWei(
                  props.cryptoBoys[thistokenId].price.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </button>
              </div>
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
                    props.cryptoBoys[thistokenId].price.toString(),
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
      
      <p>{!props.cryptoBoys[thistokenId].metaData?(<>{designMetadata.description}</>):(<>{props.cryptoBoys[thistokenId].metaData.description}</>)}</p>
           </div>
           <hr/>
         <div  style={{padding:"2%"}}>
           <h5>Sales History</h5>  
    <div className="card mt-1" style={{backgroundColor:"ghostwhite",borderRadius:"15px"}}>
      <div className="card-body   justify-content-center">
      
     
      <div style={{display:"flex",alignItems:"center"}}>
      <span className="font-weight-bold">Previous Owner :&nbsp;</span>
      <Link to={`/their-tokens/${props.cryptoBoys[thistokenId].previousOwner}`} onClick={()=>{handleClick(props.cryptoBoys[thistokenId].previousOwner)}}> 
      {/* {props.cryptoBoys[thistokenId].currentOwner.substr(0, 5) +
        "..." +
        props.cryptoBoys[thistokenId].currentOwner.slice(
          props.cryptoBoys[thistokenId].currentOwner.length - 5
        )} */}
        {!(prevByName=="")?(<div style={{display:"flex",alignItems:"center"}}> <Avatar alt={prevByName} src={prevAvatar}/>&nbsp;{prevByName}</div>):(props.cryptoBoys[thistokenId].previousOwner.substr(0, 5) +
            "..." +
            props.cryptoBoys[thistokenId].previousOwner.slice(
              props.cryptoBoys[thistokenId].previousOwner.length - 5
            ))}
        </Link>
    </div>
    <hr/>
        <p>
          <span className="font-weight-bold">No. of Transfers</span> :{" "}
          {props.cryptoBoys[thistokenId].numberOfTransfers.toNumber()}
        </p>
      </div>
      <br/>
      
    </div>     
           </div>
           <hr/>
           <div style={{padding:"2%"}}>
    {!props.cryptoBoys[thistokenId].metaData?(
      <>
      {/* <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {designMetadata.images.map((image,index) => (
        <div style={{display:"flex",justifyContent:"center"}}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img className={classes.img} src={image}  />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      style={{backgroundColor:"#173e43",color:"aliceblue"}}
      steps={designMetadata.images.length}
      position="static"
      variant="text"
      activeStep={activeStep}
      nextButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep ===designMetadata.images.length - 1}>
         
          {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         
        </Button>
      }
    /> */}
    </>
    ):(<>
    <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {props.cryptoBoys[thistokenId].metaData.images.map((image,index) => (
        <div style={{display:"flex",justifyContent:"center"}}>
          {Math.abs(activeStep - index) <= 2 ? (
            <img className={classes.img} src={image} onClick={(e)=>{handleImage(e,index)}} />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      style={{backgroundColor:"#173e43",color:"aliceblue"}}
      steps={props.cryptoBoys[thistokenId].metaData.images.length}
      position="static"
      variant="text"
      activeStep={activeStep}
      nextButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}} onClick={handleNext} disabled={activeStep ===props.cryptoBoys[thistokenId].metaData.images.length - 1}>
         
          {theme.direction === 'rtl' ? <KeyboardArrowLeft  /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" style={{backgroundColor:"#dddfd4"}}onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
         
        </Button>
      }
    /></>)}
  
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
