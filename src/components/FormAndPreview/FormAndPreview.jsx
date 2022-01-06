import React, { Component,useEffect,useState } from "react";
import clsx from 'clsx';
//import {create} from 'doka';
import {useDropzone} from 'react-dropzone';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Paper,FormControl,InputLabel,Input,TextField,Grid,IconButton,InputAdornment,FormHelperText,Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'
import 'react-dropdown-tree-select/dist/styles.css';
import sizeData from '../sizeData.json'
import SizeContainer from '../DropdownContainer2/DropdownContainer2';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Select from "react-select";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  //marginTop: 16,
 // padding: 20,
  justifyContent:"center",
  height:"fitContent",
  width:"fitContent",

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
  height: "100%",
  borderImage:'url(https://i.pinimg.com/600x315/ef/07/ab/ef07abb1c1b5a31a3ab2927a4ced46b4.jpg)'
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
  paper2: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight:"100%",
    overflow:"auto",
    height:"80%",
    width:"70%"
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontFamily:"inherit"
},

button :{backgroundImage: "linear-gradient(to right, #02AAB0 0%, #00CDAC  51%, #02AAB0  100%)",
margin: '10px',
// padding: '15px 45px',
textAlign: 'center',
textTransform: 'uppercase',
transition: '0.5s',
backgroundSize: '200% auto',
color: 'white',            
boxShadow: '0 0 20px #eee',
borderRadius: '10px',
display: 'flex'}





}));


