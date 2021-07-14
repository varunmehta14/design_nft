import React,{useState,useEffect} from "react";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';


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
      
       
        <hr className="my-4" />
        <div style={{display:"flex",justifyContent:"center"}}>
        <Avatar alt={currentUser.userName} src={currentUser.avatarhash} className={useStyles().large}/>
        </div>
        
        <p className="lead">Account address :</p>
        <h4>{accountAddress}</h4>
       
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
        
        
     
    </div>
  );
};

export default TheirAccountDetails;
