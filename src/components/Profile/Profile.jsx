import React,{useState} from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Avatar from 'react-avatar-edit'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  },
}));



export default function Profile( { createUserFromApp,accountAddress, accountBalance,nameIsUsed }) {
  const classes = useStyles();
  const[preview,setPreview]=useState(null);
  const[src,setSrc]=useState("");
  const[userName,setUserName]=useState("");
  const[bio,setBio]=useState("");
  const[social,setSocial]=useState("");
  const[repo,setRepo]=useState("");
  const[email,setEmail]=useState("");
  const[buffer,setBuffer]=useState(null);

  const onClose=()=> {
    setPreview(null)
  }
  
  const onCrop=(preview)=> {
    setPreview(preview)
    console.log(preview)
  }

  const onBeforeFileLoad=(elem)=> {
    if(elem.target.files[0].size > 71680){
      alert("File is too big!");
      elem.target.value = "";
    };
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(userName,email,social,repo,bio,buffer)
    createUserFromApp(userName,buffer,email,social,repo,bio);
  }
  const captureFile=(event)=> {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      setBuffer( Buffer(reader.result) )
      console.log('buffer', buffer)
    }
  }
  return (
    <div style={{padding:"1%"}}>
    <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          {/* <h5>
            Total No. of Designs They Own : {myAllCryptoBoys.length}
          </h5> */}
           <h5>
           Profile
          </h5>
        </div>
        </div>  
        <form validate style={{padding:"1%"}}onSubmit={handleSubmit}>
        {/* <div  className="d-flex  p-4  mt-1 border ">
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
       </div>  */}
       <input type='file' multiple={true} onChange={captureFile} />
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
           // href="/account"
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
      </form>
      <Box mt={8}>
        <Copyright />
      </Box>
   </div>
  );
}

      