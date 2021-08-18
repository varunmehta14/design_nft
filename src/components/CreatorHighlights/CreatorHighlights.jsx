import React,{useState,useEffect} from "react";
import Color from 'color';
//import GoogleFont from 'react-google-font-loader';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Divider from '@material-ui/core/Divider';
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';

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
      display:"flex",
      justifyContent:"space-between"
     
    };
  },
  title: {
    fontFamily: 'fantasy',
    fontSize: '2rem',
    color: 'alicewhite',
  //  textTransform: 'uppercase',
  },
  subtitle: {
   // fontFamily: 'Montserrat',
    color: 'black',
    opacity: 0.87,
   // marginTop: '2rem',
    fontWeight: 500,
    fontSize: 14,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const CreatorHighlights=(props)=>{

  const [myBoughtCryptoBoys, setMyBoughtCryptoBoys] = useState(0);
  const [myMintedCryptoBoys, setMyMintedCryptoBoys] = useState(0);
  useEffect(() => {
   
    
    const my_bought_crypto_boys = props.designs.filter(
      (cryptoboy) => cryptoboy.currentOwner === props.user.userAddress && !(cryptoboy.mintedBy === props.user.userAddress)
    );
    setMyBoughtCryptoBoys(my_bought_crypto_boys.length);
    const my_minted_crypto_boys = props.designs.filter(
      (cryptoboy) => cryptoboy.mintedBy ===  props.user.userAddress 
    );
    setMyMintedCryptoBoys(my_minted_crypto_boys.length);
    
  }, [props.designs]);
  const handleClick=()=>{
    window.open(`https://www.instagram.com/${props.user.userSocial}/`,"_blank")
  }
  const handleClick2=()=>{
    window.open(props.user.userRepo,"_blank")
  }
  const classes = useStyles();
  
  return (
    <CardActionArea className={classes.actionArea}>
        <Link to={`/their-tokens/${props.user.userAddress}`}style={{textDecorationLine:"none"}} onClick={() => window.location.href=`/their-tokens/${props.user.userAddress}`}>
    <Card className={classes.card}>
      {/* <CardMedia  classes={mediaStyles} image={props.user.avatarhash} /> */}
    
   {/* </CardMedia> */}
      <CardContent className={classes.content}>
        {/* <div style={{backgroundColor:"black"}}> */}
        <div style={{display:"flex",justifyContent:"center"}}>
      <Avatar alt={props.user.userName} src={props.user.userAvatarHash} className={classes.large}/>
      </div>
        {/* </div> */}
        <div style={{display:"flex",justifyContent:"center"}}>
        <Typography className={classes.title} variant={'h2'} style={{color:"aliceblue",textTransform:"none"}}>
          {props.user.userName}
        </Typography>
        </div>
        <hr style={{borderColor:"aliceblue",borderWidth:"thin"}}/>
        <div style={{display:"flex",justifyContent:"space-around"}}>
          <div style={{textAlign:"center"}}>
        <Typography className={classes.subtitle}style={{color:"aliceblue"}}>CREATIONS</Typography>
        <Typography className={classes.title} variant={'h2'} style={{color:"aliceblue",textTransform:"none"}}>
          {myMintedCryptoBoys}
        </Typography>
        </div>
        <Divider orientation="vertical" flexItem style={{backgroundColor:"aliceblue",borderWidth:"thin"}}/>
        <div style={{textAlign:"center"}}>
        <Typography className={classes.subtitle}style={{color:"aliceblue"}}>BOUGHT</Typography>
        <Typography className={classes.title} variant={'h2'} style={{color:"aliceblue",textTransform:"none"}}>
          {myBoughtCryptoBoys}
        </Typography>
        </div>
        </div>
        {/* <Typography className={classes.subtitle}style={{color:"aliceblue",textTransform:"none"}}>
         <ContactMailIcon/>&nbsp;{props.user.userEmail}
        </Typography> */}
      </CardContent>
      <CardActions className={classes.content2}disableSpacing>
        <IconButton aria-label="instagram" onClick={handleClick} >
          <InstagramIcon />
        </IconButton>
        <IconButton aria-label="instagram" onClick={handleClick2} >
          <WorkTwoToneIcon />
        </IconButton>
        </CardActions>
    </Card>
    </Link>
  </CardActionArea>
  );
}
export default CreatorHighlights;