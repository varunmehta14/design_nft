import React, { useState, useEffect } from "react";
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage";
import CryptoBoyNFTDetails from "../CryptoBoyNFTDetails/CryptoBoyNFTDetails";
import NFTHighlights from "../NFTHighlights/NFTHighlights";
import Loading from "../Loading/Loading";



const AllCryptoBoys = ({
  
  accountAddress,
  cryptoBoys,
 // allcryptoBoys,
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
   
   // loadDesigns(startState,endState)
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
  //   }}
  // }
  // }
  
  // const scrollToEnd=()=>{
  //   // this.setState({page:this.state.page+1});
  //    setStart(end+1);
  //    setEnd(end+2);
  //    //setLoading(true);
  //    console.log(console.log("start",start))
     
  //    loadDesigns(start,end);}
     
     
   

  //   // console.log(this.state.page);
   
 
  //  window.onscroll=function(){
  //    console.log(window,document.documentElement.scrollTop,document.documentElement.offsetHeight)
  //    if(
  //      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight 
  //    ){
  //     if(!endOfDesigns){
  //      scrollToEnd();}
  //      console.log("here")
  //    }
  //  }
  
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
      <div className="d-flex flex-wrap mb-2">
        {cryptoBoys.map((cryptoboy) => {
          return (
           <
           
          >
            <div
              key={cryptoboy.tokenId.toNumber()}
              className="col-md-6 "
              className="w-50 p-4 mt-1 border "
              style={{display:"flex"}}
              
            >
              {!loading ? (
                <CryptoBoyNFTImage
                cryptoboy={cryptoboy}
                />
              
               
              ) : (
                <Loading />
              )}</div>
              {/* <CryptoBoyNFTDetails
                cryptoboy={cryptoboy}
                accountAddress={accountAddress}
                changeTokenPrice={changeTokenPrice}
                toggleForSale={toggleForSale}
                buyCryptoBoy={buyCryptoBoy}
                callbackFromParent={myCallback1}
              /> */}
              <div className="col-md-6 "
              className="w-50 p-4 mt-1 border text-center"
              >
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
               
              </div>
              <hr/>
            </>
            
          );
        })}
      </div>
    </div>
  );
};

export default AllCryptoBoys;
