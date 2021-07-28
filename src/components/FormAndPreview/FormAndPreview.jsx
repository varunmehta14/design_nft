import React, { Component,useEffect,useState } from "react";
import clsx from 'clsx';
//import {create} from 'doka';
import {useDropzone} from 'react-dropzone';

import {Paper,FormControl,InputLabel,Input,TextField,Grid,IconButton,InputAdornment,FormHelperText,Button} from '@material-ui/core';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp';
import AllInclusiveSharpIcon from '@material-ui/icons/AllInclusiveSharp';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';




const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  //marginTop: 16,
 // padding: 20,
  justifyContent:"center",
  height:"fitContent",
  width:"fitContent"

};

const thumb = {
  position: "relative",
  display: "contents",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: "auto",
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
  width: "100%",
  height: "100%"
};

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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
     display: 'contents',
     justifyContent:"center"
    },
  },
  sectionMobile: {
   display: 'contents',
  
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function FormAndPreview(props) {
 //console.log(props.imageIsUsed)
  
 
    const classes =useStyles();
  
    const [cryptoBoyName,setCryptoBoyName] = useState("");
    const [cryptoBoyPrice,setCryptoBoyPrice] = useState("");
    const [cryptoBoyDressPrice,setCryptoBoyDressPrice] = useState("");
    const [cryptoBoyDescription,setCryptoBoyDescription] = useState("");
    const [buffer,setBuffer] = useState(null);
    const [finalbuffer,setFinalbuffer] = useState([]);
    const [receivePrice, setReceivePrice] = useState("");
    const [cryptoBoyCopies,setCryptoBoyCopies] = useState(0);
    const [files, setFiles] = useState([]);
    const [fileName,setFileName]=useState("");
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
 const captureFile=(event)=> {
  event.preventDefault()
  
  const files = event.target.files
  setFileName(files[0].name);
  console.log(fileName)
  const buffer2= [];
  for(let i=0;i<files.length;i++){
  const reader = new FileReader()
  reader.readAsArrayBuffer(files[i])
  reader.onloadend = () => {
   // console.log('buffer', buffer2)
   buffer2.push(Buffer(reader.result))
    //setBuffer2(...buffer2, Buffer(reader.result))
    console.log('buffer', buffer2)
  }
  }
  setFinalbuffer(buffer2);
  
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

  const callMintMyNFTFromApp  = (e) => {
    e.preventDefault();
    
    console.log(buffer,cryptoBoyName,cryptoBoyDescription,cryptoBoyPrice,cryptoBoyDressPrice,finalbuffer)
    props.mintMyNFT(
      cryptoBoyName,
      cryptoBoyDescription,
      buffer,
      cryptoBoyPrice,
      cryptoBoyDressPrice,
      finalbuffer,
     // cryptoBoyCopies
    );
  };

  const renderMobile=(
    <div style={{padding:"0.5%"}}>
   {show?(<> <div className="card mt-1">
      <div className="card-body  
      
      ">
        <h3 style={{display:"flex",justifyContent:"center"}}>Create Collectible</h3>
        
        Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one collectible multiple times
        
      </div>
    </div></>):null}
   
   {show ?(<div style={{padding:"0.5%"}}> <div className="p-4 mt-1 border" style={{display:"grid"}}>
   
  
     
     
       <button className="mt-3 btn btn-outline-primary" type="button" onClick={()=>{setSingle(true);setMultiple(false);setShow(false)}}>
         Single 
       </button>
       
       <button className="mt-3 btn btn-outline-primary" type="button" onClick={()=>{setMultiple(true);setSingle(false);setShow(false)}}>
         Multiple 
       </button>
       
     
     </div></div>):(null)}

     {single?
     (<>
     <div className="card mt-1">
      <div className="card-body   
      
      "><div style={{textAlign:"center"}}>
       
        {/* <Button variant="contained"color="default" style={{float:"left"}}onClick={()=>{setSingle(false);setShow(true)}}>
        ← Back
       </Button> */}
      
       <IconButton color="primary"  component="span" style={{float:"left",color:"#173e43"}}onClick={()=>{setSingle(false);setShow(true)}}>
      <ArrowBackIosSharpIcon fontSize="small"/>
    </IconButton> 
  
      
        <h3 style={{justifyContent:"center"}}>Create Single Collectible</h3>
        </div>
       <br/>
        Your collectible will be one of a kind 

      </div>
    </div>
    
     <form onSubmit={callMintMyNFTFromApp} style={{padding:"0.5%"}}className="pt-4 mt-1">
    
         
    <div style={{padding:"0.5%"}} >
    <Grid container spacing={3}>
    <Grid item xs={12}><Paper  style={{height:"fitContent",padding:"2%",backgroundColor:"ghostwhite"}}>
     <span>Upload file to view preview</span>    
<aside style={thumbsContainer}>{thumbs}</aside></Paper></Grid>
    <Grid item xs={12}>
     <Paper variant="outlined" style={{padding:"inherit",backgroundColor:"ghostwhite"}}>
     
     
     <div style={{margin:"2%"}}>
          <div {...getRootProps({ className: "dropzone" })}>
<input {...getInputProps()}   />
{fileName?(<span>{fileName} </span>):( <span>Drag 'n' drop some files here, or click to select files</span>)}

</div>

         <br/><br/><hr/>
         
    
<TextField
 id="standard-adornment-amount"
 label="Title"
 
 
 
 value={cryptoBoyName}
 onChange={(e)=>setCryptoBoyName(e.target.value)}
/>
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
<div style={{display:"flex",justifyContent:"space-evenly"}}> 

<Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20,display:"flow-root"}}
//type="submit"
>
<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>
Fixed Price
</Button>
  {/* <IconButton  ><LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>  Fixed Price </IconButton></div> */}

  <Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20,display:"flow-root"}}
//type="submit"
disabled
>
<AccessTimeSharpIcon  fontSize="large"/>
Timed Auction
</Button>
{/* <IconButton disabled> <AccessTimeSharpIcon  color="disabled"fontSize="large"/><div style={{fontSize:"larger"}}>  Timed Auction </div></IconButton> */}

<Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20,display:"flow-root"}}
//type="submit"
disabled
>
<AllInclusiveSharpIcon  fontSize="large"/>
Unlimited Auction
</Button>
{/* <IconButton disabled > <AllInclusiveSharpIcon color="disabled" fontSize="large"/><div style={{fontSize:"larger"}}>  Unlimited Auction</div> </IconButton> */}

