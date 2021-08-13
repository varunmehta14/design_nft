import React,{useState,useEffect} from "react";
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

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
     
  <Paper variant="outlined" elevation={10} style={{padding:"1%",backgroundColor:"azure",textAlign:"center"}}>
    <div style={{padding:"0.5%"}}> <h1 className="display-5">Account Details</h1>
    
    <hr className="my-4" />
     <img src={currentUser.userAvatarHash} alt="Avatar"/>
     <hr/>
    <p >Account address :</p>
    <p className="lead" style={{fontStyle:"italic",overflowWrap:"break-word"}}>{accountAddress}</p>
    <p >Account balance :</p>
    <p className="lead"style={{fontStyle:"italic"}}>{accountBalance} Ξ</p>
    <p >User Name :</p>
    <p className="lead"style={{fontStyle:"italic"}}>{currentUser.userName}</p>
    <p >Email :</p>
    <p className="lead"style={{fontStyle:"italic"}}>{currentUser.userEmail} </p>
    <p >Social Media</p>
    <p className="lead"style={{fontStyle:"italic"}}>{currentUser.userSocial}</p>
    <p >Custom Url</p>
    <p className="lead" style={{fontStyle:"italic",overflowWrap:"break-word"}}>{currentUser.userRepo}</p>
    <p >Bio :</p>
    <p className="lead"style={{fontStyle:"italic",overflowWrap:"break-word"}}>{currentUser.userBio}</p>
    <hr/>
    <Button
        
        
        variant="contained"
        color="primary"
        style={{backgroundColor:"#173e43"}}
        href="/updateProfile"
      >
        Update Profile
      </Button> </div>

    
             
      </Paper>
     
   </div>
);

const renderMobile=(
<div style={{padding:"0.5%"}}>
     
     <Paper variant="outlined" elevation={10} style={{padding:"1%",backgroundColor:"azure",textAlign:"center"}}> 
       <div style={{padding:"0.5%"}}> <h1 className="display-5">Account Details</h1>
       
       <hr className="my-4" />
        <img src={currentUser.userAvatarhash} alt="Avatar"/>
        <hr/>
       <p >Account address :</p>
       <p className="lead" style={{fontStyle:"italic",overflowY:"scroll"}}>{accountAddress}</p>
       <p >Account balance :</p>
       <p className="lead" style={{fontStyle:"italic"}}>{accountBalance} Ξ</p>
       <p >User Name :</p>
       <p className="lead" style={{fontStyle:"italic"}}>{currentUser.userName}</p>
       <p >Email :</p>
       <p className="lead"style={{fontStyle:"italic"}}>{currentUser.userEmail} </p>
       <p >Social Media</p>
       <p className="lead"style={{fontStyle:"italic"}}>{currentUser.userSocial}</p>
       <p >Custom Url</p>
       <p className="lead" style={{fontStyle:"italic",overflowY:"scroll"}}>{currentUser.userRepo}</p>
       <p >Bio :</p>
       <p className="lead"style={{fontStyle:"italic",overflowY:"scroll"}}>{currentUser.userBio}</p>
       <hr/>
       <Button
           
           
           variant="contained"
           color="primary"
           style={{backgroundColor:"#173e43"}}
           href="/updateProfile"
         >
           Update Profile
         </Button> </div>
 
       
                
         </Paper>
        
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