export default function FormAndPreview(props) {
 console.log(props)
  
 
    const classes =useStyles();
  
    const [cryptoBoyName,setCryptoBoyName] = useState("");
    const [cryptoBoyPrice,setCryptoBoyPrice] = useState("");
    const [cryptoBoyDressPrice,setCryptoBoyDressPrice] = useState(0);
    const [cryptoBoyDescription,setCryptoBoyDescription] = useState("");
    const [buffer,setBuffer] = useState(null);
    const [finalbuffer,setFinalbuffer] = useState([]);
    const [receivePrice, setReceivePrice] = useState("");
    const [receivePrice2, setReceivePrice2] = useState("");
    const [files, setFiles] = useState([]);
    const [fileName,setFileName]=useState("");
    const [single,setSingle]=useState(true);
    
    const [show,setShow]=useState(true);
    const [categories,setCategories]=useState("");
    const [sizeChart,setSizeChart]=useState([]);
    const [amount,setAmount]=useState(1);
    const [aler,setAler]=useState(props.imageIsUsed);
    const [imageUsed,setImageUsed]=useState(props.imageIsUsed)
    //const [preview,setPreview]=useState([]);

    const options = [
      { value: "fashionDesign", label: "Fashion Design" },
      { value: "art", label: "Art" },
      { value: "photoGraph", label: "Photograph" }
    ];

    const handleCategory=selectedOption=>{
      if(selectedOption){
      console.log(selectedOption)
      setCategories(selectedOption.value);
      console.log(categories)
      }
      else{
        setCategories("");
      }
    }
    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        console.log("files",files)
        acceptedFiles.map((file)=>{ 
          const reader = new FileReader()
          reader.readAsArrayBuffer(file)
          reader.onloadend = () => {
        setBuffer( Buffer(reader.result) )
        console.log('buffer', buffer)
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
 useEffect(()=>{
  
  },[props.imageIsUsed,props.nameIsUsed]);
 const captureFile=(event)=> {
  event.preventDefault()
  
  const files = event.target.files
  setFileName(files[0].name);
  console.log("file name",fileName)
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

 useEffect( 
  () => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  },
  [files]
);

const onChange = (currentNode, selectedNodes) => {
  const loc=selectedNodes.map(x=>x.value);
  console.log(loc);
  setCategories(loc);
  
  console.log('onChange::', currentNode, selectedNodes)
}
const onChangeSize = (currentNode, selectedNodes) => {
  let loc=[];
  selectedNodes.map(x=>{
    if(Array.isArray(x.value)){
      loc.push(Array.prototype.concat.apply([], x.value));
      
    }
    else{
      loc.push(x.value);
    }
  })
  var flatArray = Array.prototype.concat.apply([], loc);
  console.log(flatArray);
  setSizeChart(flatArray);
  
  console.log('onChange::', currentNode, selectedNodes)
}
//console.log(selectedCategories)

  const callMintMyERC1155FromApp  = (e) => {
    e.preventDefault();
    if(cryptoBoyDressPrice==" "){
      console.log("price 0")
      setCryptoBoyDressPrice("0");
    }
    console.log(buffer,cryptoBoyName,cryptoBoyDescription,cryptoBoyPrice,cryptoBoyDressPrice,finalbuffer,categories,sizeChart,amount)
    props.mintMultipleNFT(
      cryptoBoyName,
      cryptoBoyDescription,
      buffer,
      cryptoBoyPrice,
      cryptoBoyDressPrice,
      finalbuffer,
      categories,
      sizeChart,
      amount
    );
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderMobile=(
    <div style={{padding:"0.5%"}}>
     {single?
     (<>
     <div className="card mt-1">
      <div className="card-body   
      
      "><div style={{textAlign:"center"}}>

        <h3 style={{justifyContent:"center"}}>Create Collectible</h3>
        </div>
       <br/>
        Put amount equal to 1 to make your collectible one of a kind 

      </div>
    </div>
    
     <form onSubmit={callMintMyERC1155FromApp} style={{padding:"0.5%"}}className="pt-4 mt-1">
   
    <div style={{padding:"0.5%"}} >
    <Grid container spacing={3}>
    <Grid item xs={12}><Paper  style={{height:"fitContent",padding:"2%",backgroundColor:"ghostwhite"}}>
     <span>Upload file to view preview</span>    
     {buffer?(<><aside style={thumbsContainer}>{thumbs}</aside></>):null} </Paper></Grid>
    <Grid item xs={12}>
     <Paper variant="outlined" style={{padding:"inherit",backgroundColor:"ghostwhite"}}>
     
     
     <div style={{margin:"2%"}}>
          <div {...getRootProps({ className: "dropzone" })}>
<input {...getInputProps()}   />
{fileName?(<span>{fileName} </span>):( <span>Drag 'n' drop some files here, or click to select files</span>)}

</div>

         <br/><br/><hr/>
         
    
<TextField

 label="Title"
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}
 InputProps={{
  className: classes.input,
}}
 
 required
 value={cryptoBoyName}
 onChange={(e)=>setCryptoBoyName(e.target.value)}
 error={props.nameIsUsed}
/>
<br/>
<TextField
 
 label="Description"
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}
 InputProps={{
  className: classes.input,
}}
 multiline
 fullWidth
 rowsMax={4}
 value={cryptoBoyDescription}
 onChange={(e)=>setCryptoBoyDescription(e.target.value)}
 required
 
/>
<br/><br/>
<div >
<span>Choose Category</span>
    
       <Select 
              options={options}
              className="basic-single"
              classNamePrefix="select"
              name="ReactSelect"
              isClearable
              isSearchable
              onChange={handleCategory}

              />
   </div>   

<hr/>

<br/>
{categories=="fashionDesign"?(<>

  <div>
<TextField
 label="Price"
 id="standard-start-adornment"
 placeholder="Enter price for one piece"
// className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}

 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}

 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
   className: classes.input,
 }}
 required
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
<br/>
</div>
{/* <div>
<TextField
 label="Price with Dress"
 id="standard-start-adornment"
 placeholder="Enter price for one piece with dress"
// className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyDressPrice(e.target.value);setReceivePrice2((e.target.value)*2.5/100)}}

 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}

 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
   className: classes.input,
 }}
 required
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyDressPrice-receivePrice2} ETH</b></FormHelperText>
</div> */}
<hr/>
<h2>Upload Image</h2>
          
<input type='file' multiple={true} onChange={captureFile}  required/>
      <hr/>
      {/* <div style={{display:"flex",justifyContent:"center"}}>
   <Button variant="contained" color="primary" onClick={handleOpen}>
       Create size chart
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        //onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper2}>
           
          <IconButton color="primary"  component="span" style={{float:"right",color:"#173e43"}}onClick={handleClose}>
          <HighlightOffIcon />
        </IconButton>
        <br/>
        <div  style={{textAlign:"center"}}>
            <h2 id="spring-modal-title">Size Chart</h2>
            </div>
            <p id="spring-modal-description">Add Values from the tree which you want to insert in your form</p>
            <hr/>
            <div >
     <span>Choose Category</span>
   <SizeContainer data={sizeData} onChange={onChangeSize}  texts={{placeholder:"Category"}} />     
   </div>

          </div>
         
        </Fade>
      </Modal>
   </div> */}
   </>):(<>
        <div>
<TextField
 label="Price"
 id="standard-start-adornment"
 placeholder="Enter price for one piece"
// className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}

 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}

 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
   className: classes.input,
 }}
 required
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
<br/>
</div>
{categories=="art"?(<>
  <h2>Upload Image</h2>
          
          <input type='file' multiple={true} onChange={captureFile}  required/>
                
</>):null}
</>)}
      