</div> 

<hr/>

<br/>
<TextField
 label="Price"
 id="standard-start-adornment"
 placeholder="Enter price for one piece"
// className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}
 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
 }}
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
<br/>
<hr/>
<h2>Upload Image</h2>
          
<input type='file' multiple={true} onChange={captureFile} />
      <hr/>      
          
<div style={{textAlign:"center"}}>
<Button
variant="contained"
color="default"
//className={classes.button}
startIcon={<AddIcon />}
style={{borderRadius:20,backgroundColor:"#173e43",color:"ghostwhite"}}

type="submit"
>
Create Item
<br/> ERC 721
</Button>
</div>
</div>
       </Paper>
      
       </Grid>
    
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
      
      "><div style={{textAlign:"center"}}>
        {/* <Button variant="contained"color="default" style={{float:"left"}} onClick={()=>{setMultiple(false);setShow(true)}}>
        ← Back
       </Button> */}
       <IconButton color="primary"  component="span" style={{float:"left",color:"#173e43"}}onClick={()=>{setMultiple(false);setShow(true)}}>
      <ArrowBackIosSharpIcon />
    </IconButton> 
        <h3 style={{justifyContent:"center"}}>Create Multiple Collectibles</h3>
        </div>
        <br/>
        You can sell one collectible multiple times 

      </div>
    </div>
    <form onSubmit={callMintMyNFTFromApp} style={{padding:"0.5%"}}className="pt-4 mt-1">
    
         
    <div  style={{padding:"0.5%"}}>
    <Grid container spacing={3}>
    <Grid item xs={12}><Paper  style={{height:"fitContent",padding:"2%",backgroundColor:"ghostwhite"}}>
     <span>Upload file to view preview</span>    
