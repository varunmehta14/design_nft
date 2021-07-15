import React from "react";
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
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

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

const CreatorHighlights=(props)=>{
  const handleClick=()=>{
    window.open(`https://www.instagram.com/${props.user.social}/`,"_blank")
  }
  const classes = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea className={classes.actionArea}>
        <Link to={`/their-tokens/${props.user.userAddress}`}style={{textDecorationLine:"none"}}>
    <Card className={classes.card}>
      {/* <CardMedia  classes={mediaStyles} image={props.user.avatarhash} /> */}
    
   {/* </CardMedia> */}
      <CardContent className={classes.content}>
        {/* <div style={{backgroundColor:"black"}}> */}
        <div style={{display:"flex",justifyContent:"center"}}>
      <Avatar alt={props.user.userName} src={props.user.avatarhash} className={classes.large}/>
      </div>
        {/* </div> */}
        <div style={{display:"flex",justifyContent:"center"}}>
        <Typography className={classes.title} variant={'h2'} style={{color:"aliceblue",textTransform:"none"}}>
          {props.user.userName}
        </Typography>
        </div>
        <hr style={{borderColor:"aliceblue",borderWidth:"thin"}}/>
        <Typography className={classes.subtitle}style={{color:"aliceblue"}}>{props.user.bio}</Typography>
      </CardContent>
      <CardActions className={classes.content2}disableSpacing>
        <IconButton aria-label="instagram" onClick={handleClick} >
          <InstagramIcon />
        </IconButton>
        </CardActions>
    </Card>
    </Link>
  </CardActionArea>
  );
}
export default CreatorHighlights;