<TextField
 //id="standard-adornment-amount"
 label="Amount"
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}
 InputProps={{
  className: classes.input,
}}
 
 required
 value={amount}
 onChange={(e)=>setAmount(e.target.value)}

/>           
   <hr/>          
<div style={{display:'flex',justifyContent:'center'}}>
<Button
variant="contained"
color="default"
className={classes.button}
startIcon={<AddIcon />}
// style={{borderRadius:20,backgroundColor:"#173e43",color:"ghostwhite"}}

type="submit"
>
Create Item
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
             onClick={(e)=>{setBuffer(null)}}
           >
             <span>&times;</span>
           </button>
           <strong>This image is taken!</strong>
         </div>
       ) :     
         null}
     </div>
     <div className="mt-4">
       {props.nameIsUsed ? (
         <div className="alert alert-danger alert-dissmissible">
           <button
             type="button"
             className="close"
             data-dismiss="alert"
             onClick={e=>{setCryptoBoyName("")}}
           >
             <span>&times;</span>
           </button>
           <strong>This name is taken!</strong>
         </div>
       ) :     
         null}
     </div>
</form>
     </>)
:(null)}
   </div>
  );
 
  const renderDesktop=(
    <div style={{padding:"0.5%"}}>    
     {single?
     (<>
     <div className="card mt-1">
      <div className="card-body   
      
      "><div style={{textAlign:"center"}}>
      
        <h3 style={{justifyContent:"center"}}>Create Collectible</h3>
        </div>
       <br/>
        Put amount equal to 1 to make your collectible one of a kind 

      </div>
    </div>
    
     <form onSubmit={callMintMyERC1155FromApp} style={{padding:"0.5%"}}className="pt-4 mt-1">
    
         
    <div  >
    <Grid container spacing={3}>
    <Grid item xs={9}>
     <Paper variant="outlined" style={{padding:"inherit",
     //backgroundColor:"ghostwhite"
    borderRadius:"15px"}}>
     
     
     <div style={{margin:"1%"}}>
          <div {...getRootProps({ className: "dropzone" })}>
<input {...getInputProps()}   />
{!files?(<span>{files[0].name} </span>):( <span>Drag 'n' drop some files here, or click to select files</span>)}

</div>

         <br/><br/><hr/>
            
<TextField
 //id="standard-multiline-flexible"
 style={{fontFamily:"inherit"}}
 label="Title"
 required
 value={cryptoBoyName}
 onChange={(e)=>setCryptoBoyName(e.target.value)}
 error={props.nameIsUsed}
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}
 InputProps={{
  className: classes.input,
}}
/>

<br/>
<TextField
 id="standard-multiline-flexible"
 label="Description"
 multiline
 fullWidth
 rowsMax={4}
 value={cryptoBoyDescription}
 required
 onChange={(e)=>setCryptoBoyDescription(e.target.value)}
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}
 InputProps={{
  className: classes.input,
}}
/>
<br/><br/>
<hr/>
<div>
   <div >
   <span>Choose Category</span>
       
              <Select 
              options={options}
              className="basic-single"
              classNamePrefix="select"
              name="ReactSelect"
              isClearable
              isSearchable
              //onChange={(selected=>{setCategories(selected)})}
              onChange={handleCategory}
              />
            
   </div>
   </div>

<hr/>
<h2>Upload Image</h2>
          
<input type='file' multiple={true} onChange={captureFile} />
            
   <hr/> 
   <div style={{display:"flex",justifyContent:"space-evenly"}}>
<div>
<TextField
 label="Price"
 id="standard-start-adornment"
 placeholder="Enter price for one piece"
 className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}

 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
   className: classes.input,
 }}
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
</div>
<div>
<TextField
 //id="standard-adornment-amount"
 label="Amount"
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}
 InputProps={{
  className: classes.input,
}}
 
 required
 value={amount}
 onChange={(e)=>setAmount(e.target.value)}

