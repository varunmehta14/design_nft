import React,{useState,useEffect} from "react";
import Button from '@material-ui/core/Button';
import Avatar from 'react-avatar-edit';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

const AccountDetails = ({ updateUser,accountAddress, accountBalance,currentUser,cryptoBoysContract,nameIsUsed}) => {

  const[updatedUser,setUpdatedUser]=useState("");
  // useEffect(()=>{
  //   getCurrentUser();
  // },[]);
  const[preview,setPreview]=useState(currentUser[5]);
  const[userName,setUserName]=useState(currentUser[1]);
  const[bio,setBio]=useState(currentUser[4]);
  const[social,setSocial]=useState(currentUser[2]);
  const[repo,setRepo]=useState(currentUser[3]);
  const[email,setEmail]=useState(currentUser[6]);
  const[updateProfile,setUpdateProfile]=useState(false);
  const[src,setSrc]=useState("");
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    // const current=await cryptoBoysContract.methods
    // .updateUser(userName,email,social,repo,bio,preview)
    // .send({ from:accountAddress })
    // .on("confirmation", () => {
    // //  localStorage.setItem(this.state.accountAddress, new Date().getTime());
    // //  this.setState({ loading: false });
    //   window.location.reload();
    // });
    
    //setUpdatedUser(current);
    //console.log(updatedUser);
    updateUser(userName,email,social,repo,bio,preview);
  }
  const onClose=()=> {
    setPreview(null)
  }
  
  const onCrop=(preview)=> {
    setPreview(preview)
    console.log(preview)
  }

  console.log(cryptoBoysContract)
  console.log(accountAddress);
  console.log(currentUser);
  return (
    <div>
      <div className="jumbotron">
        {!updateProfile?(<> <h1 className="display-5">Account Details</h1>
       
       <hr className="my-4" />
        <img src={currentUser[5]} alt="Avatar"/>
       <p className="lead">Account address :</p>
       <h4>{currentUser[7]}</h4>
       <p className="lead">Account balance :</p>
       <h4>{accountBalance} Ξ</h4>
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
       <Button
           
           onClick={()=>setUpdateProfile(true)}
           variant="contained"
           color="primary"
           
         >
           Update Profile
         </Button> </>):
       (<>
       <form validate style={{padding:"1%"}}onSubmit={handleSubmit}>
        <div  className="d-flex  p-4  mt-1 border ">
          <div className="col-md-6">
      <Avatar
       //   width={390}
        //  height={295}
          onCrop={onCrop}
          onClose={onClose}
         // onBeforeFileLoad={onBeforeFileLoad}
        // exportMimeType="image/jpeg"
          src={src}
        />
        </div>
        <div className="col-md-6" style={{margin:"auto"}}>
        {preview && (
        <>
          <img src={preview} alt="Preview" />
          <a href={preview} download="avatar">
            Download image
          </a>
        </>
      )}
       </div>
       </div> 
      <CssBaseline />
      <div >
     
      <div className="card mt-1 p-4">
        <p className="lead">Account address :</p>
        <h4>{accountAddress}</h4>
        <p className="lead">Account balance :</p>
        <h4>{accountBalance} Ξ</h4>
        </div>
        <div className="card mt-1 p-4">
        
       <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
                value={userName}
                onChange={(e)=>{setUserName(e.target.value)}}
                id="userName"
                label="User Name"
                autoFocus
          />

          <TextField
            variant="outlined"
            
            required
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </div>
        <br/>
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <TextField
                
                name="Social Media"
                variant="outlined"
                required
                value={social}
                onChange={(e)=>{setSocial(e.target.value)}}
                id="socialMedia"
                label="Social Media Link"
                autoFocus
          />

          <TextField
            variant="outlined"
            id="customUrl"
            value={repo}
            onChange={(e)=>{setRepo(e.target.value)}}
            label="Custom URL"
            name="customUrl" 
            autoFocus
          />
        </div>
        <br/>
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <TextField
          id="standard-multiline-flexible"
          label="Bio"
          multiline
          value={bio}
          onChange={(e)=>{setBio(e.target.value)}}
          rowsMax={4}
          variant="outlined"
        
        />
         </div>
         <div style={{display:"flex",justifyContent:"space-evenly"}}>
          <Button
            type="submit"
            
            variant="contained"
            color="primary"
            //className={classes.submit}
          >
            Update Profile
          </Button>
        </div>
        
        </div>
      </div>
      <div className="mt-4">
           {nameIsUsed ? (
             <div className="alert alert-danger alert-dissmissible">
               <button
                 type="button"
                 className="close"
                 data-dismiss="alert"
               >
                 <span>&times;</span>
               </button>
               <strong>This name is taken!</strong>
             </div>
           ) :     
             null}
         </div>
      </form></>)}
       
                
     
        
      </div>
    </div>
  );
};

export default AccountDetails;
