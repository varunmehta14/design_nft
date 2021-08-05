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
  const [file,setFile]=useState(null);
  const [sizeFields,setSizeFields]=useState([]);
  // props.sizeInputField.map((fields,index)=>{
  //   let fi=fields;
  //   let setFi=fields+index;
  //   [fi,setFi]=useState("");
  // })

  const [inputs, setInputs] = useState(Array(props.sizeInputField.length).fill(''));
  const setInput = (i, v) => {
    setInputs(Object.assign([...inputs], { [i]: v }));
    console.log(inputs)
  };


  
  
  // const [mailerState, setMailerState] = useState({
  //   buyerName: "",
  //   buyerEmail: "",
  //   feedBack: "",
  // });
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
      console.log(event.target.files)
      const file = event.target.files[0]   
      setFile(file);
      // const reader = new window.FileReader()
      // reader.readAsArrayBuffer(file)
      // reader.onloadend = () => {
      //  // console.log('buffer', buffer2)
      //  console.log(Buffer(reader.result))
     
      //  //console.log(formDetails)
      //  setBufferFinal(Buffer(reader.result))
      
      //}
      
      
      

    }
     
    // function handleStateChange(e) {
    //   setMailerState((prevState) => ({
    //     ...prevState,
    //     [e.target.name]: e.target.value,
    //   }));
    // }
    const sendEmail = async (e) => {
      e.preventDefault();
      
     // console.log({ mailerState });
      const response = await fetch("http://localhost:8000/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ buyerName,buyerEmail,feedBack,sendName,sendEmailTo,formDetails }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          const resData = await res;
          console.log(resData);
          if (resData.status === "success") {
            alert("Message Sent");
            props.buyCryptoBoyWithDress(
              props.tokenNoOfDress,
              props.priceOfDress
            )
          } else if (resData.status === "fail") {
            alert("Message failed to send");
          }
        })
        .then(() => {
         
            setBuyerEmail(" ");
            setBuyerName(" ");
            setFeedBack(" ");
            setFormDetails(" ");
          });
         
        };
    
    
    // const sendEmail=(e)=>{
    //   e.preventDefault();
     
      
    //   console.log(e.target);
    //   emailjs.sendForm("service_gwuibpe","template_7ny68h9",e.target,"user_dgGHyFgE2zDusdESWMGLF").then(res=>{
    //     console.log(res)
    //   }).catch(err=>console.log(err));
    //   console.log("form submitted")
    //   props.buyCryptoBoyWithDress(
    //     props.tokenNoOfDress,
    //     props.priceOfDress
    //   )
    // }
    
    // const sendEmail=(e)=>{
    //   e.preventDefault()
    //   window.Email.send({
    //     Host : "smtp.gmail.com",
    //     Username : "mehtavarunj@gmail.com",
    //     Password : "varunjmehta14082001",
    //     To : 'mehtaharshj@gmail.com',
    //     From : "mehtavarunj@gmail.com",
    //     Subject : "This is the subject",
    //     Body : "And this is the body"
    // }).then(
    //   message => alert(message)
    // );
    // }
    console.log(props.sendEmailTo)

    const jsPdfGenerator=()=>{
      var doc=new jsPDF('p','pt');
      doc.autoTable({
        head: [['Name', 'Email', 'Message']],
        body: [
          [buyerName,buyerEmail ,feedBack ],
           
          
        ],
      })

            doc
              .setFontSize(14);
      doc
              .setTextColor(
                      46, 116, 181);
      doc
              .text(
                      "About",
                      40,
                      100);


      var columns = [
              {
                  title : "Field",
                  key : "field"
              },
              {
                  title : "Size in Inches",
                  key : "size"
              } ];

     
     
      var data = [];

for(var x = 0; x < inputs.length; x++){
 data.push({"field":props.sizeInputField[x]  , "size": inputs[x]});
}

JSON.stringify({array: data});

      doc
              .autoTable(
                      columns,
                      data,
                      {
                          theme:'grid',
                          startY : 120,
                          tableWidth: 300,


                          styles : {
                              overflow : 'linebreak',
                              cellPadding : 2,
                              rowHeight : 15,
                              fontSize : 10,
                              textcolor:0
                          },

                          drawHeaderRow: function() {
                                  // Don't draw header row
                                  return false;
                              },
                              // columnStyles: {
                              //   rid:{fillColor: [166, 166, 166]}
                              // }


                      });

      //doc.output('dataurlnewwindow')
       var docu=doc.output('datauristring')
       console.log(docu)
       setFormDetails(docu)
       doc.save(`${sendName}.pdf`)
    }

    // const generatePdfLink=async(e)=>{
    //   e.preventDefault();
    //   console.log(bufferFinal);
    //   const  file= await ipfs.add(bufferFinal);
    //   const pdfHash = `https://ipfs.infura.io/ipfs/${file.path}`;
    //   setFormDetails(pdfHash);
    //   console.log(pdfHash)
    // }
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
   
    <form validate style={{padding:"1%"}}onSubmit={sendEmail} enctype="multipart/form-data">
         
      <div className={classes.paper}>
     
    
        <div className="card mt-1 p-4">
        
       <div style={{display:"flex",justifyContent:"space-evenly"}}>
       <Grid container spacing={1} alignItems="flex-end" >
       <Grid item xs={12} sm={6} lg={4} xl={3}>
                  
                  <TextField
                        autoComplete="username"
                        name="name"
                        variant="outlined"
                        required
                       value={props.sendName} 
                       
                       // error={nameIsUsed}
                        id="sendName"
                        label="sendName"
                        autoFocus
                  />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
                  
                  <TextField
                        autoComplete="username"
                        name="email"
                        variant="outlined"
                        required
                       value={props.sendEmailTo} 
                       
                       // error={nameIsUsed}
                        id="sendName"
                        label="Seller Email"
                        autoFocus
                  />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
                  
                  <TextField
                        autoComplete="username"
                        name="email"
                        variant="outlined"
                        required
                       value={buyerName} 
                       onChange={(e)=>{setBuyerName(e.target.value)}}
                       // error={nameIsUsed}
                        id="sendName"
                        label="BuyerName"
                        autoFocus
                  />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
                  
                  <TextField
                        autoComplete="username"
                        name="your_email"
                        variant="outlined"
                        required
                       value={buyerEmail} 
                       onChange={(e)=>{setBuyerEmail(e.target.value)}}
                       // error={nameIsUsed}
                        id="sendEmail"
                        label="BuyerEmail"
                        autoFocus
                  />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
                  
                  <TextField
                        autoComplete="username"
                        name="message"
                        variant="outlined"
                        required
                        multiline
                       value={feedBack}
                       onChange={(e)=>{setFeedBack(e.target.value)}}
                       // error={nameIsUsed}
                        id="sendFeedback"
                        label="Message"
                        autoFocus
                  />
        </Grid>
            {props.sizeInputField?(
              <>
             {props.sizeInputField.map((v,i)=>{
                return (
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                  
          <TextField
                autoComplete="username"
                name="name"
                variant="outlined"
                required
                
                onChange={(e)=>{setInput(i,e.target.value)}}
               // error={nameIsUsed}
                id="userName"
                label={v}
                autoFocus
          />

        
                    </Grid>
                    
                )
                
             })}
              <Grid item xs={12} sm={6} lg={4} xl={3}>
               <Button style={{backgroundColor:"#173e43"}}
                 variant="contained"
                 color="primary" onClick={jsPdfGenerator}>Generate Pdf</Button>
               </Grid></>
            ):null}
          
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
     
      </form>
        <form
        
        style={{ margin: "25px 85px 75px 100px" }}
        onSubmit={sendEmail}
        enctype="multipart/form-data"
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

               <Grid container spacing={1} alignItems="flex-end">
               <Grid item xs={12} sm={6} lg={4} xl={3}>
               <button type="button" onClick={jsPdfGenerator}>Generate Pdf</button>
               </Grid>
               {/* <Grid item xs={12} sm={6} lg={4} xl={3}>
               <label>Upload Pdf</label>
               <input type="file"  className="form-control" name="file"onChange={captureFile}/>
               </Grid> */}
               {/* <Grid item xs={12} sm={6} lg={4} xl={3}>
               <button type="button" onClick={generatePdfLink} >Generate Pdf Link</button>
               <input type="text" name="pdflink" value={formDetails} className="form-control" />
               </Grid> */}
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
       {/* <form
       style={{
         display: "flex",
         height: "100vh",
         justifyContent: "center",
         alignItems: "center",
       }}
       onSubmit={submitEmail}
     >
       <fieldset
         style={{
           display: "flex",
           flexDirection: "column",
           justifyContent: "center",
           width: "50%",
         }}
       >
         <legend>React NodeMailer Contact Form</legend>
         <input
           placeholder="Name"
           onChange={(e)=>{setBuyerName(e.target.value)}}
           name="buyerName"
           value={buyerName}
         />
         <input
           placeholder="Email"
           onChange={(e)=>{setBuyerEmail(e.target.value)}}
           name="buyerEmail"
           value={buyerEmail}
         />
         <textarea
           style={{ minHeight: "200px" }}
           placeholder="Message"
           onChange={(e)=>{setFeedBack(e.target.value)}}
           name="feedBack"
           value={feedBack}
         />
         <button>Send Message</button>
       </fieldset>
     </form> */}
     </div>
    );
}

export default SizeDetails;