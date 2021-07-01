import React, { Component,useEffect,useState } from "react";
import clsx from 'clsx';
//import {create} from 'doka';
import {useDropzone} from 'react-dropzone';
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage";
import {Paper,FormControl,InputLabel,Input,TextField,Grid,IconButton,InputAdornment,FormHelperText,Button} from '@material-ui/core';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp';
import AllInclusiveSharpIcon from '@material-ui/icons/AllInclusiveSharp';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'



const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  padding: 20,
  justifyContent:"center"

};

const thumb = {
  position: "relative",
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  // width: 100,
 // height: "auto",
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

// const thumbButton = {
//   position: "absolute",
//   right: 10,
//   bottom: 10,
//   background: "rgba(0,0,0,.8)",
//   color: "#fff",
//   border: 0,
//   borderRadius: ".325em",
//   cursor: "pointer"
// };

// const editImage = (image, done) => {
//   const imageFile = image.doka ? image.doka.file : image;
//   const imageState = image.doka ? image.doka.data : {};
//   create({
//     // recreate previous state
//     ...imageState,

//     // load original image file
//     src: imageFile,
//     outputData: true,

//     onconfirm: ({ file, data }) => {
//       Object.assign(file, {
//         doka: { file: imageFile, data }
//       });
//       done(file);
//     }
//   });
// };
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
  {
    value: 'ETH',
    label: 'Ξ',
  },
];

