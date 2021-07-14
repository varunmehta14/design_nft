import React,{useState,useEffect} from "react";
import Button from '@material-ui/core/Button';
//import Avatar from 'react-avatar-edit';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AvatarImageCropper from 'react-avatar-image-cropper';
import validator from 'validator';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';


const AccountDetails = ({ updateUserFromApp,accountAddress, accountBalance,currentUser,cryptoBoysContract,nameIsUsed,emailIsUsed}) => {

  
  return (
    <div style={{padding:"0.5%"}}>
      <div className="jumbotron">
       <> <h1 className="display-5">Account Details</h1>
       
       <hr className="my-4" />
        <img src={currentUser.avatarhash} alt="Avatar"/>
        <hr/>
       <p className="lead">Account address :</p>
       <h4>{accountAddress}</h4>
       <p className="lead">Account balance :</p>
       <h4>{accountBalance} Ξ</h4>
       <p className="lead">User Name :</p>
       <h4>{currentUser.userName}</h4>
       <p className="lead">Email :</p>
       <h4>{currentUser.email} </h4>
       <p className="lead">Social Media</p>
       <h4>{currentUser.social}</h4>
       <p className="lead">Custom Url</p>
       <h4>{currentUser.repo}</h4>
       <p className="lead">Bio :</p>
       <h4>{currentUser.bio}</h4>
       <hr/>
       <Button
           
           
           variant="contained"
           color="primary"
           style={{backgroundColor:"#173e43"}}
           href="/updateProfile"
         >
           Update Profile
         </Button> </>
 
       
                
     </div>
        
      </div>
    
  );
};

export default AccountDetails;
