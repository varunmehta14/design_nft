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
    const [cryptoBoyImageHash,setCryptoBoyImageHash] = useState("");
    const [files, setFiles] = useState([]);
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
        <div className="card mt-1">
          <div className="card-body align-items-center d-flex justify-content-center">
            <h5>Upload Your Designs</h5>
          </div>
        </div>
        <form onSubmit={callMintMyNFTFromApp} className="pt-4 mt-1">
        
              {/* <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/> */}
             <div className={useStyles.root} >
             <Grid container spacing={3}>
             <Grid item xs={9}>
              <Paper variant="outlined" >
              
              
               {/* <input hidden="" accept="image/png,image/jpeg,image/gif,image/webp,video/mp4,video/webm,audio/mp3,audio/webm,audio/mpeg" 
                  name="primary-attachment" 
                  data-marker="root/appPage/create/form/primaryAttachmentInput/input" 
                  type="file" 
                 
                  /> */}
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
        {/* <TextField
          id="standard-select-currency-native"
          select
          label="Native select"
          value={currency}
          onChange={(e)=>setCurrency(e.target.value)}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        
        </TextField>     */}
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
                  {/* <button class="sc-fujyUd sc-pNWxx sc-jrsJCI dAHnJY gSlGye hcOMxW sc-iqAbSa eIyFca" type="button">
                    <span class="sc-dlnjPT sc-hKFyIo cuIYFB edyjka">Choose File</span></button> */}
                   
              
               
          
              
              {/* <form onSubmit={this.onSubmit} >
                <input type='file' onChange={this.captureFile} />
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <input type='submit' />
              </form> */}
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
      </div>
    );
           
}



