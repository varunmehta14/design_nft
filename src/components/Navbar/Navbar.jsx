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
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import metamaskIcon from "./metamask.svg";
import Avatar from '@material-ui/core/Avatar';
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



const Navbar = ({connectToMetamask,metamaskConnected,userLoggedIn,currentUser,searchTermfromApp}) => {
  const classes = useStyles();
const [anchorEl, setAnchorEl] = useState(null);
//const [metamaskConnected,setMetamaskConnected]=useState(false);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =useState(null);
const [search,setSearch]=useState("");
const isMenuOpen = Boolean(anchorEl);
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
// const connectToMetamask = async () => {
  
//   await window.ethereum.enable();
//  setMetamaskConnected( true );
//   window.location.reload();
// };

const handleMobileMenuOpen = (event) => {
  setMobileMoreAnchorEl(event.currentTarget);
};

const menuId = 'primary-search-account-menu';
const renderMenu = (
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
);

const mobileMenuId = 'primary-search-account-menu-mobile';
const renderMobileMenu = (
  <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    <MenuItem>
      <IconButton aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <p>Messages</p>
    </MenuItem>
    <MenuItem>
      <IconButton aria-label="show 11 new notifications" color="inherit">
        <Badge badgeContent={11} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <p>Notifications</p>
    </MenuItem>
    <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <p>Profile</p>
    </MenuItem>
  </Menu>
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
      <AppBar position="static" style={{fontSize:"5 px",backgroundColor:"#173e43" }}>
        <Toolbar>
          <IconButton href="/">
        <img src={icon} alt="" style={{width:"32px",height:"32px"}}/>
        
        </IconButton>
          <Typography className={classes.title} variant="h6" noWrap style={{fontFamily:"cursive"}}>
            Digitart
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form  onSubmit={handleSearchSubmit}>
            {/* <Link to="/mint" className="nav-link" style={{color: "#e8e2e2",alignSelf:"center"}}> */}
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>setSearch(e.target.value)}
             
            />
            {/* </Link> */}
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
          <div className={classes.sectionMobile}>
          <li className="nav-item">
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
            </li>
            {/* <li className="nav-item">
              <Link to="/queries" className="nav-link">
                Queries
              </Link>
            </li> */}
            {!metamaskConnected ? (
             <li  className="nav-item"> <Button
        onClick={connectToMetamask}
       // className="btn btn-primary d-flex align-items-center"
       // style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
      >
       
        <img
          src={metamaskIcon}
          alt="metamask-icon"
          style={{ width: "2rem", marginLeft: "0.5rem" }}
        />
      </Button></li>):null}
             
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Navbar;
