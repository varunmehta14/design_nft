import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Color from 'color';
import CardActions from '@material-ui/core/CardActions';
import Loading from "../Loading/Loading";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles'
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
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
      // backgroundColor: "aliceblue",
     
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
    
      const [mintedByName,setMintedByName]=useState(props.cryptoboy[0].mintedBy) 
      const [mintedAvatar,setMintedAvatar]=useState(null) 
      const [ownedByName,setOwnedByName]=useState(props.cryptoboy[0].currentOwner) 
      const [ownedAvatar,setOwnedAvatar]=useState(null) 
   
      // get name and avatar of the designer and owner
      const getCurrentUser=async()=>{
        
        UserDataService.getByAddress(props.cryptoboy[0].mintedBy)
        .then(response => 
          { 
            console.log(response);
            setMintedByName(response.data.data[0].userName)
            setMintedAvatar(response.data.data[0].userAvatarHash)

        })
        .catch(e => {
          console.log(e);
        });
        UserDataService.getByAddress(props.cryptoboy[0].currentOwner)
        .then(response => 
          { 
            console.log(response);
            setOwnedByName(response.data.data[0].userName)
            setOwnedAvatar(response.data.data[0].userAvatarHash)

          })
    
        
        
        .catch(e => {
          console.log(e);
        });
        
      }
      useEffect(()=>{
        
          getCurrentUser();

        },[props.cryptoboy[0]]);


  const handleClick=(address)=>{
    props.callbackFromParent(address)
   
    console.log(address)
  }

    return (
      <>
       {props.cryptoboy[0]?(
         <>
         <CardActionArea className={classes.actionArea}>
      <Link to={`/nftDetails/${props.cryptoboy[0].tokenId}`} onClick={()=>handleClick(props.cryptoboy[0].tokenId)}style={{textDecorationLine:"none"}}>
    <Card className={classes.card}>
      <CardMedia  classes={mediaStyles} image={props.cryptoboy[0].metadata.image} style={{backgroundSize:"contain"}}/> 
    
      <CardActions className={classes.content}disableSpacing>
      <div style={{display:"flex"}}>
        <Typography className={classes.title} variant={'h2'} style={{color:"white",textTransform:"none"}}>
        {props.cryptoboy[0].metadata.name}
        </Typography>
        </div>
        </CardActions>
      <CardContent className={classes.content2}>
     
        
        <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
       
        <Link to={`/their-tokens/${props.cryptoboy[0].mintedBy}`} onClick={()=>{handleClick(props.cryptoboy[0].mintedBy); window.location.href=`/their-tokens/${props.cryptoboy[0].mintedBy}`}}style={{textDecorationLine:"none"}}>
          
          {!(mintedByName==="")?(<div style={{display:"flex",alignItems:"center",fontWeight:"bolder"}}> <Avatar alt={mintedByName} src={mintedAvatar}/>&nbsp;@{mintedByName}  <br/>
          <>&nbsp;Creator</></div>):(<>{props.cryptoboy[0].mintedBy.substr(0, 5) +
              "..." +
              props.cryptoboy[0].mintedBy.slice(
                props.cryptoboy[0].mintedBy.length - 5  )}<br/>
          <>&nbsp;Creator</></>)}
          </Link>
        
      </div>
        <hr style={{borderWidth:"thin"}}/>
      
       
     
      <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
       
        <Link to={`/their-tokens/${props.cryptoboy[0].currentOwner}`} onClick={()=>{handleClick(props.cryptoboy[0].currentOwner); window.location.href=`/their-tokens/${props.cryptoboy[0].currentOwner}`}}style={{textDecorationLine:"none"}}> 
      
          {!(ownedByName==="")?(<div style={{display:"flex",alignItems:"center",fontWeight:"bolder"}}> <Avatar alt={ownedByName} src={ownedAvatar}/>&nbsp;@{ownedByName} <br/>
          <>&nbsp;Owner</></div>):(<>{props.cryptoboy[0].currentOwner.substr(0, 5) +
              "..." +
              props.cryptoboy[0].currentOwner.slice(
                props.cryptoboy[0].currentOwner.length - 5
              )}<br/>
              <>&nbsp;Owner</></>)}
          </Link>
      </div>
        <hr/>
        Price
        <Typography className={classes.title} variant={'h4'} style={{color:"black",textTransform:"none"}}title={props.cryptoboy[0].metadata.customToken}>
        {/* {window.web3.utils.fromWei(
          props.cryptoboy[0].price.toString(),
          "Ether"
        )} */}
         {props.cryptoboy[0].price}{" "}
         {props.cryptoboy[0].metadata.customToken}
        {/* Ξ */}
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
