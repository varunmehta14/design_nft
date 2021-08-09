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
import { makeStyles } from '@material-ui/core/styles';
import Loading from "../Loading/Loading";

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
const UpdateProfile = ({ updateUserFromApp,accountAddress, accountBalance,currentUser,cryptoBoysContract,nameIsUsed,emailIsUsed,loading}) => {
const classes=useStyles();
  console.log(currentUser)
  useEffect(()=>{
    setUserName(currentUser.userName);
    setBio(currentUser.userBio);
    setSocial(currentUser.userSocial);
    setRepo(currentUser.userRepo);
    setEmail(currentUser.userEmail);
    setSrc(currentUser.userAvatarHash);
    setBuffer(currentUser.userAvatarHash);

  },[currentUser]);
  //const[preview,setPreview]=useState(currentUser.avatarHash);
  
  const[userName,setUserName]=useState(currentUser.userName);
  //const[olduserName,setOlduserName]=useState(currentUser.userName);
  const[bio,setBio]=useState(currentUser.userBio);
  const[social,setSocial]=useState(currentUser.userSocial);
  const[repo,setRepo]=useState(currentUser.userRepo);
  const[email,setEmail]=useState(currentUser.userEmail);

  const[src,setSrc]=useState(currentUser.userAvatarHash);
  const[buffer,setBuffer]=useState(currentUser.userAvatarHash);
  const [emailError, setEmailError] = useState(false);
  const [clickedChange,setClickedChange]=useState(false);

  const oldemail=currentUser.userEmail;
  console.log(oldemail)
  
  const validateEmail = (e) => {
    var email = e;
  
    if (validator.isEmail(email)) {
     
      setEmailError(false)
      return true;
    } else {
      setEmailError(true)
      return false;
    }
   
  }
  
  
  console.log(buffer);
  const handleSubmit2=async(e)=>{
   
    e.preventDefault();
   
    
  }
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
    console.log(buffer)
    const em=validateEmail(email);
    console.log(em)
    //setUpdatedUser(current);
    //console.log(updatedUser);
    if(em){
      updateUserFromApp(userName,oldemail,email,social,repo,bio,buffer,accountAddress);
    }
    
  }
  // const captureFile=(event)=> {
  //   event.preventDefault()
  //   const file = event.target.files[0]
  //   const reader = new window.FileReader()
  //   reader.readAsArrayBuffer(file)
  //   reader.onloadend = () => {
  //     setBuffer( Buffer(reader.result) )
  //     console.log('buffer', buffer)
  //   }
  // }
  // const onClose=()=> {
  //   setPreview(null)
  // }
  
  // const onCrop=(preview)=> {
  //   setPreview(preview)
  //   console.log(preview)
  // }
  const apply = (file) => {
    
    // handle the blob file you want
    // such as get the image src
    console.log(file);
    
    setBuffer(file);
     var src = window.URL.createObjectURL(file);
     setSrc(src);
     setClickedChange(false)
    // console.log(src);
//     const reader = new window.FileReader()
//     reader.readAsBinaryString(file)
//     console.log(reader.result)
//     reader.onloadend = () => {
//       setBuffer( Buffer(reader.result) )
 console.log('buffer', buffer)
// }
  }
  const renderMobile=(
    <div style={{padding:"0.5%"}}>
    {loading?(<><Loading/></>):(
         <>
  
   
    
         <div className="card  p-4">
           
 
        <div style={{display:"flex",justifyContent:"center"}}>
      {clickedChange?( <form onSubmit={handleSubmit2} style={{display:"contents"}}>
         <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid black' }}>
          
         <AvatarImageCropper apply={apply} text={"Change"} />
         
           </div> 
           </form>  ):( <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid black' }}>
          <img src={src} alt="Preview" />
           </div> )}
        
           
          
         </div>
         <div style={{display:"flex",justifyContent:"space-around"}}>
         {/* <Button variant="contained"color="primary" style={{float:"left"}}onClick={()=>{setBuffer("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX");setSrc("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX")}}>
             Remove Dp
            </Button> */}
            <IconButton color="primary"  style={{float:"left"}}component="span" style={{float:"left",color:"#173e43"}}onClick={()=>{setBuffer("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX");setSrc("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX")}}>
           <HighlightOffIcon style={{fontSize:"-webkit-xxx-large"}}/>
         </IconButton>
            {/* <Button variant="contained"color="primary" style={{float:"left"}}onClick={()=>{setClickedChange(true)}}>
             Change Dp
            </Button>  */}
            <IconButton color="primary" aria-label="upload picture" component="span" style={{float:"left",color:"#173e43"}}onClick={()=>{setClickedChange(true)}}>
           <PhotoCamera style={{fontSize:"-webkit-xxx-large"}}/>
         </IconButton>
           </div>  
         </div>
       <CssBaseline />
       <form validate onSubmit={handleSubmit}>
       <div >
      
       <div className="card mt-1 p-4">
         <p className="lead">Account address :</p>
         <h4>{accountAddress}</h4>
         <p className="lead">Account balance :</p>
         <h4>{accountBalance} Ξ</h4>
         
        <hr/>
        <br/>
         <div style={{textAlign:"center"}}>
        <div >
          
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
                 disabled={true}
           />
          </div>
          <br/>
          <div>
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
             error={emailError}
           />
         </div>
         <br/>
         <div >
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
           </div>
           <br/>
          <div>
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
         <div >
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
          </div>
          <br/>
          <div style={{display:"flex",justifyContent:"space-evenly"}}>
           <Button
             type="submit"
             style={{backgroundColor:"#173e43"}}
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
            {emailIsUsed ? (
              <div className="alert alert-danger alert-dissmissible">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                >
                  <span>&times;</span>
                </button>
                <strong>This email is taken!</strong>
              </div>
            ) :     
              null}
          </div>
       </form></>
    )}

   
            
 
    
  </div>

  );


  const renderDesktop=(
    <div style={{padding:"0.5%"}}>
        {loading?(<><Loading/></>):(
             <>
      
       
        
             <div className="card  p-4">
               
     
            <div style={{display:"flex",justifyContent:"center"}}>
          {clickedChange?( <form onSubmit={handleSubmit2} style={{display:"contents"}}>
             <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid black' }}>
              
             <AvatarImageCropper apply={apply} text={"Change"} />
             
               </div> 
               </form>  ):( <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid black' }}>
              <img src={src} alt="Preview" />
               </div> )}
            
               
              
             </div>
             <div style={{display:"flex",justifyContent:"space-around"}}>
             {/* <Button variant="contained"color="primary" style={{float:"left"}}onClick={()=>{setBuffer("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX");setSrc("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX")}}>
                 Remove Dp
                </Button> */}
                <IconButton color="primary"  style={{float:"left"}}component="span" style={{float:"left",color:"#173e43"}}onClick={()=>{setBuffer("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX");setSrc("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX")}}>
               <HighlightOffIcon style={{fontSize:"-webkit-xxx-large"}}/>
             </IconButton>
                {/* <Button variant="contained"color="primary" style={{float:"left"}}onClick={()=>{setClickedChange(true)}}>
                 Change Dp
                </Button>  */}
                <IconButton color="primary" aria-label="upload picture" component="span" style={{float:"left",color:"#173e43"}}onClick={()=>{setClickedChange(true)}}>
               <PhotoCamera style={{fontSize:"-webkit-xxx-large"}}/>
             </IconButton>
               </div>  
             </div>
           <CssBaseline />
           <form validate onSubmit={handleSubmit}>
           <div >
          
           <div className="card mt-1 p-4">
             <p className="lead">Account address :</p>
             <h4>{accountAddress}</h4>
             <p className="lead">Account balance :</p>
             <h4>{accountBalance} Ξ</h4>
             
     
            <br/>
             
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
                     disabled={true}
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
                 error={emailError}
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
              <br/>
              <div style={{display:"flex",justifyContent:"space-evenly"}}>
               <Button
                 type="submit"
                 style={{backgroundColor:"#173e43"}}
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
                {emailIsUsed ? (
                  <div className="alert alert-danger alert-dissmissible">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                    >
                      <span>&times;</span>
                    </button>
                    <strong>This email is taken!</strong>
                  </div>
                ) :     
                  null}
              </div>
           </form></>
        )}
    
       
                
     
        
      </div>
  );

 // console.log(cryptoBoysContract)
 // console.log(accountAddress);
 // console.log(currentUser[6]);
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

export default UpdateProfile;
