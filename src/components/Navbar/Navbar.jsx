import React,{useState} from "react";
//import icon from "./favicon-32x32.png";
import icon from "./digitartlogo.png";
import { Link } from "react-router-dom";
import {  makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import StoreIcon from '@material-ui/icons/Store';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BorderColorSharpIcon from '@material-ui/icons/BorderColorSharp';
import ChatIcon from '@material-ui/icons/Chat';
import metamaskIcon from "./metamask.svg";
import MuseumIcon from '@material-ui/icons/Museum';
import Avatar from '@material-ui/core/Avatar';

import Fuse from 'fuse.js';


import CancelIcon from '@material-ui/icons/Cancel';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      color: "#e8e2e2"
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "aliceblue",
    opacity:0.7,
    zIndex:5,
    '&:hover': {
      backgroundColor: "aliceblue",
      opacity:1,
      zIndex:5
    },
    marginLeft: 0,
    width: '100%',
  
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:"black"
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  expanded:{
    width:"75%",
    marginLeft:"2%"
  },
  collapsed:{
    width:"2%",
    marginLeft:"4px",
    display:"none"
  },
  expandedIcon:{
    display:"none",
    
  },
  collapsedIcon:{
    marginLeft:"2px",
    color:"aliceblue"
  },
  expanded1:{
    width:"-webkit-fill-available",
    marginLeft:"2%"
  },
  collapsed1:{
    width:"2%",
    marginLeft:"4px",
    display:"none"
  },
  expandedIcon1:{
    display:"none",
    
  },
  collapsedIcon1:{
    marginLeft:"2px",
    color:"white"
  },
  suggestions:{
    borderLeft:"1px solid white ",
    borderRight:"1px solid white",
    borderBottom:"1px solid white",
    //borderTop:"1px solid black",
    //borderColor:"white",
    '&:hover':{
      backgroundColor:"gray" ,
      color:"white"
    }
  },
//  searchbox:{
//    backgroundColor:"white",
//    color:"white",
//  },
//  searchText:{
//    color:"black",
//  }
notBlurredCard:{
  position:"absolute",zIndex:10,backgroundColor:"aliceblue",color:"black",borderRadius:"15px",top:"100%",
  // [theme.breakpoints.down('sm')]: {
  //   width: '70%',
  // },
  
  // [theme.breakpoints.down('md')]: {
  //   width: '50%',
  // },
  
  // [theme.breakpoints.down('lg')]: {
  //   width: '66%',
  // },
  width:"50%"
  
},
BlurredCard:{
  position:"absolute",zIndex:-1,backgroundColor:"aliceblue",color:"black",borderRadius:"15px",top:"100%"
}
}));



