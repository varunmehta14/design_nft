import React,{useState,useEffect} from "react";


const TheirAccountDetails = ({ accountAddress,cryptoBoysContract}) => {

 const[currentUser,setCurrentUser]=useState("");
  useEffect(()=>{
    getCurrentUser();
  },[]);
  const getCurrentUser=async()=>{
    if(cryptoBoysContract){
    const current=await cryptoBoysContract.methods
    .allUsers(accountAddress)
    .call();
    setCurrentUser(current);
    console.log(currentUser);
  }
}
  console.log(cryptoBoysContract)
  console.log(accountAddress);
  console.log(currentUser);
  return (
    <div>
      
       
        <hr className="my-4" />
         <img src={currentUser[5]} alt="Avatar"/>
        <p className="lead">Account address :</p>
        <h4>{currentUser[7]}</h4>
       
        <p className="lead">User Name :</p>
        <h4>{currentUser[1]}</h4>
        <p className="lead">Email :</p>
        <h4>{currentUser[6]} </h4>
        <p className="lead">Social Media</p>
        <h4>{currentUser[2]}</h4>
        <p className="lead">Custom Url</p>
        <h4>{currentUser[3]}</h4>
        <p className="lead">Bio :</p>
        <h4>{currentUser[4]}</h4>
        
        
     
    </div>
  );
};

export default TheirAccountDetails;
