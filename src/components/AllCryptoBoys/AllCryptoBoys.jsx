import React, { useState, useEffect } from "react";
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage";
import CryptoBoyNFTDetails from "../CryptoBoyNFTDetails/CryptoBoyNFTDetails";
import NFTHighlights from "../NFTHighlights/NFTHighlights";
import Loading from "../Loading/Loading";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width:"fit-content",
    [breakpoints.up('md')]: {
     justifyContent: 'center',
    },
  },
  // parent:{
  //   display: "grid",// activate grid
  //   gridTemplateColumns: "repeat(4, 1fr)", //make 4 cols with size 1fr
  //   gridGap: "20px", //gap between the rows
  // },
  // child:{
  //   '&:nthChild(3n+1)' :{
  //     gridColumn: 1,
  //   },
  //  ' &:nthChild(3n+2)' :{
  //     gridColumn: 2,
  //   },
  //   '&:nthChild(3n+3)' :{
  //     gridColumn: 3,
  //   },
  //   '&:nthChild(3n+4)' :{
  //     gridColumn: 1, //put the fourth item in a new row
  //   },
    
  // },
  
}));
const AllCryptoBoys = ({
  
  accountAddress,
  cryptoBoys,
  //allcryptoBoys,
  totalTokensMinted,
  changeTokenPrice,
  toggleForSale,
  buyCryptoBoy,
  callbackFromParent,
  cryptoBoysContract,
  usersContract,
  cryptoBoysCount
}) => {
  
  const [loading, setLoading] = useState(false);
  const [address,setAddress]=useState("");
  const [start,setStart]=useState(3);
  const [startState,setStartState]=useState(1);
  const [end,setEnd]=useState(4);
  const [endState,setEndState]=useState(2);
  const [allCryptoBoys,setAllCryptoBoys]=useState([]);
  const [endOfDesigns,setEndOfDesigns]=useState(false);

 //console.log(cryptoBoys[0])
  useEffect(() => {
    if (cryptoBoys.length !== 0) {
      if (cryptoBoys[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }
   
  //  loadDesigns(startState,endState)
  }, [usersContract]);
  
  //console.log(cryptoBoysContract)
  const myCallback1=(dataFromChild1)=>{
    //console.log(dataFromChild)
   // setAddress(dataFromChild1)
    callbackFromParent(dataFromChild1)
   // console.log(address)
  }
  // const loadDesigns=async(start,end)=>{
  //   console.log("end",end)
  // //   const cryptoBoysCount = await cryptoBoysContract.methods
  // //   .cryptoBoyCounter()
  // //   .call();
  // // this.setState({ cryptoBoysCount }); 
  // if(cryptoBoysContract){
  //   if(totalTokensMinted!=0){
  //  for (var i = start; i <= end; i++) {
  
    
  //   const cryptoBoy = await cryptoBoysContract.methods
  //     .allCryptoBoys(i)
  //     .call();
  //     console.log(cryptoBoy)
  //  setAllCryptoBoys(allCryptoBoys=>
  //     [...allCryptoBoys, cryptoBoy]);
     
  //   if(i===totalTokensMinted){
  //     setEndOfDesigns(true)
  //     break;
  //   }}}
  // }
  // }
  
  // const scrollToEnd=()=>{
  //   // this.setState({page:this.state.page+1});
  //   if(end<=totalTokensMinted){
  //    setStart(end+1);
  //    setEnd(end+2);
  //    //setLoading(true);
  //    console.log(console.log("start",start))
     
  //    loadDesigns(start,end);}}
     
     
   

  //   // console.log(this.state.page);
   
 
  //  window.onscroll=function(){
  //    console.log(window.innerHeight,document.documentElement.scrollTop,document.documentElement.offsetHeight)
  //    if(
  //      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight -1
  //    ){
  //     if(!endOfDesigns){
  //      scrollToEnd();}
  //      console.log("here")
  //    }
  //  }
   const gridStyles = useGridStyles();
  return (
    <div style={{padding:"0.5%"}}>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Total No. of Designs On The Platform :{" "}
            {totalTokensMinted}
          </h5>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"center",padding:"1%"}}>
        <Grid classes={gridStyles} container spacing={4} >
       
        {cryptoBoys.map((cryptoboy) => {
          return (
            <>
             <Grid item xs={4}>
             <NFTHighlights
                cryptoboy={cryptoboy}
                accountAddress={accountAddress}
                changeTokenPrice={changeTokenPrice}
                toggleForSale={toggleForSale}
                buyCryptoBoy={buyCryptoBoy}
                callbackFromParent={myCallback1}
                cryptoBoysContract={cryptoBoysContract}
                usersContract={usersContract}
              />
             </Grid>
           </> 

            // {/* // <div
            // //   key={cryptoboy.tokenId.toNumber()}
            // //   className="col-md-6 "
            // //   className="w-50 p-4 mt-1 border "
            // //   style={{display:"flex"}}
              
            // // >
            // //   {!loading ? (
            // //     <CryptoBoyNFTImage
            // //     cryptoboy={cryptoboy}
            // //     />
              
               
            // //   ) : (
            // //     <Loading />
            // //   )}</div>
            // //   {/* <CryptoBoyNFTDetails
            // //     cryptoboy={cryptoboy}
            // //     accountAddress={accountAddress}
            // //     changeTokenPrice={changeTokenPrice}
            // //     toggleForSale={toggleForSale}
            // //     buyCryptoBoy={buyCryptoBoy}
            // //     callbackFromParent={myCallback1}
            // //   /> */}
            // //   <div className="col-md-6 "
            // //   className="w-50 p-4 mt-1 border text-center"
            // //   >
            // //   <NFTHighlights
            // //     cryptoboy={cryptoboy}
            // //     accountAddress={accountAddress}
            // //     changeTokenPrice={changeTokenPrice}
            // //     toggleForSale={toggleForSale}
            // //     buyCryptoBoy={buyCryptoBoy}
            // //     callbackFromParent={myCallback1}
            // //     cryptoBoysContract={cryptoBoysContract}
            // //     usersContract={usersContract}
            // //   />
               
            // //   </div>
            // //   <hr/> */}
        
            
          );
        })}
        </Grid>
             </div>
      </div>
   
  );
};

export default AllCryptoBoys;
