import React,{useState} from "react";
//import icon from "./favicon-32x32.png";
import icon from "./digitartlogo.png";
import { Link } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
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
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
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
}));



const Navbar = ({connectToMetamask,metamaskConnected,userLoggedIn,currentUser,searchTermfromApp,searchAllResultsFromApp,searchData,cryptoBoys,searchNFTFromApp}) => {
  const classes = useStyles();
const [anchorEl, setAnchorEl] = useState(null);
//const [metamaskConnected,setMetamaskConnected]=useState(false);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =useState(null);
const [search,setSearch]=useState("");
const isMenuOpen = Boolean(anchorEl);
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


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

const handleSearchSubmit=(e)=>{
e.preventDefault();

console.log("form submitted", search)
searchTermfromApp(search)
}
const searchTerm=(key)=>{
searchAllResultsFromApp(key);
}
const handleSearchSubmit2=(e)=>{
  e.preventDefault();
  
  console.log("form submitted", search)
  searchNFTFromApp(search)
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

const menuId = 'primary-search-account-menu';
const renderMenu = (
      <>
  <div className={classes.grow} style={{zIndex:"10"}}>
      <AppBar position="static" style={{fontSize:"5 px",backgroundColor:"#173e43" }}>
        <Toolbar>
          <IconButton href="/">
        <img src={icon} alt="" style={{width:"32px",height:"32px"}}/>
        
        </IconButton>
          <Typography className={classes.title} variant="h6" noWrap style={{fontFamily:"cursive"}}>
            Digitart
          </Typography>
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
              onChange={(e)=>{setSearch(e.target.value);searchTerm(e.target.value)}}
             
            />
            
            
            </form>
          </div> */}
          {/* <div className={classes.search}>
          <Autocomplete
        {...userData}
        id="search"
        
        renderInput={(params) => <TextField style={{display:"flex"}}{...params} label="search" margin="normal" />}
      />
      </div> */}
              <div style={{ width: "10%",marginLeft:"2%" }}>
                <form onSubmit={handleSearchSubmit}>
          <ReactSearchAutocomplete
            items={searchData}
            fuseOptions={{keys:["userName"]}}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            resultStringKeyName="userName"
            styling={{backgroundColor:"ghostwhite"}}
            autoFocus
          />
          </form>
        </div>
        <div style={{ width: "10%",marginLeft:"2%" }}>
                <form onSubmit={handleSearchSubmit2}>
          <ReactSearchAutocomplete
            items={cryptoBoys}
            fuseOptions={{keys:["tokenName"]}}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect2}
            onFocus={handleOnFocus}
            resultStringKeyName="tokenName"
            styling={{backgroundColor:"ghostwhite"}}
            autoFocus
          />
          </form>
        </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

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
               <Avatar alt={currentUser[1]} src={currentUser[6]}/>
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
    {!currentUser[1]?( <MenuItem onClick={handleMenuClose}><Link to="/profile" className="nav-link" >
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
  <div className={classes.grow} style={{zIndex:"10"}}>
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
          <div style={{width:"100%", marginLeft:"2%" }}>
                <form onSubmit={handleSearchSubmit}>
          <ReactSearchAutocomplete
            items={searchData}
            fuseOptions={{keys:["userName"]}}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            resultStringKeyName="userName"
            styling={{backgroundColor:"ghostwhite",active:false}}
            autoFocus
          />
          </form>
        </div>
        <div style={{ width: "100%",marginLeft:"2%" }}>
                <form onSubmit={handleSearchSubmit2}>
          <ReactSearchAutocomplete
            items={cryptoBoys}
            fuseOptions={{keys:["tokenName"]}}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect2}
            onFocus={handleOnFocus}
            resultStringKeyName="tokenName"
            styling={{backgroundColor:"ghostwhite"}}
            autoFocus
          />
          </form>
        </div>
          <div className={classes.grow} />
       
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
               <Avatar alt={currentUser[1]} src={currentUser[6]}/>
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
