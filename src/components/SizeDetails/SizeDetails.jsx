import React,{useState} from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import womensizeChart from "./womensizeChart.jpeg";
import Grid from '@material-ui/core/Grid';
import emailjs from 'emailjs-com';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ipfs from '../ipfs';
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

const SizeDetails=(props)=>{

  const [buyerName,setBuyerName]=useState("");
  const [buyerEmail,setBuyerEmail]=useState(" ");
  const [feedBack,setFeedBack]=useState(" ");
  const [formDetails,setFormDetails]=useState("");
  
  const [bufferFinal,setBufferFinal]=useState(null);
    console.log(props)
    let tokenNo=props.tokenNoOfDress;
    let price=props.priceOfDress;
    let sendEmailTo=props.sendEmailTo;
    let sendName=props.sendName;
    console.log(window.location.href.split("/"))
    // if(!props.tokenNo){
    //     tokenNo=window.location.href.split("/")[4];
    //     price=window.location.href.split("/")[5];
    // }
    
    const captureFile=(event)=> {
      event.preventDefault()
      
      const file = event.target.files[0]   
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
       // console.log('buffer', buffer2)
       console.log(Buffer(reader.result))
     
       //console.log(formDetails)
       setBufferFinal(Buffer(reader.result))
      
      }
      
      
      

    }
    
    const sendEmail=(e)=>{
      e.preventDefault();
     
      
      console.log(e.target);
      emailjs.sendForm("service_gwuibpe","template_7ny68h9",e.target,"user_dgGHyFgE2zDusdESWMGLF").then(res=>{
        console.log(res)
      }).catch(err=>console.log(err));
      console.log("form submitted")
      props.buyCryptoBoyWithDress(
        props.tokenNoOfDress,
        props.priceOfDress
      )
    }
    console.log(props.sendEmailTo)

    const jsPdfGenerator=()=>{
      var doc=new jsPDF('p','pt');
      doc.autoTable({
        head: [['Name', 'Email', 'Message']],
        body: [
          [buyerName,buyerEmail ,feedBack ],
           
          
        ],
      })
      
      //doc.output('dataurlnewwindow')
       var docu=doc.output('datauristring')
       console.log(docu)
      // setFormDetails(docu)
       doc.save(`${sendName}.pdf`)
    }

    const generatePdfLink=async(e)=>{
      e.preventDefault();
      console.log(bufferFinal);
      const  file= await ipfs.add(bufferFinal);
      const pdfHash = `https://ipfs.infura.io/ipfs/${file.path}`;
      setFormDetails(pdfHash);
      console.log(pdfHash)
    }
    const classes=useStyles();
    
    return(

     <div>
        
        <div className="card mt-1">
      <div className="card-body   
      
      "><div style={{textAlign:"center"}}>
       
        {/* <Button variant="contained"color="default" style={{float:"left"}}onClick={()=>{setSingle(false);setShow(true)}}>
        ← Back
       </Button> */}
      
      
  
      
        <h3 style={{justifyContent:"center"}}>Size Chart</h3>
        </div>
      

      </div>
    </div>
    <div style={{display:"flex",justifyContent:"space-around"}}>
      <img src={womensizeChart} style={{width:"50%",height:"50%"}}/>
      </div>
    {/* <form validate style={{padding:"1%"}}onSubmit={sendEmail}>
         
      <div className={classes.paper}>
     
    
        <div className="card mt-1 p-4">
        
       <div style={{display:"flex",justifyContent:"space-evenly"}}>
       <Grid container spacing={1} alignItems="flex-end" >
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <label style={{display:"flex",alignItems:"center"}}>
          Essay:
          <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
               // value={userName}
               // onChange={(e)=>{setUserName(e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label="User Name"
                autoFocus
          />

        </label>
          </Grid>
        </Grid>
         
        </div>
       
         <div style={{display:"flex",justifyContent:"space-evenly"}}>
        
         <button
                className="btn btn-outline-primary mt-3 "
                value={price}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                // onClick={(e) =>
                //   props.buyCryptoBoyWithDress(
                //     tokenNo,
                //     e.target.value)
                // }
                type="submit"
              // onClick={(e)=>{props.tokenIdAndPrice(props.cryptoBoys[thistokenId].tokenId.toNumber(),e.target.value)}}
               //onClick={handleOpen}
              >
               Buy with Dress For{" "}
                {window.web3.utils.fromWei(
                  price.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </button>
        </div>
        
        </div>
      </div>
     
      </form> */}
        <form
        
        style={{ margin: "25px 85px 75px 100px" }}
        onSubmit={sendEmail}
      >
         <div style={{display:"flex",justifyContent:"space-evenly"}}>
       <Grid container spacing={1} alignItems="flex-end" >
         <Grid item xs={12} sm={6} lg={4} xl={3}>
        <label>name</label>
        <input type="text" name="name" className="form-control" onChange={(e)=>{setBuyerName(e.target.value)}} value={buyerName}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
        <label>Your Email</label>
        <input type="email" name="your_email" className="form-control" onChange={(e)=>{setBuyerEmail(e.target.value)}} value={buyerEmail}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
        <label>Message</label>
        <textarea name="message" rows="4" className="form-control" onChange={(e)=>{setFeedBack(e.target.value)}} value={feedBack}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
        <label>Send To Email</label>
        <input type="email" name="user_email" value={props.sendEmailTo} className="form-control" />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
        <label>Send To Name</label>
       
        <input type="text" name="user_name" value={props.sendName} className="form-control" />
        </Grid>
       
        </Grid>
        </div>
        {/* <TextField
                     //autoComplete="username"
                     name="user_email"
                     variant="outlined"
                     required
                     value={props.sendEmailTo}
                     //onChange={(e)=>{setUserName(e.target.value)}}
                     id="userName"
                     label="Send Email"
                     autoFocus
                    /// disabled={true}
               /> */}
               <Grid container spacing={1} alignItems="flex-end">
               <Grid item xs={12} sm={6} lg={4} xl={3}>
               <button type="button" onClick={jsPdfGenerator}>Generate Pdf</button>
               </Grid>
               <Grid item xs={12} sm={6} lg={4} xl={3}>
               <label>Upload Pdf</label>
               <input type="file"  className="form-control" onChange={captureFile}/>
               </Grid>
               <Grid item xs={12} sm={6} lg={4} xl={3}>
               <button type="button" onClick={generatePdfLink} >Generate Pdf Link</button>
               <input type="text" name="pdflink" value={formDetails} className="form-control" />
               </Grid>
               </Grid>
              

              
               
              
              
               
               <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <input
          type="submit"
          value="Send"
          className="form-control btn btn-primary"
          style={{ marginTop: "30px" }}
        />
        </div>
      </form>
     </div>
    );
}

export default SizeDetails;