import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


import AvatarImageCropper from 'react-avatar-image-cropper';




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
   display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
   // width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#173e43"
  },
}));



export default function Profile( { createUserFromApp,accountAddress, accountBalance,nameIsUsed ,emailIsUsed}) {
  const classes = useStyles();

  const[userName,setUserName]=useState("");
  const[bio,setBio]=useState("");
  const[social,setSocial]=useState("");
  const[repo,setRepo]=useState("");
  const[email,setEmail]=useState("");
  const[buffer,setBuffer]=useState("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX");
  const[src,setSrc]=useState("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX");
  const [emailError, setEmailError] = useState(false);
  const [clickedChange,setClickedChange]=useState(false);
  

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
  
  
  const handleSubmit2=(e)=>{
    e.preventDefault();
    console.log(buffer)
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    
    const em=validateEmail(email);
    console.log(em)
    if(em){
      
      createUserFromApp(userName,email,social,repo,bio,buffer);
    }

    console.log(userName,email,social,repo,bio,buffer)
    
  }
  
  
  const apply = (file) => {
    
    // handle the blob file you want
    // such as get the image src
    console.log(file);
    
    setBuffer(file);
     var src = window.URL.createObjectURL(file);
     setSrc(src);
     setClickedChange(false)
 console.log('buffer', buffer)
// }
  }
  
  return (
    <div style={{padding:"1%"}}>
   
        <div style={{display:"flex",justifyContent:"center"}}>
     {clickedChange?( <form onSubmit={handleSubmit2} style={{display:"contents"}}>
        <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid black' }}>
         
        <AvatarImageCropper apply={apply} text={"Change"} />
        
          </div> 
          </form>  ):( <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid black' }}>
         <img src={src} alt="Preview" name="userAvatarHash"/>
          </div> )}
       
          
         
        </div>
        <div style={{display:"flex",justifyContent:"space-around"}}>
        
           <IconButton color="primary"  style={{float:"left"}}component="span" style={{float:"left",color:"#173e43"}}onClick={()=>{setBuffer("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX");setSrc("https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX")}}>
          <HighlightOffIcon style={{fontSize:"-webkit-xxx-large"}}/>
        </IconButton>
           
           <IconButton color="primary" aria-label="upload picture" component="span" style={{float:"left",color:"#173e43"}}onClick={()=>{setClickedChange(true)}}>
          <PhotoCamera style={{fontSize:"-webkit-xxx-large"}}/>
        </IconButton>

          </div>  
        <form validate style={{padding:"1%"}}onSubmit={handleSubmit}>
           <CssBaseline />
      <div className={classes.paper}>
     
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
               
                error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

          <TextField
            variant="outlined"
            
            required
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            
            id="userEmail"
            label="Email Address"
            name="userEmail"
            error={emailError||emailIsUsed}
            autoComplete="email"
            autoFocus
          />
            
        </div>
        <br/>
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <TextField
                
                name="userSocial"
                variant="outlined"
                required
                value={social}
                onChange={(e)=>{setSocial(e.target.value)}}
                
                id="userSocial"
                label="Social Media Link"
                autoFocus
          />

          <TextField
            variant="outlined"
            id="userRepo"
            value={repo}
            onChange={(e)=>{setRepo(e.target.value)}}
            
            label="Custom URL"
            name="userRepo" 
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
          
          name="userBio"
          rowsMax={4}
          variant="outlined"
        
        />
         </div>
         <div style={{display:"flex",justifyContent:"space-evenly"}}>
          <Button
            type="submit"
           
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Create Profile
          </Button>
        </div>
        
        </div>
      </div>
      <div className="mt-4">
           {nameIsUsed ? (
             <div className="alert alert-danger ">
               <button
                 type="button"
                 className="close"
                 data-dismiss="alert"
                  onClick={()=>setUserName("")}
               >
                 <span>&times;</span>
               </button>
               <strong>This name is taken!</strong>
             </div>
           ) :     
             null}
         </div>
         <div className="mt-4">
           {emailIsUsed ? (
             <div className="alert alert-danger ">
               <button
                 type="button"
                 className="close"
                 data-dismiss="alert"
                 onClick={()=>setEmail("")}

               >
                 <span>&times;</span>
               </button>
               <strong>This email is taken!</strong>
             </div>
           ) :     
             null}
         </div>
      </form>
    
   </div>
  );
}

      