/>  
</div>
</div> 
<br/>
{/* {categories=="fashionDesign"?(<>
  <div style={{display:"flex",justifyContent:"space-evenly"}}>
<div>
<TextField
 label="Price"
 id="standard-start-adornment"
 placeholder="Enter price for one piece"
 className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}

 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
   className: classes.input,
 }}
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
</div>
<div>
<TextField
 //id="standard-adornment-amount"
 label="Amount"
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}
 InputProps={{
  className: classes.input,
}}
 
 required
 value={amount}
 onChange={(e)=>setAmount(e.target.value)}

/>  
</div> */}
{/* <div>
<TextField
 label="Price with Dress"
 id="standard-start-adornment"
 placeholder="Enter price for one piece with dress"
// className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyDressPrice(e.target.value);setReceivePrice2((e.target.value)*2.5/100)}}
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}

 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
   className: classes.input,
 }}
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyDressPrice-receivePrice2} ETH</b></FormHelperText>
</div> */}
{/* </div>

<br/>
<hr/>
<h2>Upload Image</h2>
          
<input type='file' multiple={true} onChange={captureFile} />
            
   <hr/>   */}
   
   {/* <div style={{display:"flex",justifyContent:"center"}}>
   <Button variant="contained" color="primary" onClick={handleOpen}>
       Create size chart
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        //onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper2}>
           
          <IconButton color="primary"  component="span" style={{float:"right",color:"#173e43"}}onClick={handleClose}>
          <HighlightOffIcon />
        </IconButton>
        <br/>
        <div  style={{textAlign:"center"}}>
            <h2 id="spring-modal-title">Size Chart</h2>
            </div>
            <p id="spring-modal-description">Add Values from the tree which you want to insert in your form</p>
            <hr/>
            <div >
     <span>Choose Category</span>
   <SizeContainer data={sizeData} onChange={onChangeSize}  texts={{placeholder:"Category"}} />     
   </div>

          </div>
         
        </Fade>
      </Modal>
   </div> */}
   {/* </>):<>
   <div style={{display:"flex",justifyContent:"space-evenly"}}>
<div>
<TextField
 label="Price"
 id="standard-start-adornment"
 placeholder="Enter price for one piece"
 className={clsx(classes.margin, classes.textField)}
 onChange={(e)=>{setCryptoBoyPrice(e.target.value);setReceivePrice((e.target.value)*2.5/100)}}
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}
 InputProps={{
   startAdornment: <InputAdornment position="start">Ξ</InputAdornment>,
   className: classes.input,
 }}
/><FormHelperText id="filled-weight-helper-text">Service Fee <b>2.5%</b><br/>You will receive <b>{cryptoBoyPrice-receivePrice} ETH</b></FormHelperText>
</div>
<div>
<TextField
 //id="standard-adornment-amount"
 label="Amount"
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}
 InputProps={{
  className: classes.input,
}}
 
 required
 value={amount}
 onChange={(e)=>setAmount(e.target.value)}

/>  </div></div>
{categories=="art"?(<><h2>Upload Image</h2>
          
          <input type='file' multiple={true} onChange={captureFile} />
                      
             <hr/> </> ):null}

        
  </>}
  <TextField
 //id="standard-adornment-amount"
 label="Amount"
 inputProps={{className: classes.input}}
 InputLabelProps={{
  className: classes.input,
}}
 InputProps={{
  className: classes.input,
}}
 
 required
 value={amount}
 onChange={(e)=>setAmount(e.target.value)}

/>        
   <hr/> */}
<div style={{display:'flex',justifyContent:'center'}}>
<Button
variant="contained"
color="default"
className={classes.button}
startIcon={<AddIcon />}
// style={{borderRadius:20,backgroundColor:"#173e43",color:"ghostwhite"}}

type="submit"
>
Create Item

</Button>
</div>

</div>

       </Paper>
      
       </Grid>
       <Grid item xs={3}><Paper  style={{height:"fitContent",padding:"2%",
       //backgroundColor:"ghostwhite"
      borderRadius:"15px"}}>
         
    
     {buffer?(<><aside style={thumbsContainer}>{thumbs}</aside></>):(<> <span>Upload file to view preview</span>  
      <div className="col-md-12 w-100  mt-1 border ">
      <img src="https://i.pinimg.com/600x315/ef/07/ab/ef07abb1c1b5a31a3ab2927a4ced46b4.jpg"style={{height:"inherit",width:"inherit"}}></img></div>
     </>)}  
</Paper></Grid>

       </Grid>
       </div>
        
     <div className="mt-4">
       {props.imageIsUsed ? (
         <div className="alert alert-danger alert-dissmissible">
           <button
             type="button"
             className="close"
             data-dismiss="alert"
             onClick={(e)=>{setBuffer(null);window.location.reload()}}
           >
             <span>&times;</span>
           </button>
           <strong>This image is taken!</strong>
         </div>
    
       ) :     
         null}
     </div>
     <div className="mt-4">
       {props.nameIsUsed ? (
         <div className="alert alert-danger alert-dissmissible">
           <button
             type="button"
             className="close"
             data-dismiss="alert"
             onClick={e=>{setCryptoBoyName("")}}
           >
             <span>&times;</span>
           </button>
           <strong>This name is taken!</strong>
         </div>
         
       ) :     
         null}
     </div>
     
</form>
     </>)
     :
(null)}
    
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