import React,{useState,useEffect} from "react";
import Button from '@material-ui/core/Button';
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import DnsTwoToneIcon from '@material-ui/icons/DnsTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import InstagramIcon from '@material-ui/icons/Instagram';
import Loading from "../Loading/Loading";
import Paper from '@material-ui/core/Paper';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { makeStyles } from '@material-ui/core/styles';
import '../TheirAccountDetails/TheirAccountDetails.css'
const useStyles=makeStyles((theme)=>({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent:"center"
    },
  },
  sectionMobile: {
    //display: 'flex',
  
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

const AccountDetails = ({ accountAddress, accountBalance,currentUser}) => {


const classes=useStyles();  
const renderDesktop=(
  <div style={{padding:"0.5%"}}>
     {currentUser?(
        <div className='app-container '>
        <div className='app'>
         <div className='profile-header'>
          <img src={currentUser.userAvatarHash} className='profile-picture' alt='Profile' />
          <div className='profile-name'>{currentUser.userName}</div>
          {/* <div className='profile-tagline'>{currentUser.userBio}</div> */}
          <div className='profile-links'>
          <div style={{display:"flex",justifyContent:'center'}}>
  
  <DnsTwoToneIcon/>
  &nbsp;
  <p style={{overflowX:"auto"}}>
  {currentUser.userAddress}
  </p>
  
  </div>
  <hr/>
  <div style={{display:"flex",justifyContent:"center"}}>
            <AccountBalanceWalletIcon/>
            &nbsp;
            {/* <p>{accountBalance}&nbsp; Ξ</p> */}
            {/* {accountBalance?(
              // <p>{window.web3.utils.fromWei(accountBalance.toString())}&nbsp; Ξ</p>
              <p>{accountBalance}&nbsp; Ξ</p>
            ):null} */}
            
            </div>
  <hr/>
          <WorkTwoToneIcon/> &nbsp;
            <a
              href={currentUser.userRepo}
              target='_blank'
              rel='noopener noreferrer'
              style={{overflowX:"auto"}}
            >
              {currentUser.userRepo}
            </a>
            <hr/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div>
            <InstagramIcon />
            &nbsp;
           @
            <a
              href={'https://instagram.com/' + currentUser.userSocial}
              target='_blank'
              rel='noopener noreferrer'
              style={{overflowX:"auto"}}
            >
              {currentUser.userSocial}
            </a>
            </div>
            <div style={{display:"flex"}}>
            <EmailTwoToneIcon/>
            &nbsp;
            <p>{currentUser.userEmail}</p>
            </div>
            </div>
            <hr/>
            
          </div>
          <p style={{fontSize:"medium"}}>{currentUser.userBio}</p>
          
          
          </div>
          <hr/>
      <Button
          
          
          variant="contained"
          color="primary"
          style={{backgroundColor:"#173e43"}}
          href="/updateProfile"
        >
          Update Profile
        </Button>
        </div>
        </div>
     ):(<><Loading/></>)}
 
      
   </div>
);

const renderMobile=(
<div style={{padding:"0.5%"}}>
     
{currentUser?(
    <div className='app-container '>
    <div className='app-mobile'>
     <div className='profile-header'>
      <img src={currentUser.userAvatarHash} className='profile-picture' alt='Profile' />
      <div className='profile-name'>{currentUser.userName}</div>
      {/* <div className='profile-tagline'>{currentUser.userBio}</div> */}
      <div className='profile-links'>
      <div style={{display:"flex",justifyContent:'center'}}>

        <DnsTwoToneIcon/>
        &nbsp;
        <p style={{overflowX:"auto"}}>
        {currentUser.userAddress}
        </p>
</div>

<hr/>

<div style={{display:"flex",justifyContent:"center"}}>
        <AccountBalanceWalletIcon/>
        &nbsp;
        {/* <p>{accountBalance}&nbsp; Ξ</p> */}
        {/* {accountBalance?(
              // <p>{window.web3.utils.fromWei(accountBalance.toString())}&nbsp; Ξ</p>
              <p>{accountBalance}&nbsp; Ξ</p>
            ):null} */}
        </div>
        <hr/>
<div style={{display:"flex",justifyContent:'center'}}>
      <WorkTwoToneIcon/> &nbsp;
        <a
          href={currentUser.userRepo}
          target='_blank'
          rel='noopener noreferrer'
          style={{overflowX:"auto"}}
        >
          {currentUser.userRepo}
        </a>
        </div>
        <hr/>
        
          <div style={{display:"flex",justifyContent:'center'}}>
        <InstagramIcon />
        &nbsp;
       @
        <a
          href={'https://instagram.com/' + currentUser.userSocial}
          target='_blank'
          rel='noopener noreferrer'
          style={{overflowX:"auto"}}
        >
          {currentUser.userSocial}
        </a>
        </div>
        <hr/>
        <div style={{display:"flex",justifyContent:'center'}}>
        <EmailTwoToneIcon/>
        &nbsp;
        <p style={{overflowX:"auto"}}>{currentUser.userEmail}</p>
        </div>
        
        <hr/>
        
      </div>
      <p style={{fontSize:"medium"}}>{currentUser.userBio}</p>
      
      
      </div>
      <Button
         
         
         variant="contained"
         color="primary"
         style={{backgroundColor:"#173e43"}}
         href="/updateProfile"
       >
         Update Profile
       </Button> 
    </div>
    </div>
):(<><Loading/></>)}
      
      </div>
);
  
  return (
    < >
    <div className={classes.sectionMobile}>
     {renderMobile}
     </div>
     <div className={classes.sectionDesktop}>
     {renderDesktop}
   </div>
   </>
  );
};

export default AccountDetails;
