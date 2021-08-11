import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Color from 'color';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Loading from "../Loading/Loading";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles'
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
//import UserDataService from ".../services/UserService";
import UserDataService from "../../services/UserService";
const useStyles = makeStyles((theme) => ({
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  card: ({ color }) => ({
    minWidth: 256,
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color("#203f52")
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: "#203f52",
      padding: '1rem 1.5rem 1.5rem',
    };
  },
  content2: ({ color }) => {
    return {
      backgroundColor: "aliceblue",
     
    };
  },
  title: {
    fontFamily: 'fantasy',
    fontSize: '2rem',
    color: 'alicewhite',
  //  textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    color: 'black',
    opacity: 0.87,
    marginTop: '2rem',
    fontWeight: 500,
    fontSize: 14,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));
const NFTHighlights=(props)=> {
  const classes = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  console.log(props)
    
      const [mintedByName,setMintedByName]=useState(props.cryptoboy.mintedBy) 
      const [mintedAvatar,setMintedAvatar]=useState(null) 
      const [ownedByName,setOwnedByName]=useState(props.cryptoboy.currentOwner) 
      const [ownedAvatar,setOwnedAvatar]=useState(null) 
   
     
      const getCurrentUser=async()=>{
       if(props.usersContract&&props.users){
         //const currentMinted=await props.users.find((user)=>user.userAddress===props.cryptoboy.mintedBy);
        // console.log("Current using array",currentMinted)
         console.log(props)
           const currentMinted=await props.usersContract.methods
           .allUsers(props.cryptoboy.mintedBy)
           .call();
          setMintedByName(currentMinted[1]);
          setMintedAvatar(currentMinted[6]);
          //const currentOwned=await props.users.find((user)=>user.userAddress===props.cryptoboy.currentOwner);
           const currentOwned=await props.usersContract.methods
          .allUsers(props.cryptoboy.currentOwner)
           .call();
          setOwnedByName(currentOwned[1]);
          setOwnedAvatar(currentOwned[6]);
        }
        
        UserDataService.getByAddress(props.cryptoboy.mintedBy)
        .then(response => 
          { 
            console.log(response);
            setMintedByName(response.data[0].userName)
            setMintedAvatar(response.data[0].userAvatarHash)

          
          
          //  setSubmitted(true);
         // console.log(response.data);
         
        
        })
        .catch(e => {
          console.log(e);
        });
        UserDataService.getByAddress(props.cryptoboy.currentOwner)
        .then(response => 
          { 
            console.log(response);
            setOwnedByName(response.data[0].userName)
            setOwnedAvatar(response.data[0].userAvatarHash)

          
          })
          //  setSubmitted(true);
         // console.log(response.data);
        
        
        .catch(e => {
          console.log(e);
        });
        
      }
      useEffect(()=>{
        if(props.users){
          getCurrentUser();
        }
       
      },[props.users,props.cryptoboy]);
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
       {props.cryptoboy&&ownedByName?(
         <>
         <CardActionArea className={classes.actionArea}>
      <Link to={`/nftDetails/${props.cryptoboy.tokenId.toNumber()}`} onClick={()=>handleClick(props.cryptoboy.tokenId.toNumber())}style={{textDecorationLine:"none"}}>
    <Card className={classes.card}>
      <CardMedia  classes={mediaStyles} image={props.cryptoboy.imageHash} style={{backgroundSize:"contain"}}/> 
    
      <CardActions className={classes.content}disableSpacing>
      <div style={{display:"flex"}}>
        <Typography className={classes.title} variant={'h2'} style={{color:"aliceblue",textTransform:"none"}}>
        {props.cryptoboy.tokenName}
        </Typography>
        </div>
        </CardActions>
      <CardContent className={classes.content2}>
     
        
        <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
        {/* <span className="font-weight-bold">Created By :&nbsp;</span> */}
        <Link to={`/their-tokens/${props.cryptoboy.mintedBy}`} onClick={()=>{handleClick(props.cryptoboy.mintedBy); window.location.href=`/their-tokens/${props.cryptoboy.mintedBy}`}}style={{textDecorationLine:"none"}}>
          
          {!(mintedByName=="")?(<div style={{display:"flex",alignItems:"center",fontWeight:"bolder"}}> <Avatar alt={mintedByName} src={mintedAvatar}/>&nbsp;@{mintedByName}  <br/>
          <>&nbsp;Creator</></div>):(<>{props.cryptoboy.mintedBy.substr(0, 5) +
              "..." +
              props.cryptoboy.mintedBy.slice(
                props.cryptoboy.mintedBy.length - 5  )}<br/>
          <>&nbsp;Creator</></>)}
          </Link>
        
      </div>
        <hr style={{borderWidth:"thin"}}/>
      
       
     
      <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
        {/* <span className="font-weight-bold">Owned By :&nbsp;</span> */}
        <Link to={`/their-tokens/${props.cryptoboy.currentOwner}`} onClick={()=>{handleClick(props.cryptoboy.currentOwner); window.location.href=`/their-tokens/${props.cryptoboy.currentOwner}`}}style={{textDecorationLine:"none"}}> 
        {/* {props.cryptoboy.currentOwner.substr(0, 5) +
          "..." +
          props.cryptoboy.currentOwner.slice(
            props.cryptoboy.currentOwner.length - 5
          )} */}
          {!(ownedByName=="")?(<div style={{display:"flex",alignItems:"center",fontWeight:"bolder"}}> <Avatar alt={ownedByName} src={ownedAvatar}/>&nbsp;@{ownedByName} <br/>
          <>&nbsp;Owner</></div>):(<>{props.cryptoboy.currentOwner.substr(0, 5) +
              "..." +
              props.cryptoboy.currentOwner.slice(
                props.cryptoboy.currentOwner.length - 5
              )}<br/>
              <>&nbsp;Owner</></>)}
          </Link>
      </div>
        <hr/>
        Price
        <Typography className={classes.title} variant={'h4'} style={{color:"black",textTransform:"none"}}>
        {window.web3.utils.fromWei(
          props.cryptoboy.price.toString(),
          "Ether"
        )}{" "}
        Ξ
        </Typography>
       
       
      </CardContent>
    
    </Card>
   </Link>
  </CardActionArea></>
       ):(<Loading/>)}
      
    
     </>
    );
 
}

export default NFTHighlights;