export default function FormAndPreview(props) {
 //console.log(props.imageIsUsed)
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    paper: {
      
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
 
 
  
    const [cryptoBoyName,setCryptoBoyName] = useState("");
    const [cryptoBoyPrice,setCryptoBoyPrice] = useState("");
    const [cryptoBoyDescription,setCryptoBoyDescription] = useState("");
    const [buffer,setBuffer] = useState(null);
    const [receivePrice, setReceivePrice] = useState("");
    const [cryptoBoyCopy,setCryptoBoyCopies] = useState(0);
    const [files, setFiles] = useState([]);
    const [single,setSingle]=useState(false);
    const [multiple,setMultiple]=useState(false);
    const [show,setShow]=useState(true);
    //const [preview,setPreview]=useState([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        acceptedFiles.map((file)=>{ 
          const reader = new FileReader()
          reader.readAsArrayBuffer(file)
          reader.onloadend = () => {
        setBuffer( Buffer(reader.result) )
        //console.log('buffer', buffer)
      }})

      }
    });
   
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));


  // componentDidMount = async () => {
  //   await this.props.setMintBtnTimer();
  // };
  async function funA() {
    await props.setMintBtnTimer();
  }
 useEffect(()=>{
 funA();
 },[]);
 useEffect(
  () => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  },
  [files]
);

  const callMintMyNFTFromApp = (e) => {
    e.preventDefault();
    console.log(buffer,cryptoBoyName,cryptoBoyDescription,cryptoBoyPrice)
    props.mintMyNFT(
      cryptoBoyName,
      cryptoBoyDescription,
      buffer,
      cryptoBoyPrice
    );
  };
  // const receive=(cryptoBoyPrice)=>{
  //   let receivePrice=(cryptoBoyPrice*2.5)/100;
    
  // }
  
  
  
 
   
    return (
      
      <div>
        {show?(<> <div className="card mt-1">
          <div className="card-body  
          
          ">
            <h3 style={{display:"flex",justifyContent:"center"}}>Create Collectible</h3>
            
            Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one collectible multiple times
            
          </div>
        </div></>):null}
       
       {show ?(<> <div className="p-4 mt-1 border" style={{display:"flex"}}>
       
       <div className="col-md-6" >
         
         
           <button className="mt-3 btn btn-outline-primary" type="button" onClick={()=>{setSingle(true);setMultiple(false);setShow(false)}}>
             Single
           </button>
         
       </div>
       <div className="col-md-6">
        
       
           
           <button className="mt-3 btn btn-outline-primary" type="button" onClick={()=>{setMultiple(true);setSingle(false);setShow(false)}}>
             Multiple
           </button>
          
        
         </div>
         </div></>):(null)}
       
        
         {single?
         (<>
         <div className="card mt-1">
          <div className="card-body   
          
          "><div style={{display:"flex"}}>
            <Button variant="contained"color="default" onClick={()=>{setSingle(false);setShow(true)}}>
             Manage Collectible Type
           </Button>
            <h3 style={{justifyContent:"center"}}>Create Single Collectible</h3>
            </div>
            Your collectible will be one of a kind 

          </div>
        </div>
        
         <form onSubmit={callMintMyNFTFromApp} className="pt-4 mt-1">
        
             
        <div className={useStyles.root} >
        <Grid container spacing={3}>
        <Grid item xs={9}>
         <Paper variant="outlined" >
         
         
         
              <div {...getRootProps({ className: "dropzone" })}>
   <input {...getInputProps()}   />
   {!files?(<span>{files[0].name} </span>):( <span>Drag 'n' drop some files here, or click to select files</span>)}
 
 </div>
             <br/><br/>
             <FormControl fullWidth className={useStyles.margin} >
     <InputLabel htmlFor="standard-adornment-amount">Title</InputLabel>
     <Input
       id="standard-adornment-amount"
       value={cryptoBoyName}
       onChange={(e)=>setCryptoBoyName(e.target.value)}
      
     />
   </FormControl>
   <br/>
   <TextField
     id="standard-multiline-flexible"
     label="Description"
     multiline
     fullWidth
     rowsMax={4}
     value={cryptoBoyDescription}
     onChange={(e)=>setCryptoBoyDescription(e.target.value)}
   />
   <br/><br/>
   <Grid container spacing={3}>
    
    <Grid item xs={4} >
    <Paper className={useStyles.paper}><IconButton  ><LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/><div style={{fontSize:20}}>  Fixed Price</div> </IconButton></Paper>
   </Grid>
   <Grid item xs={4}>
   <Paper className={useStyles.paper}><IconButton disabled> <AccessTimeSharpIcon  color="disabled"fontSize="large"/><div style={{fontSize:20}}>  Timed Auction </div></IconButton></Paper>
   </Grid>
   <Grid item xs={4}>
   <Paper className={useStyles.paper}><IconButton disabled > <AllInclusiveSharpIcon color="disabled" fontSize="large"/><div style={{fontSize:20}}>  Unlimited Auction</div> </IconButton></Paper>
   </Grid>
   
  
   
   </Grid>   
  
   <br/>
    <TextField
     label="Price"
     id="standard-start-adornment"
     placeholder="Enter price for one piece"
     className={clsx(useStyles.margin, useStyles.textField)}
     onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}
     InputProps={{
       startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
     }}
   /><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
   <br/>
   <div style={{textAlign:"center"}}>
   <Button
   variant="contained"
   color="default"
   className={useStyles.button}
   startIcon={<AddIcon />}
   style={{borderRadius:20}}
   type="submit"
 >
   Create Item
 </Button>
 
</div>
           </Paper>
          
           </Grid>
           <Grid item xs={3}><Paper className={useStyles.paper} style={{height:"fitContent"}}>
         <span>Upload file to view preview</span>    
 <aside style={thumbsContainer}>{thumbs}</aside></Paper></Grid>
           </Grid>
           </div>
            
         <div className="mt-4">
           {props.imageIsUsed ? (
             <div className="alert alert-danger alert-dissmissible">
               <button
                 type="button"
                 className="close"
                 data-dismiss="alert"
               >
                 <span>&times;</span>
               </button>
               <strong>This image is taken!</strong>
             </div>
           ) :     
             null}
         </div>
   </form>
         </>)
         :multiple?
         (<>
        <div className="card mt-1">
          <div className="card-body   
          
          "><div style={{display:"flex"}}>
            <Button variant="contained"color="default" onClick={()=>{setMultiple(false);setShow(true)}}>
             Manage Collectible Type
           </Button>
            <h3 style={{justifyContent:"center"}}>Create Multiple Collectibles</h3>
            </div>
            You can sell one collectible multiple times 

          </div>
        </div>
        <form onSubmit={callMintMyNFTFromApp} className="pt-4 mt-1">
        
             
        <div className={useStyles.root} >
        <Grid container spacing={3}>
        <Grid item xs={9}>
         <Paper variant="outlined" >
         
         
         
              <div {...getRootProps({ className: "dropzone" })}>
   <input {...getInputProps()}   />
   {!files?(<span>{files[0].name} </span>):( <span>Drag 'n' drop some files here, or click to select files</span>)}
 
 </div>
             <br/><br/>
             <FormControl fullWidth className={useStyles.margin} >
     <InputLabel htmlFor="standard-adornment-amount">Title</InputLabel>
     <Input
       id="standard-adornment-amount"
       value={cryptoBoyName}
       onChange={(e)=>setCryptoBoyName(e.target.value)}
      
     />
   </FormControl>
   <br/>
   <TextField
     id="standard-multiline-flexible"
     label="Description"
     multiline
     fullWidth
     rowsMax={4}
     value={cryptoBoyDescription}
     onChange={(e)=>setCryptoBoyDescription(e.target.value)}
   />
   <br/><br/>
   <Grid container spacing={3}>
    
    <Grid item xs={4} >
    <Paper className={useStyles.paper}><IconButton  ><LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/><div style={{fontSize:20}}>  Fixed Price</div> </IconButton></Paper>
   </Grid>
   <Grid item xs={4}>
   <Paper className={useStyles.paper}><IconButton disabled> <AccessTimeSharpIcon  color="disabled"fontSize="large"/><div style={{fontSize:20}}>  Timed Auction </div></IconButton></Paper>
   </Grid>
   <Grid item xs={4}>
   <Paper className={useStyles.paper}><IconButton disabled > <AllInclusiveSharpIcon color="disabled" fontSize="large"/><div style={{fontSize:20}}>  Unlimited Auction</div> </IconButton></Paper>
   </Grid>
   
  
   
   </Grid>   
  
   <br/><div>
    <TextField
     label="Price"
     id="standard-start-adornment"
     placeholder="Enter price for one piece"
     className={clsx(useStyles.margin, useStyles.textField)}
     onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}
     InputProps={{
       startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
     }}
   /><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
    
   </div>
   <hr/>
   <TextField
          id="standard-number"
          label="Enter number of Copies"
          type="number"
          onChange={(e)=>{setCryptoBoyCopies(e.target.value)}}
          InputLabelProps={{
            shrink: true,
          }}
        />
   <br/>
   <div style={{textAlign:"center"}}>
   <Button
   variant="contained"
   color="default"
   className={useStyles.button}
   startIcon={<AddIcon />}
   style={{borderRadius:20}}
   type="submit"
 >
   Create Item
 </Button>
 
</div>
           </Paper>
          
           </Grid>
           <Grid item xs={3}><Paper className={useStyles.paper} style={{height:"fitContent"}}>
         <span>Upload file to view preview</span>    
 <aside style={thumbsContainer}>{thumbs}</aside></Paper></Grid>
           </Grid>
           </div>
            
         <div className="mt-4">
           {props.imageIsUsed ? (
             <div className="alert alert-danger alert-dissmissible">
               <button
                 type="button"
                 className="close"
                 data-dismiss="alert"
               >
                 <span>&times;</span>
               </button>
               <strong>This image is taken!</strong>
             </div>
           ) :     
             null}
         </div>
   </form></>):(null)}
        
      </div>
    );
           
}



