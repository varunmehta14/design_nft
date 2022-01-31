import React, { useState, useEffect,StyleSheet } from "react";
import MyCryptoBoyNFTDetails from "../MyCryptoBoyNFTDetails/MyCryptoBoyNFTDetails";
import Loading from "../Loading/Loading";
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch'; 
import MyBoughtDesignsDetails from "../MyBoughtDesigns/MyBoughtDesignsDetails";
import { StackedCarousel } from 'react-stacked-carousel'

import 'react-stacked-carousel/dist/index.css';
import "./MyCryptoBoys.css";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingLeft:"5%",
    paddingRight:"5%",
   //width:"-webkit-fill-available",
    [breakpoints.up('md')]: {
     justifyContent: 'center',
    },
  },
  
  
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const MyCryptoBoys = ({
  accountAddress,
  cryptoBoys,
 
  callbackFromParent1
}) => {
  const [loading, setLoading] = useState(false);
  const [myBoughtCryptoBoys, setMyBoughtCryptoBoys] = useState([]);
  const [myMintedCryptoBoys, setMyMintedCryptoBoys] = useState([]);
  

  const [checked, setChecked] = useState(false);
  console.log("cryptoBoys",cryptoBoys);
//   let tokens=cryptoBoys.map((cryptoBoy)=>{return cryptoBoy[0]});
//  const result = [];
// const map = new Map();
// console.log("tokens",tokens)
// for (const item of tokens) {
//     if(!map.has(item.name)){
//       if(!map.has(item.price.toString())){
//         // map.set(item.name, true);
//         map.set(item.price.toString(), true);    // set any value to Map
//         result.push(
//             item
//         );
//       }
        
//     }
    
// }
function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
     const key = obj[property];
     if (!acc[key]) {
        acc[key] = [];
     }
     // Add object to list for given key's value
     acc[key].push(obj);
     return acc;
  }, {});
}
  useEffect(() => {
    // if (cryptoBoys.length !== 0) {
    //   if (cryptoBoys[0].metadata !== undefined) {
    //     setLoading(loading);
    //   } else {
    //     setLoading(false);
    //   }
    // }
    if(cryptoBoys.length!=0){
      
    
    let tokens=cryptoBoys.map((cryptoBoy)=>{return cryptoBoy[0]});

    const my_minted_crypto_boys = tokens.filter(
      (cryptoboy) => cryptoboy.mintedBy === accountAddress
    );
    const groupedMy = groupBy(my_minted_crypto_boys, 'name');
    console.log("groupedMy",groupedMy["style"])
    const my_bought_crypto_boys = tokens.filter(
      (cryptoboy) => cryptoboy.currentOwner === accountAddress && !(cryptoboy.mintedBy === accountAddress)
    );
    const groupedMyBought = groupBy(my_bought_crypto_boys, 'name');
    setMyBoughtCryptoBoys(groupedMyBought);
    setMyMintedCryptoBoys(groupedMy);
    }
    
  }, [cryptoBoys]);
  const classes=useStyles();

  const myCallback1=(dataFromChild1)=>{
    console.log(dataFromChild1)
   // setAddress(dataFromChild1)
  callbackFromParent1(dataFromChild1)
   // console.log(address)
  }
  const onCardChange = (event) => {
    console.log("Card", event);
  }
  console.log("myMinted",myMintedCryptoBoys)
  console.log("myBought",myBoughtCryptoBoys)
  const gridStyles = useGridStyles();
  return (
    <div style={{padding:"0.5%"}}>
     
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
           <h5>
            Collections
          </h5>
      <Switch
        checked={checked}
        onChange={()=>{setChecked(!checked)}}
        color="primary"
        name="checkedBought"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <h5>Bought</h5>
        </div>

      </div>
     

      {cryptoBoys.length!=0?(<>
        {!checked  ?
      ( <>
        
                <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Collections
          </h5>
        </div>
      </div>
     
     
        {myMintedCryptoBoys?(<>
          {Object.keys(myMintedCryptoBoys).length!=0 ? (<div 
            style={{display:"flex", justifyContent: "space-evenly", flexWrap: "wrap"}}
            >

          
            {Object.keys(myMintedCryptoBoys).map((key,index)=>{
             
              return(
                <>
                
                <div 
                style={{  height:"100vh" }}
                
                >
                  
                <StackedCarousel
      autoRotate={false}
      onCardChange={onCardChange}
      
      leftButton={
        <button
          style={{
            marginRight: "10px",
            borderRadius: "50%",
            fontSize: "smaller",
            fontWeight: "700",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#dadde1"
          }}
        >
          {"<"}
        </button>
      }
      rightButton={
        <button
          style={{
            marginLeft: "10px",
            borderRadius: "50%",
            fontSize: "smaller",
            fontWeight: "700",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#dadde1"
          }}
        >
          {">"}
        </button>
      }>
      {myMintedCryptoBoys[key].map((cryptoboy)=>{
       
 return(
 
  <>
 <div key ={index}>
    <MyCryptoBoyNFTDetails
           callback1={myCallback1}
           cryptoboy={cryptoboy}
           accountAddress={accountAddress}
          
           
         />
         </div>
         </>
         
);
      }
                
          )}
      </StackedCarousel>
     
      </div>
     
      </>
           )
    
       })}
 
           {/* {myMintedCryptoBoys.map((cryptoboy) => {
            return (
              <>
                            <Grid item xs={12} sm={6} lg={4} xl={3}> */}
              {/* <MyCryptoBoyNFTDetails
                      callback1={myCallback1}
                      cryptoboy={cryptoboy}
                      accountAddress={accountAddress}
                 
                    /> */}
                    {/* {!loading ? (
                      <CryptoBoyNFTImage
                       cryptoboy={cryptoboy}
                      />
                    ) : (
                      <Loading />
                    )}
                  </div>
                  <div className="col-md-6 text-center"
                  className="w-50 p-4 mt-1 border text-center">
                    <MyCryptoBoyNFTDetails
                      callback1={myCallback1}
                      cryptoboy={cryptoboy}
                      accountAddress={accountAddress}
                      
                    />
                  </div> */}
                  {/* </Grid>
                </>
              
            );
  
          })} */}
        
          </div>):(<>
          No Items Created</>)}
           
        </>):(<Loading/>)}
     
        
        </>):(
          <>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Bought
          </h5>
        </div>
      </div>
      
        {myBoughtCryptoBoys?(<>
        {Object.keys(myBoughtCryptoBoys).length!=0 ?(<div style={{display:"flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
        
        
          {Object.keys(myBoughtCryptoBoys).map((key,index)=>{
              {console.log(key)}
              return(
              <><div style={{height:"100vh"}}>
                <StackedCarousel
      autoRotate={false}
      onCardChange={onCardChange}
      //containerClassName={"container"}
      //cardClassName="card"
      leftButton={
        <button
          style={{
            marginRight: "10px",
            borderRadius: "50%",
            fontSize: "smaller",
            fontWeight: "700",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#dadde1"
          }}
        >
          {"<"}
        </button>
      }
      rightButton={
        <button
          style={{
            marginLeft: "10px",
            borderRadius: "50%",
            fontSize: "smaller",
            fontWeight: "700",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#dadde1"
          }}
        >
          {">"}
        </button>
      }>
      {myBoughtCryptoBoys[key].map((cryptoboy)=>{
       
 return(
  <>
    
  <div key ={index}>

 < MyBoughtDesignsDetails
           callback1={myCallback1}
           cryptoboy={cryptoboy}
           accountAddress={accountAddress}
      
         />
         </div>
        
  </>
);
      }
                
          )}
      </StackedCarousel>
              </div>
              </>
              )

    
       })}
{/* {myBoughtCryptoBoys.map((cryptoboy) => {
 return (
   <>
   <Grid item xs={12} sm={6} lg={4} xl={3}>
   < MyBoughtDesignsDetails
           callback1={myCallback1}
           cryptoboy={cryptoboy}
           accountAddress={accountAddress}
      
         /> */}
         {/* {!loading ? (
           <CryptoBoyNFTImage
            cryptoboy={cryptoboy}
           />
         ) : (
           <Loading />
         )}
       </div>
       <div className="col-md-6 text-center"
       className="w-50 p-4 mt-1 border text-center">
         <MyCryptoBoyNFTDetails
           callback1={myCallback1}
           cryptoboy={cryptoboy}
           accountAddress={accountAddress}
           
         />
       </div> */}
       {/* </Grid>
     </>
 )
 }
 )} */}

 </div>):(<>
 No Designs Bought</>)}
       </>):(<Loading/>)}
     </>
        )}
      </>):(<><Loading/></>)}
     

       
    </div>
    
  );
};

export default MyCryptoBoys;