<aside style={thumbsContainer}>{thumbs}</aside></Paper></Grid>
    <Grid item xs={12}>
     <Paper variant="outlined" style={{padding:"inherit",backgroundColor:"ghostwhite"}}>
     
     <div style={{margin:"2%"}}>
     
          <div {...getRootProps({ className: "dropzone" })}>
<input {...getInputProps()}   />
{fileName?(<span>{fileName} </span>):( <span>Drag 'n' drop some files here, or click to select files</span>)}

</div>
         <br/><br/><hr/>
       
<TextField
 id="standard-multiline-flexible"
 label="Title"
 //fullWidth
 //rowsMax={4}
 value={cryptoBoyName}
 onChange={(e)=>setCryptoBoyName(e.target.value)}
/>
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


<div style={{display:"flex",justifyContent:"space-evenly"}}> 

<Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20,display:"flow-root"}}
//type="submit"
>
<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>
Fixed Price
</Button>
  {/* <IconButton  ><LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>  Fixed Price </IconButton></div> */}

  <Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20,display:"flow-root"}}
//type="submit"
disabled
>
<AccessTimeSharpIcon  fontSize="large"/>
Timed Auction
</Button>
{/* <IconButton disabled> <AccessTimeSharpIcon  color="disabled"fontSize="large"/><div style={{fontSize:"larger"}}>  Timed Auction </div></IconButton> */}

<Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20,display:"flow-root"}}
//type="submit"
disabled
>
<AllInclusiveSharpIcon  fontSize="large"/>
Unlimited Auction
</Button>
{/* <IconButton disabled > <AllInclusiveSharpIcon color="disabled" fontSize="large"/><div style={{fontSize:"larger"}}>  Unlimited Auction</div> </IconButton> */}

</div> 


<hr/>


<br/><div  style={{textAlign:"center"}}>
 <div>
<TextField
 label="Price"
 id="standard-start-adornment"
 placeholder="Enter price for one piece"
 className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}
 InputProps={{
   startAdornment: <InputAdornment position="start" >Ξ</InputAdornment>,
 }}
/><FormHelperText id="filled-weight-helper-text"style={{textAlign:"center"}}>Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
</div>
<hr/>
<div>
<TextField
      id="standard-number"
      label="Enter number of Copies"
      type="number"
      onChange={(e)=>{setCryptoBoyCopies(e.target.value)}}
      InputLabelProps={{
        shrink: true,
      }}
  />
  </div>
</div>    
<br/>
<hr/>
<h2>Upload Image</h2>
          
          <input type='file' multiple={true} onChange={captureFile} />
          <hr/>
