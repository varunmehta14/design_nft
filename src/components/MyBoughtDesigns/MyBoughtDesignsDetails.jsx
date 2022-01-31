import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Paper} from '@material-ui/core';
import { Link } from "react-router-dom";
import Color from 'color';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';

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
  contentNotSold: ({ color }) => {
    return {
      backgroundColor: "#203f52",
      padding: '1rem 1.5rem 1.5rem',
    };
  },
  contentSold: ({ color }) => {
    return {
      backgroundColor: "#A30000",
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
    //marginTop: '2rem',
    padding:"0.5%",
    fontWeight: 500,
    fontSize: 14,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));
const MyBoughtDesignsDetails= ({callback1,cryptoboy,accountAddress}) => {
  const classes = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const handleClick=(tokID)=>{
    console.log(tokID)
     callback1(tokID)
     
    }

console.log(cryptoboy)
  return (
  <>
   <CardActionArea className={classes.actionArea}>
   <Link to={`/nftDetails/${cryptoboy.tokenId}`} onClick={()=>{handleClick(cryptoboy.tokenId)}}style={{textDecorationLine:"none"}}>
    <Card className={classes.card}>
    <CardMedia  classes={mediaStyles} image={`https://ipfs.infura.io${cryptoboy.metadata.image}`}style={{backgroundSize:"contain"}} /> 
     
          <CardActions className={classes.contentNotSold}disableSpacing>
          <div style={{display:"flex"}}>
            <Typography className={classes.title} variant={'h2'} style={{color:"aliceblue",textTransform:"none"}}>
            {cryptoboy.metadata.name}
            </Typography>
            </div>
            </CardActions>
     
      
    
      <CardContent className={classes.content2}>
        <div className={classes.subtitle}>
          Token Id:   
         {cryptoboy.tokenId}
      
        </div>
        <hr/>
        <div className={classes.subtitle}>
          No. of Transfer:   
          {cryptoboy.numberOfTransfers}
      
        </div>
       
        <hr/>
        Price
        <Typography className={classes.title} variant={'h4'} style={{color:"black",textTransform:"none"}}title={cryptoboy.metadata.customToken}>
        {window.web3.utils.fromWei(
          cryptoboy.price.toString(),
          "Ether"
        )}{" "}
        {/* {cryptoboy.price}{" "} */}
        {cryptoboy.metadata.customToken}
        {/* Ξ */}
        </Typography>
      </CardContent>
     
    </Card>
    </Link>
  </CardActionArea></>
  );
};

export default MyBoughtDesignsDetails;
