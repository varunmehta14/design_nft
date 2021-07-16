import React,{useState,useEffect} from "react";
import Button from '@material-ui/core/Button';
//import Avatar from 'react-avatar-edit';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import AvatarImageCropper from 'react-avatar-image-cropper';
import validator from 'validator';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';


const AccountDetails = ({ updateUserFromApp,accountAddress, accountBalance,currentUser,cryptoBoysContract,nameIsUsed,emailIsUsed}) => {

  
  return (
    <div style={{padding:"0.5%"}}>
     
     <Paper>
       <div style={{padding:"0.5%"}}> <h1 className="display-5">Account Details</h1>
       
       <hr className="my-4" />
        <img src={currentUser.avatarhash} alt="Avatar"/>
        <hr/>
       <p >Account address :</p>
       <p className="lead">{accountAddress}</p>
       <p >Account balance :</p>
       <p className="lead">{accountBalance} Ξ</p>
       <p >User Name :</p>
       <p className="lead">{currentUser.userName}</p>
       <p >Email :</p>
       <p className="lead">{currentUser.email} </p>
       <p >Social Media</p>
       <p className="lead">{currentUser.social}</p>
       <p >Custom Url</p>
       <p className="lead">{currentUser.repo}</p>
       <p >Bio :</p>
       <p className="lead">{currentUser.bio}</p>
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
};

export default AccountDetails;