<div style={{textAlign:"center"}}>
<Button
variant="contained"
color="default"
className={classes.button}
startIcon={<AddIcon />}
style={{borderRadius:20,backgroundColor:"#173e43",color:"ghostwhite"}}
type="submit"
>
Create Item
<br/> ERC 1155
</Button>
</div>
</div>
       </Paper>
      
       </Grid>
       
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
 
  const renderDesktop=(
    <div style={{padding:"0.5%"}}>
    {show?(<> <div className="card mt-1">
      <div className="card-body  
      
      ">
        <h3 style={{display:"flex",justifyContent:"center"}}>Create Collectible</h3>
        
        Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one collectible multiple times
        
      </div>
    </div></>):null}
   
   {show ?(<div style={{padding:"0.5%"}}> <div className="p-4 mt-1 border" style={{display:"flex",justifyContent:"space-evenly"}}>
   
  
     
     
       <button className="mt-3 btn btn-outline-primary" type="button" onClick={()=>{setSingle(true);setMultiple(false);setShow(false)}}>
         Single 
       </button>
       
       <button className="mt-3 btn btn-outline-primary" type="button" onClick={()=>{setMultiple(true);setSingle(false);setShow(false)}}>
         Multiple 
       </button>
       
     
     </div></div>):(null)}
   
    
     {single?
     (<>
     <div className="card mt-1">
      <div className="card-body   
      
      "><div style={{textAlign:"center"}}>
       
        {/* <Button variant="contained"color="default" style={{float:"left"}}onClick={()=>{setSingle(false);setShow(true)}}>
        ← Back
       </Button> */}
      
       <IconButton color="primary"  component="span" style={{float:"left",color:"#173e43"}}onClick={()=>{setSingle(false);setShow(true)}}>
      <ArrowBackIosSharpIcon />
    </IconButton> 
  
      
        <h3 style={{justifyContent:"center"}}>Create Single Collectible</h3>
        </div>
       <br/>
        Your collectible will be one of a kind 

      </div>
    </div>
    
     <form onSubmit={callMintMyNFTFromApp} style={{padding:"0.5%"}}className="pt-4 mt-1">
    
         
    <div  >
    <Grid container spacing={3}>
    <Grid item xs={9}>
     <Paper variant="outlined" style={{padding:"inherit",backgroundColor:"ghostwhite"}}>
     
     
     <div style={{margin:"1%"}}>
          <div {...getRootProps({ className: "dropzone" })}>
<input {...getInputProps()}   />
{!files?(<span>{files[0].name} </span>):( <span>Drag 'n' drop some files here, or click to select files</span>)}

</div>

         <br/><br/><hr/>
         
<TextField
 id="standard-multiline-flexible"
 label="Title"
 
 //rowsMax={4}
 value={cryptoBoyName}
 onChange={(e)=>setCryptoBoyName(e.target.value)}
/>

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
<hr/>
<div style={{display:"flex",justifyContent:"space-evenly"}}> 

<Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20}}
//type="submit"
>
<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>
Fixed Price
</Button>
  {/* <IconButton  ><LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>  Fixed Price </IconButton></div> */}

  <Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20}}
//type="submit"
disabled
>
<AccessTimeSharpIcon  fontSize="large"/>
Timed Auction
</Button>
{/* <IconButton disabled> <AccessTimeSharpIcon  color="disabled"fontSize="large"/><div style={{fontSize:"larger"}}>  Timed Auction </div></IconButton> */}

<Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20}}
//type="submit"
disabled
>
<AllInclusiveSharpIcon  fontSize="large"/>
Unlimited Auction
</Button>
{/* <IconButton disabled > <AllInclusiveSharpIcon color="disabled" fontSize="large"/><div style={{fontSize:"larger"}}>  Unlimited Auction</div> </IconButton> */}

</div> 

<hr/>

<br/>
<div style={{display:"flex",justifyContent:"space-evenly"}}>
<div>
<TextField
 label="Price"
 id="standard-start-adornment"
 placeholder="Enter price for one piece"
 className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}
 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
 }}
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
</div>
<div>
<TextField
 label="Price with Dress"
 id="standard-start-adornment"
 placeholder="Enter price for one piece with dress"
// className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyDressPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}
 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
 }}
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyDressPrice-receivePrice} ETH</b></FormHelperText>
</div>
</div>

<br/>
<hr/>
<h2>Upload Image</h2>
          
<input type='file' multiple={true} onChange={captureFile} />
            
   <hr/>       
<div style={{textAlign:"center"}}>
<Button
variant="contained"
color="default"
//className={classes.button}
startIcon={<AddIcon />}
style={{borderRadius:20,backgroundColor:"#173e43",color:"ghostwhite"}}

