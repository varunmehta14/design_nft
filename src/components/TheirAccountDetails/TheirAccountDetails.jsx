import React,{useState,useEffect} from "react";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const TheirAccountDetails = ({ accountAddress,cryptoBoysContract,usersContract,currentUser}) => {
 // if(!accountAddress){accountAddress=window.location.href.split("/")[4]};
 //const[currentUser,setCurrentUser]=useState("");
  console.log(usersContract)
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
 
 useEffect(()=>{
  setUserName(currentUser.userName);
  setBio(currentUser.bio);
  setSocial(currentUser.social);
  setRepo(currentUser.repo);
  setEmail(currentUser.email);
  setSrc(currentUser.avatarhash);

  
  
  },[currentUser]);
  const[userName,setUserName]=useState(currentUser.userName);
  //const[olduserName,setOlduserName]=useState(currentUser.userName);
  const[bio,setBio]=useState(currentUser.bio);
  const[social,setSocial]=useState(currentUser.social);
  const[repo,setRepo]=useState(currentUser.repo);
  const[email,setEmail]=useState(currentUser.email);

  const[src,setSrc]=useState(currentUser.avatarhash);
 
  console.log(cryptoBoysContract)
  console.log(accountAddress);
  console.log(currentUser);

  const useStyles = makeStyles((theme) => ({
   
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));
  return (
    <div style={{padding:"0.5%"}}>
      
      <Paper>
      <div style={{padding:"0.5%"}}>
        <hr className="my-4" />
        <div style={{display:"flex",justifyContent:"center"}}>
        <Avatar alt={currentUser.userName} src={currentUser.avatarhash} className={useStyles().large}/>
        </div>
        
        <p >Account address :</p>
       <p className="lead">{accountAddress}</p>
      
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
        
        </div>
       </Paper>
    </div>
   
  );
};

export default TheirAccountDetails;
