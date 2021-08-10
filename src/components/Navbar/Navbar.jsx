import React,{useState} from "react";
//import icon from "./favicon-32x32.png";
import icon from "./digitartlogo.png";
import { Link } from "react-router-dom";
import {  alpha,makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import StoreIcon from '@material-ui/icons/Store';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BorderColorSharpIcon from '@material-ui/icons/BorderColorSharp';
import MoreIcon from '@material-ui/icons/MoreVert';
import metamaskIcon from "./metamask.svg";
import MuseumIcon from '@material-ui/icons/Museum';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import PersonIcon from '@material-ui/icons/Person';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
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
    color:"aliceblue"
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



const Navbar = ({connectToMetamask,metamaskConnected,userLoggedIn,currentUser,searchTermfromApp,searchAllResultsFromApp,searchData,cryptoBoys,searchNFTFromApp}) => {
  // const allData=[...cryptoBoys,...searchData];
  // allData.forEach((item,i)=>{
  //   item.id=i+1;
  // });
  // console.log(allData)
 const fuse1=new Fuse(searchData,{
   keys:[
     "userName"
   ],
   includeScore:true
 })
 const fuse2=new Fuse(cryptoBoys,{
  keys:[
    "tokenName"
  ],
  includeScore:true
})

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
const [blurred,setBlurred]=useState(true);
const [zindex,setZindex]=useState(10);

const userData={
  options:searchData,
  getOptionLabel:(option)=>option.userName,
};
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
const searchTerm=(key)=>{
searchAllResultsFromApp(key);
}
const handleSearchSubmit2=(e,val)=>{
  e.preventDefault();
  setUserSuggestions([]);setTokenSuggestions([]);
  console.log("form submitted", val)
  searchNFTFromApp(val)
  }
// const connectToMetamask = async () => {
  
//   await window.ethereum.enable();
//  setMetamaskConnected( true );
//   window.location.reload();
// };

const handleMobileMenuOpen = (event) => {
  setMobileMoreAnchorEl(event.currentTarget);
};
const handleOnSearch = (string, results) => {
  // onSearch will have as the first callback parameter
  // the string searched and for the second the results.
  //setSearch(string)
 //searchTermfromApp(search)
  console.log(string, results)
  setResults(results)
}

const handleOnHover = (result) => {
  // the item hovered
  console.log(result)
}

const handleOnSelect = (item) => {
  // the item selected
  
  console.log(item)
 setSearch(item.userName)
}
const handleOnSelect2 = (item) => {
  // the item selected
  
  console.log(item)
 setSearch(item.tokenName)
}

const handleOnFocus = () => {
  console.log('Focused')
  
}
const handleOnClear = () => {
  console.log("Cleared");
  setExpanded(!expanded);
  setCollapsed(!collapsed);
  setResults([]);
};
const handleOnClear1 = () => {
  console.log("Cleared");
  setExpanded1(!expanded1);
  setCollapsed1(!collapsed1);
};

// function escapeRegExp(string) {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
// }
const onChangeHandler=(text)=>{
  
// var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
// let canUse;
// if(format.test(text)){
//   console.log( "true");
//   canUse=false;
//   alert("Cannot use special Character");
//   setText(" ");
// } else {
//   console.log( "false");
//   canUse=true;
// }
  let matchUserName=[];
  let matchTokenName=[];
  //escapeRegExp(text);
  if(text.length>0){
  
      // text = new RegExp("\\\\", "g");
      // text=text.replace(text,"\\")
  
   // let text=String.raw`${text}`
    // matchUserName=searchData.filter(usr=>{
      
    //   const regex=new RegExp(`${text}`,"gi");
      
    //   return usr.userName.match(regex)
    // })
    // matchTokenName=cryptoBoys.filter(usr=>{
    //   // if(text=="\\"){
    //   //   text = text.replace(new RegExp("\\", "g"), "\\");
    //   // }
    //   const regex=new RegExp(`${text}`,"gi");
      
    //   return usr.tokenName.match(regex)
    // })
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
const resultString=()=>{
  <div style={{position:"absolute",zIndex:2,backgroundColor:"aliceblue",color:"black"}}> 
  {results&&results.map((result,i)=>
   <div key={i} style={{cursor:"pointer",border:"1px"}}>
    {result[1]}
   </div>
  )}
</div>
}
const menuId = 'primary-search-account-menu';
const renderMenu = (
      <>
  <div className={classes.grow} >
      <AppBar position="static" style={{fontSize:"5 px",backgroundColor:"#173e43" ,display:"flex"}}>
        <Toolbar>
          <IconButton href="/">
        <img src={icon} alt="" style={{width:"32px",height:"32px"}}/>
        
        </IconButton>
          <Typography className={classes.title} variant="h6" noWrap style={{fontFamily:"cursive"}}>
            Digitart
          </Typography>
          {/* <IconButton onClick={()=>{setExpanded(!expanded);setCollapsed(!collapsed)}} className={classes.collapsedIcon}>
      <SearchIcon />
        </IconButton> */}
         
          {/* <div className={expanded?null:classes.collapsed}>     
            
          <TextField label="Search By" type="search" onChange={(e)=>{onChangeHandler(e.target.value)}}style={{backgroundColor:"azure",borderRadius:"4px",width:"inherit",padding:"1%"}}
             value={text}/>
            
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.searchbox,
                input: classes.searchText,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onBlur={()=>{
               setTimeout(()=>{
                 setUserSuggestions([]);
                 setTokenSuggestions([]);
               },100)
              }}
              onChange={(e)=>{onChangeHandler(e.target.value)}}
             value={text}
            // classes={classes.searchbox}
            /> */}
         
          
    
        
        
           

          {/* </div> */}
          {/* <div className={classes.search}>
          <Autocomplete
        {...userData}
        id="search"
        
        renderInput={(params) => <TextField style={{display:"flex"}}{...params} label="search" margin="normal" />}
      />
      </div> */}

      {/* <input type="text" className="col-md-12 input" style={{marginTop:10}}
      onChange={e=>onChangeHandler(e.target.value)}
      value={text}
      onBlur={()=>{
        setTimeout(()=>{
          setSuggestions([])
        },100); 
      }}
      />
      {suggestions && suggestions.map((suggestion,i)=>
        <div key={i}className="suggestion col-md-12 justify-content-md-center"
        onClick={()=>onSuggestHandler(suggestion)} */}
      {/* <IconButton onClick={()=>{setExpanded(!expanded);setCollapsed(!collapsed)}} className={expanded?classes.expandedIcon:classes.collapsedIcon}>
      <PersonIcon />
        </IconButton>
              <div className={expanded?classes.expanded:classes.collapsed}>
                <form onSubmit={handleSearchSubmit}>
          <ReactSearchAutocomplete
            items={allData}
            fuseOptions={{keys:["userName","tokenName","id"]}}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            placeholder="UserName"
            resultStringKeyName="userName"
           // resultStringKeyName={allData[id]}
            styling={{backgroundColor:"ghostwhite",zIndex:2,placeholderColor: "darkgreen",fontFamily: "Nunito Sans",searchIconMargin: '0 0 0 2px', borderRadius: "8px",clearIconMargin: "0 2px 0 0",display:"none"}}
            autoFocus
          />
          </form> */}


        {/* </div> */}
        {/* <IconButton onClick={()=>{setExpanded1(!expanded1);setCollapsed1(!collapsed1)}} className={expanded1?classes.expandedIcon1:classes.collapsedIcon1}>
      <ImageSearchIcon />
        </IconButton>
        <div className={expanded1?classes.expanded1:classes.collapsed1}>
                <form onSubmit={handleSearchSubmit2}>
          <ReactSearchAutocomplete
            items={cryptoBoys}
            fuseOptions={{keys:["tokenName"]}}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect2}
            onFocus={handleOnFocus}
            onClear={handleOnClear1}
            placeholder="DesignName"
            resultStringKeyName="tokenName"
            styling={{backgroundColor:"ghostwhite",zIndex:2,placeholderColor: "darkgreen",fontFamily: "Nunito Sans",searchIconMargin: '0 0 0 2px',clearIconMargin: "0 2px 0 0", borderRadius: "8px"}}
            autoFocus
          />
          </form>
        </div> */}

          <div className={classes.grow} />
          {/* <div className="event__search__floater">
              
              <div className="search__anchor">
                <form id="event-search-form" action="get" style={{display:"flex"}}>
                  
                      <input type="text" className="search__bar"style={{width:"auto"}} placeholder="Search NFT or People" value={text} onChange={(e)=>{onChangeHandler(e.target.value)}}
                    
                       >
                         

                       </input>
                  <input className="search__submit" type="submit"/>
                 
                
                  
                  
                  <div className="search__toggler">
                 
                  </div>
                 
                </form>
                
                </div>
                
              </div> */}
           
           
      
  
        {expanded1?(<div  style={{display:"flex",justifyContent:"flex-end",width:"50%" }} >
        <IconButton onClick={()=>{setExpanded1(false);setText(null);setUserSuggestions([]);setTokenSuggestions([])}} className={classes.collapsedIcon1}>
       <CancelIcon/> </IconButton>
          <div style={{width:"100%"}}>
          <input placeholder="Search NFT or people" type="search" className="col-md-12 input"  onChange={(e)=>{onChangeHandler(e.target.value)}} value={text}
        style={{borderRadius:"40px",color:"black",backgroundColor:"azure",height:"45px"}}/>
          
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
             <div key={i}className={classes.suggestions} onClick={(e)=>{setText(result[1]);handleSearchSubmit2(e,result[1])}} style={{cursor:"pointer",paddingTop:"1px",padding:"4px",paddingBottom:"1px",borderRadius:"2px",display:"flex",alignItems:"center",overflowWrap:"break-word"}}>
               <img alt={result[1]} src={result[8]}style={{objectFit:"contain",borderRadius:0,width:"45px",height:"45px",display:"flex",alignItems:"center",postion:"relative"}}/><b>@{result[1]}</b>
             </div>
            )}
            </div>
             ):(null)}
           </div>
      
       
        </div>):(null)}
          </div>
        
          {/* <TextField 
          onChange={(e)=>{onChangeHandler(e.target.value)}}
          value={text}
          id="filled-search" label="Search NFT or People" type="search" variant="filled"fullWidth  style={{borderRadius:"40px",color:"black",backgroundColor:"azure"}}/> */}
          
          
          </div>
          
        ):( 
        <div >
          <IconButton onClick={()=>{setExpanded1(true)}} className={classes.collapsedIcon1}>
        <SearchIcon /> </IconButton>
        </div>
      
        )}
          {/* <div className={classes.search}  
               >
            <div className={classes.searchIcon}>
              <SearchIcon />

            </div>
            
            <InputBase
              placeholder="Search NFT or People"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              //id="outlined-search"
              type="search"
              //  onClick={()=>setBlurred(false)}
              onChange={(e)=>{onChangeHandler(e.target.value)}}
             value={text}
              inputProps={{ 'aria-label': 'search' }}
              style={{borderRadius:"4px",color:"black"}}
            />
            
           
           
       
            </div> */}
           
          <div className={classes.sectionDesktop}>
           
            
              <Link to="/creators" className="nav-link" style={{color: "#e8e2e2",alignSelf:"center"}}>
                Creators
              </Link>
           
              

           
              <Link to="/mint" className="nav-link" style={{color: "#e8e2e2",alignSelf:"center"}}>
                Create
              </Link>
           
            
              <Link to="/marketplace" className="nav-link" style={{color: "#e8e2e2",alignSelf:"center"}}>
                Marketplace
              </Link>
            
            
              <Link to="/my-tokens" className="nav-link" style={{color: "#e8e2e2",alignSelf:"center"}}>
                My Tokens
              </Link>
            
           
              {/* <Link to="/queries" className="nav-link" style={{color: "#e8e2e2"}}>
                Queries
              </Link> */}
              {!metamaskConnected ? (
              <Button
        onClick={connectToMetamask}
        variant="contained"
        className="nav-link" 
       // className="btn btn-primary d-flex align-items-center"
       // style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
      >
        Connect Metamask{" "}
        <img
          src={metamaskIcon}
          alt="metamask-icon"
          style={{ width: "2rem", marginLeft: "0.5rem" }}
        />
      </Button>):null}
      {!currentUser?( <IconButton
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
    {!currentUser?( <MenuItem onClick={handleMenuClose}><Link to="/profile" className="nav-link" >
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
      <AppBar position="static" style={{fontSize:"5 px",backgroundColor:"#173e43" }}>
        <Toolbar>
          <IconButton href="/">
        <img src={icon} alt="" style={{width:"32px",height:"32px"}}/>
        
        </IconButton>
         
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form  onSubmit={handleSearchSubmit}>
          
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>setSearch(e.target.value)}
             
            />
            </form>
          </div> */}
         {/* <IconButton onClick={()=>{setExpanded(!expanded);setCollapsed(!collapsed)}} className={expanded?classes.expandedIcon:classes.collapsedIcon}>
      <PersonIcon />
        </IconButton>
              <div className={expanded?classes.expanded:classes.collapsed}>
                <form onSubmit={handleSearchSubmit}>
          <ReactSearchAutocomplete
            items={[searchData,cryptoBoys]}
            fuseOptions={{keys:["userName","tokenName"]}}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            showIcon={false}
            placeholder="User"
            resultStringKeyName="userName"
            styling={{backgroundColor:"ghostwhite",zIndex:2,fontFamily: "Nunito Sans",clearIconMargin: "0 1px 0 0",borderRadius: "8px"}}
            autoFocus
          />
          </form>
        </div>
        <IconButton onClick={()=>{setExpanded1(!expanded1);setCollapsed1(!collapsed1)}} className={expanded1?classes.expandedIcon1:classes.collapsedIcon1}>
      <ImageSearchIcon />
        </IconButton>
        <div className={expanded1?classes.expanded1:classes.collapsed1}>
                <form onSubmit={handleSearchSubmit2}>
          <ReactSearchAutocomplete
            items={cryptoBoys}
            fuseOptions={{keys:["tokenName"]}}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect2}
            onFocus={handleOnFocus}
            onClear={handleOnClear1}
            placeholder="Design"
            resultStringKeyName="tokenName"
            showIcon={false}
            styling={{backgroundColor:"ghostwhite",zIndex:2,fontFamily: "Nunito Sans",clearIconMargin: "0 1px 0 0",borderRadius: "8px"}}
            autoFocus
          />
          </form>
        </div> */}
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
              <div key={i}className={classes.suggestions}onClick={(e)=>{setText(result[1]);handleSearchSubmit(e,result[1])}} style={{cursor:"pointer",paddingTop:"1px",paddingBottom:"1px",padding:"4px",borderRadius:"2px",display:"flex",alignItems:"center"}}>
               <Avatar alt={result[1]} src={result[6]}/><b>@{result[1]}</b>
              </div>
             )}
             </div>
          ):(null)}
          <hr/>
           {tokenSuggestions.length!=0?( 
           <div style={{maxHeight:"25vh",overflow:"auto"}}>
            <h4>Designs</h4>
             {tokenSuggestions&&tokenSuggestions.map((result,i)=>
             <div key={i}className={classes.suggestions} onClick={(e)=>{setText(result[1]);handleSearchSubmit2(e,result[1]);setUserSuggestions([]);setTokenSuggestions([])}} style={{cursor:"pointer",paddingTop:"1px",padding:"4px",paddingBottom:"1px",borderRadius:"2px",display:"flex",alignItems:"center"}}>
               <img alt={result[1]} src={result[7]}style={{objectFit:"contain",borderRadius:0,width:"45px",height:"45px",display:"flex",alignItems:"center",postion:"relative"}}/><b>@{result[1]}</b>
             </div>
            )}
            </div>
             ):(null)}
           </div>
      
       
        </div>):(null)}
          </div>
        
          {/* <TextField 
          onChange={(e)=>{onChangeHandler(e.target.value)}}
          value={text}
          id="filled-search" label="Search NFT or People" type="search" variant="filled"fullWidth  style={{borderRadius:"40px",color:"black",backgroundColor:"azure"}}/> */}
          
          
          </div>
          
        ):( 
        <div style={{transition: "all ease-in-out 0.3s"}}>
          <IconButton onClick={()=>{setExpanded1(true)}} className={classes.collapsedIcon1}>
        <SearchIcon /> </IconButton>
        </div>)}
          <div className={classes.sectionMobile}>
          {/* <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mint" className="nav-link">
                Mint NFT
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/marketplace" className="nav-link">
                Marketplace
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/my-tokens" className="nav-link">
                My Tokens
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/queries" className="nav-link">
                Queries
              </Link>
            </li> */}
            {!metamaskConnected ? (
             <Button
        onClick={connectToMetamask}
       // className="btn btn-primary d-flex align-items-center"
       // style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
      >
       
        <img
          src={metamaskIcon}
          alt="metamask-icon"
          style={{ width: "2rem", marginLeft: "0.5rem" }}
        />
      </Button>):null}
      {!currentUser?( <IconButton
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
    {!currentUser[1]?( <MenuItem onClick={handleMobileMenuClose}><Link to="/profile" className="nav-link" >
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
    // <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    //   <div className="container">
    //     <img src={icon} alt="" />
    //     <Link to="/" className="navbar-brand ml-2">
    //       NFT's
    //     </Link>
    //     <button
    //       className="navbar-toggler"
    //       data-toggle="collapse"
    //       data-target="#navbarNav"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div id="navbarNav" className="collapse navbar-collapse">
    //       <ul
    //         style={{ fontSize: "0.8rem", letterSpacing: "0.2rem" }}
    //         className="navbar-nav ml-auto"
    //       >
            // <li className="nav-item">
            //   <Link to="/" className="nav-link">
            //     Home
            //   </Link>
            // </li>
            // <li className="nav-item">
            //   <Link to="/mint" className="nav-link">
            //     Mint NFT
            //   </Link>
            // </li>
            // <li className="nav-item">
            //   <Link to="/marketplace" className="nav-link">
            //     Marketplace
            //   </Link>
            // </li>
            // <li className="nav-item">
            //   <Link to="/my-tokens" className="nav-link">
            //     My Tokens
            //   </Link>
            // </li>
            // <li className="nav-item">
            //   <Link to="/queries" className="nav-link">
            //     Queries
            //   </Link>
            // </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
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