type="submit"
>
Create Item
<br/> ERC 721
</Button>
</div>
</div>

       </Paper>
      
       </Grid>
       <Grid item xs={3}><Paper  style={{height:"fitContent",padding:"2%",backgroundColor:"ghostwhite"}}>
         
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
      
      "><div style={{textAlign:"center"}}>
        {/* <Button variant="contained"color="default" style={{float:"left"}} onClick={()=>{setMultiple(false);setShow(true)}}>
        ← Back
       </Button> */}
       <IconButton color="primary"  component="span" style={{float:"left",color:"#173e43"}}onClick={()=>{setMultiple(false);setShow(true)}}>
      <ArrowBackIosSharpIcon />
    </IconButton> 
        <h3 style={{justifyContent:"center"}}>Create Multiple Collectibles</h3>
        </div>
        <br/>
        You can sell one collectible multiple times 

      </div>
    </div>
    <form onSubmit={callMintMyNFTFromApp} className="pt-4 mt-1">
    
         
    <div  >
    <Grid container spacing={3}>
    <Grid item xs={9}>
     <Paper variant="outlined" style={{padding:"inherit",backgroundColor:"ghostwhite"}}>
     
     <div style={{margin:"1%"}}>
     
          <div {...getRootProps({ className: "dropzone" })}>
<input {...getInputProps()}   />
{!files?(<span>{files[0].name} </span>):( <span>Drag 'n' drop some files here, or click to select files</span>)}

</div>
         <br/><br/><hr/>
       
<TextField
 id="standard-multiline-flexible"
 label="Title"
 //fullWidth
 //rowsMax={4}
 value={cryptoBoyName}
 onChange={(e)=>setCryptoBoyName(e.target.value)}
/>
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

<hr/>
<div style={{display:"flex",justifyContent:"space-evenly"}}> 

<Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20}}
//type="submit"
>
<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>
Fixed Price
</Button>
  {/* <IconButton  ><LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>  Fixed Price </IconButton></div> */}

  <Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20}}
//type="submit"
disabled
>
<AccessTimeSharpIcon  fontSize="large"/>
Timed Auction
</Button>
{/* <IconButton disabled> <AccessTimeSharpIcon  color="disabled"fontSize="large"/><div style={{fontSize:"larger"}}>  Timed Auction </div></IconButton> */}

<Button
variant="contained"
color="default"
className={classes.button}
//startIcon={<LocalOfferOutlinedIcon style={{textAlign:"center"}}fontSize="large"/>}
style={{borderRadius:20}}
//type="submit"
disabled
>
<AllInclusiveSharpIcon  fontSize="large"/>
Unlimited Auction
</Button>
{/* <IconButton disabled > <AllInclusiveSharpIcon color="disabled" fontSize="large"/><div style={{fontSize:"larger"}}>  Unlimited Auction</div> </IconButton> */}

</div> 

<hr/>


<br/><div  style={{display:"flex",justifyContent:"space-evenly"}}>
 <div>
<TextField
 label="Price"
 id="standard-start-adornment"
 placeholder="Enter price for one piece"
 className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}
 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
 }}
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
</div>

<div>
<TextField
      id="standard-number"
      label="Enter number of Copies"
      type="number"
      onChange={(e)=>{setCryptoBoyCopies(e.target.value)}}
      InputLabelProps={{
        shrink: true,
      }}
  />
  </div>
</div>    
<br/>
<hr/>
<h2>Upload Image</h2>
          
          <input type='file' multiple={true} onChange={captureFile} />
<div style={{textAlign:"center"}}>
<Button
variant="contained"
color="default"
className={classes.button}
startIcon={<AddIcon />}
style={{borderRadius:20,backgroundColor:"#173e43",color:"ghostwhite"}}
type="submit"
>
Create Item
<br/> ERC 1155
</Button>
</div>
</div>
       </Paper>
      
       </Grid>
       <Grid item xs={3}  style={{height:"fitContent", width:"fitContent"}}>
         <Paper  style={{height:"fitContent", width:"fitContent",padding:"2%",backgroundColor:"ghostwhite"}}>
     <span>Upload file to view preview</span>    
<aside style={thumbsContainer}>{thumbs}</aside></Paper>
</Grid>
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
           
}