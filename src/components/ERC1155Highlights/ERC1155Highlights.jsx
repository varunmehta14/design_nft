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
const ERC1155Highlights=(props)=> {
  const classes = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  console.log(props)
    
     const [mintedByName,setMintedByName]=useState(props.cryptoboy[0].mintedBy) 
     const [mintedAvatar,setMintedAvatar]=useState(null) 
     const [ownedByName,setOwnedByName]=useState(null) 
      const [ownedAvatar,setOwnedAvatar]=useState(null) 
    const [ownedAddress,setOwnedAddress]=useState(null)
     
      const getCurrentUser=async()=>{
      //  if(props.usersContract&&props.users&&props.erc1155contract){
      //    //const currentMinted=await props.users.find((user)=>user.userAddress===props.cryptoboy[0].mintedBy);
      //   // console.log("Current using array",currentMinted)
      //    console.log(props)
      //     //  const currentMinted=await props.usersContract.methods
      //     //  .allUsers(props.cryptoboy[0].mintedBy)
      //     //  .call();
      //     // setMintedByName(currentMinted[1]);
      //     // setMintedAvatar(currentMinted[6]);
      //     // //const currentOwned=await props.users.find((user)=>user.userAddress===props.cryptoboy[0].currentOwner);
      //     //  const currentOwned=await props.usersContract.methods
      //     // .allUsers(props.cryptoboy[0].currentOwner)
      //     //  .call();
      //     // setOwnedByName(currentOwned[1]);
      //     // setOwnedAvatar(currentOwned[6]);
      //   }
        
        UserDataService.getByAddress(props.cryptoboy[0].mintedBy)
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
        console.log(props.erc1155contract);
        if(props.erc1155contract){
        const currentOwned=await props.erc1155contract.methods
        .tokenIdToAdd(props.cryptoboy[0].tokenId)
        .call()
        setOwnedAddress(currentOwned)
        console.log("Current owned",currentOwned)
        UserDataService.getByAddress(currentOwned)
        .then(response => 
          { 
            console.log(response);
            setOwnedByName(response.data.data[0].userName)
            setOwnedAvatar(response.data.data[0].userAvatarHash)

          
          })
          //  setSubmitted(true);
         // console.log(response.data);
        
        
        .catch(e => {
          console.log(e);
        });
      }
        
      }
      useEffect(()=>{
        
          getCurrentUser();
        
       
      },[props.erc1155contract,props.cryptoboy[0]]);
console.log(mintedByName,ownedByName)

//   callChangeTokenPriceFromApp = (tokenId, newPrice) => {
//     props.changeTokenPrice(tokenId, newPrice);
//   };
  const handleClick=(address)=>{
    props.callbackFromParent(address)
   
    console.log(address)
  }

  
    //console.log(props.cryptoboy[0].imageHash)
    //console.log(props.toggleForSale)
    return (
      <>
       {props.cryptoboy[0]&&ownedAddress?(
         <>
         <CardActionArea className={classes.actionArea}>
      <Link to={`/multiDetails/${props.cryptoboy[0].tokenId}`} onClick={()=>handleClick(props.cryptoboy[0].tokenId)}style={{textDecorationLine:"none"}}>
    <Card className={classes.card}>
      <CardMedia  classes={mediaStyles} image={props.cryptoboy[0].image} style={{backgroundSize:"contain"}}/> 
    
      <CardActions className={classes.content}disableSpacing>
      <div style={{display:"flex"}}>
        <Typography className={classes.title} variant={'h2'} style={{color:"aliceblue",textTransform:"none"}}>
        {props.cryptoboy[0].name}
        </Typography>
        </div>
        </CardActions>
      <CardContent className={classes.content2}>
     
        
        <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
        <span className="font-weight-bold">Created By :&nbsp;</span>
        <Link to={`/their-tokens/${props.cryptoboy[0].mintedBy}`} onClick={()=>{handleClick(props.cryptoboy[0].mintedBy); window.location.href=`/their-tokens/${props.cryptoboy[0].mintedBy}`}}style={{textDecorationLine:"none"}}>
          
          {!(mintedByName=="")?(<div style={{display:"flex",alignItems:"center",fontWeight:"bolder"}}> <Avatar alt={mintedByName} src={mintedAvatar}/>&nbsp;@{mintedByName}  <br/>
          <>&nbsp;Creator</></div>):(<>{props.cryptoboy[0].mintedBy.substr(0, 5) +
              "..." +
              props.cryptoboy[0].mintedBy.slice(
                props.cryptoboy[0].mintedBy.length - 5  )}<br/>
          <>&nbsp;Creator</></>)}
          </Link>
        
      </div>
        <hr style={{borderWidth:"thin"}}/>
      
       
     
      <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
        <span className="font-weight-bold">Owned By :&nbsp;</span>
        <Link to={`/their-tokens/${ownedAddress}`} onClick={()=>{handleClick(ownedAddress); window.location.href=`/their-tokens/${ownedAddress}`}}style={{textDecorationLine:"none"}}> 
        {/* {ownedAddress.substr(0, 5) +
          "..." +
          ownedAddress.slice(
            ownedAddress.length - 5
          )} */}
          {!(ownedByName=="")?(<div style={{display:"flex",alignItems:"center",fontWeight:"bolder"}}> <Avatar alt={ownedByName} src={ownedAvatar}/>&nbsp;@{ownedByName} <br/>
          <>&nbsp;Owner</></div>):(<>
          {ownedAddress.substr(0, 5) +
              "..." +
              ownedAddress.slice(
                ownedAddress.length - 5
              )}
              <br/>
              <>&nbsp;Owner</></>)}
          </Link>
      </div>
        <hr/>
        Price
        <Typography className={classes.title} variant={'h4'} style={{color:"black",textTransform:"none"}}>
        {window.web3.utils.fromWei(
          props.cryptoboy[0].price.toString(),
          "Ether"
        )}
        {" "}
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

export default ERC1155Highlights;
