import React,{useState,useEffect} from "react";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';


const TheirAccountDetails = ({ accountAddress,cryptoBoysContract,usersContract}) => {

 const[currentUser,setCurrentUser]=useState("");
  useEffect(()=>{
    getCurrentUser();
  },[]);
  const getCurrentUser=async()=>{
    if(usersContract){
    const current=await usersContract.methods
    .allUsers(accountAddress)
    .call();
    setCurrentUser(current);
    console.log(currentUser);
  }
}
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
