import React,{useState,useEffect} from "react";

import { makeStyles } from '@material-ui/core/styles';

import Loading from "../Loading/Loading";
import './TheirAccountDetails.css'
import InstagramIcon from '@material-ui/icons/Instagram';

import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import DnsTwoToneIcon from '@material-ui/icons/DnsTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';

const TheirAccountDetails = ({ accountAddress,currentUser}) => {
 // if(!accountAddress){accountAddress=window.location.href.split("/")[4]};
 //const[currentUser,setCurrentUser]=useState("");
  
//  const getCurrentUser=async()=>{
//   if(usersContract){
//     console.log("here")
//   const current=await usersContract.methods
//   .allUsers(accountAddress)
//   .call();
//   setCurrentUser(current);
//   console.log(currentUser);
  
  
// }
// }
 
//  useEffect(()=>{
//   setUserName(currentUser.userName);
//   setBio(currentUser.bio);
//   setSocial(currentUser.social);
//   setRepo(currentUser.repo);
//   setEmail(currentUser.email);
//   setSrc(currentUser.avatarhash);

  
  
//   },[currentUser]);
//   const[userName,setUserName]=useState(currentUser.userName);
//   //const[olduserName,setOlduserName]=useState(currentUser.userName);
//   const[bio,setBio]=useState(currentUser.bio);
//   const[social,setSocial]=useState(currentUser.social);
//   const[repo,setRepo]=useState(currentUser.repo);
//   const[email,setEmail]=useState(currentUser.email);

//   const[src,setSrc]=useState(currentUser.avatarhash);
 
  //console.log(cryptoBoysContract)
  console.log(accountAddress);
  console.log(currentUser);

  const useStyles = makeStyles((theme) => ({
   
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
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
  }));

  const renderDesktop=(
    <div style={{padding:"0.5%",display:"flex",justifyContent:"center"}}>
      
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
      </div>
      </div>
    ):(<><Loading/></>)}
      
  </div>
  );

  const renderMobile=(
    <div style={{padding:"0.5%",justifyContent:"center"}}>
      
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
       </div>
       </div>
    ):(<><Loading/></>)}
     
  </div>
  );
  return (
    < >
    <div className={useStyles().sectionMobile}>
      {/* {currentUser?(renderMobile):(<Loading/>)} */}
      {renderMobile}
     
     </div>
     <div className={useStyles().sectionDesktop}>
     {/* {currentUser?(renderDesktop):(<Loading/>)} */}
     {renderDesktop}
   </div>
   </>
  );
};

export default TheirAccountDetails;
