import React,{useState,useEffect} from "react";
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
import imgData from './imagebase64';
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

  //const [buyerName,setBuyerName]=useState("");
  //const [buyerEmail,setBuyerEmail]=useState(" ");
  const [feedBack,setFeedBack]=useState(" ");
  const [formDetails,setFormDetails]=useState("");
  const [tokenNo,setTokenNo]=useState(" ");
  const [tokenName,setTokenName]=useState(" ");
  const [price,setPrice]=useState(" ");
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
// useEffect(()=>{
//   if(props.tokenNo){
//     setTokenNo(props.tokenNoOfDress);
//     setTokenName(props.designName);
//     setPrice(props.priceOfDress);
//   }
// },[props]);

  
  
  // const [mailerState, setMailerState] = useState({
  //   buyerName: "",
  //   buyerEmail: "",
  //   feedBack: "",
  // });
  const [bufferFinal,setBufferFinal]=useState(null);
    console.log(props)
    //  let tokenNo=props.tokenNoOfDress;
    //  let tokenName=props.designName;
    //  let price=props.priceOfDress;
    let sendEmailTo=props.sendEmailTo;
    let sendName=props.sendName;
    let buyerName=props.currentUser.userName;
    let buyerEmail=props.currentUser.userEmail;
   
    
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
      const response = await fetch("http://localhost:8080/send", {
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
         
            //setBuyerEmail(" ");
           // setBuyerName(" ");
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
    //     Username : "*******",
    //     Password : "******",
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
     
   
      doc.text("Digitart",460,30)
      doc.addImage(imgData,"PNG",525 ,5,30,30)
      

      doc
      .setFontSize(14);
      doc
              .setTextColor(
                      46, 116, 181);
      doc.text("Design details",250,50)
      // doc
      // .setTextColor(
      //         0, 0, 0);
      // doc
      // .setFontSize(10);
      // doc.text("Token No:",40,60)
      // console.log(typeof(props.tokenNoOfDress.toString()))
      // doc.text(props.tokenNoOfDress.toString(),90,60)
      // doc.text("Token Name:",200,60)
      // doc.text(props.designName.toString(),280,60)
      // doc.text("Price:",370,60)
      // doc.text(window.web3.utils.fromWei(props.priceOfDress.toString(),"Ether"),420,60)

     
      doc.autoTable({
        head: [['Id', 'Name','Price']],
        body: [
          [props.tokenNoOfDress.toString(),props.designName.toString(),window.web3.utils.fromWei(props.priceOfDress.toString(),"Ether") ],
           
          
        ],
        startY:65
      })
      
      doc
      .setFontSize(14);
      doc
              .setTextColor(
                      46, 116, 181);
      doc.text("Buyer Details",250,135)
      doc.autoTable({
        head: [['Buyer Name', 'Buyer Email']],
        body: [
          [props.currentUser.userName,props.currentUser.userEmail ],
           
          
        ],
        startY:150
      })

      doc.setFontSize(14);
      doc.setTextColor(46, 116, 181);
      doc.text("Seller Details",250,220)
      doc.autoTable({
        head: [['Seller Name', 'Seller Email']],
        body: [
          [props.sendName.toString(),props.sendEmailTo.toString() ],  
        ],
        startY:235
      })
      doc.setFontSize(14);
                      doc.setTextColor(46, 116, 181);
                      doc.text("Comments:",40,305)
                      doc
                      .setTextColor(0, 0, 0);
                      doc.setFontSize(10);
                      doc.text(feedBack,40,320)
     
      
      

    
           doc.setFontSize(14);
      doc.setTextColor(
                      46, 116, 181);
      doc.text(
                      "Size Chart",
                      250,
                      380);


      var columns = [
              {
                  title : "",
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
                         
                          startY : 395,
                          //tableWidth: 300,


                          styles : {
                              overflow : 'linebreak',
                              cellPadding : 2,
                              rowHeight : 15,
                              fontSize : 10,
                              textcolor:0,
                              textAlign:'center'
                          },

                          drawHeaderRow: function() {
                                  
                                  return true;
                              },
                              // columnStyles: {
                              //   rid:{fillColor: [166, 166, 166]}
                              // }


                      });
                      
   


       var docu=doc.output('datauristring')
       console.log(docu)

       setFormDetails(docu)
       
       doc.save(`${props.designName.toString()}.pdf`)
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
        {props.sendName?(<>
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
                       value={props.currentUser.userName} 
                       //onChange={(e)=>{setBuyerName(e.target.value)}}
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
                       value={props.currentUser.userEmail} 
                      // onChange={(e)=>{setBuyerEmail(e.target.value)}}
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
                  props.priceOfDress.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </button>
        </div>
        
        </div>
      </div>
     
      </form></>):(<>Select a design</>)} 
    
       
     </div>
    );
}

export default SizeDetails;