const Navbar = ({connectToMetamask,
  metamaskConnected,
  userLoggedIn,
  currentUser,
  searchTermfromApp,
  searchData,
  cryptoBoys,
  searchNFTFromApp}) => {
  // const allData=[...cryptoBoys,...searchData];
  // allData.forEach((item,i)=>{
  //   item.id=i+1;
  // });
  // console.log(allData)
  console.log(currentUser)
 const fuse1=new Fuse(searchData,{
   keys:[
     "userName"
   ],
   includeScore:true
 })
 let tokens=cryptoBoys.map((cryptoBoy)=>{return cryptoBoy[0]});
 const result = [];
const map = new Map();
for (const item of tokens) {
    if(!map.has(item.name)){
      if(!map.has(item.price.toString())){
        // map.set(item.name, true);
        map.set(item.price.toString(), true);    // set any value to Map
        result.push(
            item
        );
      }
        
    }
    
}
 const fuse2=new Fuse(tokens,{
  keys:[
    "name"
  ],
  includeScore:true
})
// let finalSet=new Set();
// let filterArray=[];

// let filteredName = new Set(tokens.map((item)=>item.name));
// console.log("filtername",filteredName)
// filteredName.forEach((i)=>{
//   filterArray=tokens.filter((item)=>item.name===i);
//   console.log("filterArray",filterArray)
//   finalSet[i]=new Set();
//   if(filterArray){
//     filterArray.forEach(it=>{finalSet[i].add(it.price.toString(),it.tokenId.toNumber());
//     })
//   }

// });
//  console.log("tokens",to);

console.log("result",result)

const classes = useStyles();
const [anchorEl, setAnchorEl] = useState(null);
//const [metamaskConnected,setMetamaskConnected]=useState(false);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =useState(null);
const [search,setSearch]=useState("");
const isMenuOpen = Boolean(anchorEl);
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
const [expanded,setExpanded]=useState(false);
const [expanded1,setExpanded1]=useState(false);
const [collapsed,setCollapsed]=useState(true);
const [collapsed1,setCollapsed1]=useState(true);
const [text,setText]=useState(null);
const [results,setResults]=useState([]);
const [userSuggestions,setUserSuggestions]=useState([]);
const [tokenSuggestions,setTokenSuggestions]=useState([]);



const handleProfileMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMobileMenuClose = () => {
  setMobileMoreAnchorEl(null);
};

const handleMenuClose = () => {
  setAnchorEl(null);
  handleMobileMenuClose();
};

const handleSearchSubmit=(e,val)=>{
e.preventDefault();
setUserSuggestions([]);setTokenSuggestions([]);
console.log("form submitted", val)
searchTermfromApp(val)
}

const handleSearchSubmit2=(e,val,id)=>{
  e.preventDefault();
  setUserSuggestions([]);setTokenSuggestions([]);
  console.log("form submitted", val)
  searchNFTFromApp(val,id)
  }
// const connectToMetamask = async () => {
  
//   await window.ethereum.enable();
//  setMetamaskConnected( true );
//   window.location.reload();
// };

const handleMobileMenuOpen = (event) => {
  setMobileMoreAnchorEl(event.currentTarget);
};

const onChangeHandler=(text)=>{
  

  let matchUserName=[];
  let matchTokenName=[];
  
  if(text.length>0){
  
      
    const resultsUser=fuse1.search(text);
    console.log(resultsUser)
    matchUserName=resultsUser.map(result=>result.item);
    const resultsDesign=fuse2.search(text);
    matchTokenName=resultsDesign.map(result=>result.item);

  }
  
  console.log("matchUserName",matchUserName)
  console.log("matchTokenName",matchTokenName)
  setUserSuggestions(matchUserName);
  setTokenSuggestions(matchTokenName);
  setText(text)
}

const menuId = 'primary-search-account-menu';
const renderMenu = (
      <>
  <div className={classes.grow} >
      <AppBar position="static" style={{fontSize:"5 px" ,display:"flex",
    backgroundImage: "linear-gradient(15deg, #80d0c7 0%, #13547a 100%)"}}>
        <Toolbar>
          <IconButton href="/">
        {/* <img src={icon} alt="" style={{width:"32px",height:"32px"}}/> */}
        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/digital-art-2201596-1836510.png" alt="" style={{width:"32px",height:"32px"}}/>
        </IconButton>
          <Typography className={classes.title} variant="h6" noWrap style={{fontFamily:"inherit",color:"black"}}>
            Digitart
          </Typography>
         
          <div className={classes.grow} />
         
           
      
  
        {expanded1?(<div  style={{display:"flex",justifyContent:"flex-end",width:"50%" }} >
        <IconButton onClick={()=>{setExpanded1(false);setText(null);setUserSuggestions([]);setTokenSuggestions([])}} className={classes.collapsedIcon1}>
       <CancelIcon/> </IconButton>
          <div style={{width:"100%"}}>
          <input placeholder="Search NFT or people" type="search" className="col-md-12 input"  onChange={(e)=>{onChangeHandler(e.target.value)}} value={text}
        style={{borderRadius:"40px",color:"black",backgroundColor:"white",height:"45px"}}/>
          
          {userSuggestions.length!=0 ||tokenSuggestions.length!=0?(
          <div   className="card col-md-12 justify-content-md-center" className={classes.notBlurredCard} > 
       
          <div className="card-body" >
          {userSuggestions.length!=0?(
             <div style={{maxHeight:"25vh",overflow:"auto"}}>
           
             <h4>Creators</h4>
             {userSuggestions&&userSuggestions.map((result,i)=>
              <div key={i}className={classes.suggestions}onClick={(e)=>{setText(result.userName);handleSearchSubmit(e,result.userName)}} style={{cursor:"pointer",paddingTop:"1px",paddingBottom:"1px",padding:"4px",borderRadius:"2px",display:"flex",alignItems:"center",overflowWrap:"break-word"}}>
               <Avatar alt={result.userName} src={result.userAvatarHash}/><b>@{result.userName}</b>
              </div>
             )}
             </div>
          ):(null)}
          <hr/>
           {tokenSuggestions.length!=0?( 
           <div style={{maxHeight:"25vh",overflow:"auto"}}>
            <h4>Designs</h4>
             {tokenSuggestions&&tokenSuggestions.map((result,i)=>
             <div key={i}className={classes.suggestions} onClick={(e)=>{setText(result.name);handleSearchSubmit2(e,result.name,result.tokenId)}} style={{cursor:"pointer",paddingTop:"1px",padding:"4px",paddingBottom:"1px",borderRadius:"2px",display:"flex",alignItems:"center",overflowWrap:"break-word"}}>
               <img alt={result.name} src={`https://ipfs.infura.io${result.metadata.image}`}style={{objectFit:"contain",borderRadius:0,width:"45px",height:"45px",display:"flex",alignItems:"center",postion:"relative"}}/><b>@{result.name}</b>
             </div>
            )}
            </div>
             ):(null)}
           </div>
      
       
        </div>):(null)}
          </div>
        
        
          
          </div>
          
        ):( 
        <div >
          <IconButton onClick={()=>{setExpanded1(true)}} className={classes.collapsedIcon1}>
        <SearchIcon /> </IconButton>
        </div>
      
        )}
         
           
          <div className={classes.sectionDesktop}>
           
              <Link to="/mint" className="nav-link" style={{fontFamily:"Nunito Sans",alignSelf:"center",fontSize:"larger",fontWeight:"100",boxShadow: "0px -1px 20px 0px rgb(0 0 0 / 15%)",
    borderRadius: "20px",margin:"2px",color:"white"}}>
                Create
              </Link>
              
              <Link to="/creators" className="nav-link" style={{fontFamily:"Nunito Sans",alignSelf:"center",fontSize:"larger",fontWeight:"100",boxShadow: "0px -1px 20px 0px rgb(0 0 0 / 15%)",
    borderRadius: "20px",margin:"2px",color:"white"}}>
                Creators
              </Link>
            
              <Link to="/marketplace" className="nav-link" style={{fontFamily:"Nunito Sans",alignSelf:"center",fontSize:"larger",fontWeight:"100",boxShadow: "0px -1px 20px 0px rgb(0 0 0 / 15%)",
    borderRadius: "20px",margin:"2px",color:"white"}}>
                Marketplace
              </Link>
            
            
              <Link to="/my-tokens" className="nav-link" style={{fontFamily:"Nunito Sans",alignSelf:"center",fontSize:"larger",fontWeight:"100",boxShadow: "0px -1px 20px 0px rgb(0 0 0 / 15%)",
    borderRadius: "20px",margin:"2px",color:"white"}}>
                My Tokens
              </Link>
            
              {/* <Link to="/chat" className="nav-link" style={{color: "#e8e2e2",alignSelf:"center"}}>
              <ChatIcon/>
              </Link> */}

              {!metamaskConnected ? (
              <Button
        onClick={connectToMetamask}
        variant="contained"
        className="nav-link"  
      >
        Connect Metamask{" "}
        <img
          src={metamaskIcon}
          alt="metamask-icon"
          style={{ width: "2rem", marginLeft: "0.5rem" }}
        />
      </Button>):null}
      {!currentUser.userName?( <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
             <AccountCircle />
            </IconButton>):(<IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
               <Avatar alt={currentUser.userName} src={currentUser.userAvatarHash}/>
            </IconButton>)}
             
          </div>
       
        </Toolbar>
      </AppBar>
      
      <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    {console.log(currentUser)}
    {!currentUser.userName?( <MenuItem onClick={handleMenuClose}><Link to="/profile" className="nav-link" >
    Profile
              </Link></MenuItem>):(   <MenuItem onClick={handleMenuClose}><Link to="/account" className="nav-link" >
    My account
              </Link></MenuItem>)}
  </Menu>
    </div>
  
  </>
  
);

const mobileMenuId = 'primary-search-account-menu-mobile';
const renderMobileMenu = (
  <>
  <div className={classes.grow} >
      <AppBar position="static" style={{fontSize:"5 px",backgroundImage: "linear-gradient(15deg, #80d0c7 0%, #13547a 100%)" }}>
        <Toolbar>
          <IconButton href="/">
        {/* <img src={icon} alt="" style={{width:"32px",height:"32px"}}/> */}
        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/digital-art-2201596-1836510.png" alt="" style={{width:"32px",height:"32px"}}/>
        </IconButton>
         
        
          <div className={classes.grow} />
          {expanded1?(<div  style={{display:"flex",justifyContent:"flex-end",width:"50%"}}>
        <IconButton onClick={()=>{setExpanded1(false);setText(null);setUserSuggestions([]);setTokenSuggestions([])}} className={classes.collapsedIcon1}>
       <CancelIcon/> </IconButton>
          <div style={{width:"100%"}}>
          <input placeholder="Search NFT or people" type="search" className="col-md-12 input"  onChange={(e)=>{onChangeHandler(e.target.value)}} value={text}
        style={{borderRadius:"40px",color:"black",backgroundColor:"azure",height:"45px"}}/>
          
          {userSuggestions.length!=0 ||tokenSuggestions.length!=0?(
          <div   className="col-md-12 justify-content-md-center" className={classes.notBlurredCard}> 
       
          <div className="card-body" >
          {userSuggestions.length!=0?(
             <div style={{maxHeight:"25vh",overflow:"auto"}}>
           
             <h4>Users</h4>
             {userSuggestions&&userSuggestions.map((result,i)=>
              <div key={i}className={classes.suggestions}onClick={(e)=>{setText(result.userName);handleSearchSubmit(e,result.userName)}} style={{cursor:"pointer",paddingTop:"1px",paddingBottom:"1px",padding:"4px",borderRadius:"2px",display:"flex",alignItems:"center"}}>
               <Avatar alt={result.userName} src={result.userAvatarHash}/><b>@{result.userName}</b>
              </div>
             )}
             </div>
          ):(null)}
          <hr/>
           {tokenSuggestions.length!=0?( 
           <div style={{maxHeight:"25vh",overflow:"auto"}}>
            <h4>Designs</h4>
             {tokenSuggestions&&tokenSuggestions.map((result,i)=>
             <div key={i}className={classes.suggestions} onClick={(e)=>{setText(result.name);handleSearchSubmit2(e,result.name,result.tokenId);setUserSuggestions([]);setTokenSuggestions([])}} style={{cursor:"pointer",paddingTop:"1px",padding:"4px",paddingBottom:"1px",borderRadius:"2px",display:"flex",alignItems:"center"}}>
               <img alt={result.name} src={`https://ipfs.infura.io${result.metadata.image}`}style={{objectFit:"contain",borderRadius:0,width:"45px",height:"45px",display:"flex",alignItems:"center",postion:"relative"}}/><b>@{result.name}</b>
             </div>
            )}
            </div>
             ):(null)}
           </div>
      
       
        </div>):(null)}
          </div>
        
        
          
          </div>
          
        ):( 
        <div style={{transition: "all ease-in-out 0.3s"}}>
          <IconButton onClick={()=>{setExpanded1(true)}} className={classes.collapsedIcon1}>
        <SearchIcon /> </IconButton>
        </div>)}
          <div className={classes.sectionMobile}>
          
            {!metamaskConnected ? (
             <Button
        onClick={connectToMetamask}
      
      >
       
        <img
          src={metamaskIcon}
          alt="metamask-icon"
          style={{ width: "2rem", marginLeft: "0.5rem" }}
        />
      </Button>):null}
      {!currentUser.userName?( <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
             <AccountCircle />
            </IconButton>):(<IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
               <Avatar alt={currentUser.userName} src={currentUser.userAvatarHash}/>
            </IconButton>)}
             
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />

            </IconButton>

            <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    {console.log(currentUser)}
    {!currentUser.userName?( <MenuItem onClick={handleMobileMenuClose}><Link to="/profile" className="nav-link" >
    Profile
              </Link></MenuItem>):(   <MenuItem onClick={handleMobileMenuClose}><Link to="/account" className="nav-link" >
    My account
              </Link></MenuItem>)}
   
 
  </Menu>
          </div>
        </Toolbar>
      </AppBar>
     
    </div>
    <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    <MenuItem onClick={handleMobileMenuClose}>
    <Link to="/creators" style={{textDecorationLine:"none"}} >
      <div style={{display:"flex",alignItems:"center" }}>
      <IconButton  color="inherit">
       
      <PeopleAltIcon/>
       
      </IconButton>
      <>Creators</>
      </div>
      </Link>
    </MenuItem>
    
    <MenuItem onClick={handleMobileMenuClose}>
    <Link to="/mint" style={{textDecorationLine:"none"}} >
      <div style={{display:"flex",alignItems:"center" }}>
      <IconButton  color="inherit">
      <BorderColorSharpIcon/>
      </IconButton>
      <>Create</>
      </div>
      </Link>
    </MenuItem>
    
    <MenuItem onClick={handleMobileMenuClose}>
    <Link to="/marketplace" style={{textDecorationLine:"none"}} >
      <div style={{display:"flex",alignItems:"center" }}>
      <IconButton  color="inherit">
      <StoreIcon/>
      </IconButton>
      <>Market place</>
      </div>
      </Link>
    </MenuItem>
    <MenuItem onClick={handleMobileMenuClose}>
    <Link to="/my-tokens" style={{textDecorationLine:"none"}} >
      <div style={{display:"flex",alignItems:"center" }}>
      <IconButton  color="inherit">
      <MuseumIcon/>
      </IconButton>
      <>My Items</>
      </div>
      </Link>
    </MenuItem>
  
  </Menu>
  </>
); 
  return (
    <div className={classes.grow}>
     <div className={classes.sectionMobile}>
      {renderMobileMenu}
      </div>
      <div className={classes.sectionDesktop}>
      {renderMenu}
    </div>
    </div>
  );
};

export default Navbar;
