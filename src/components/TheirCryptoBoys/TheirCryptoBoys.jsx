import React, { useState, useEffect } from "react";
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage";
import MyCryptoBoyNFTDetails from "../MyCryptoBoyNFTDetails/MyCryptoBoyNFTDetails";
import Loading from "../Loading/Loading";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch'; 
import TheirAccountDetails from "../TheirAccountDetails/TheirAccountDetails";
import MyBoughtDesignsDetails from "../MyBoughtDesigns/MyBoughtDesignsDetails";
import UserDataService from "../../services/UserService";
import { StackedCarousel } from 'react-stacked-carousel';


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

const initialUserState = {
  userId: null,
  userName: "",
  userEmail: "",
  userSocial: "",
  userRepo: "",
  userBio: "",
  userAvatarHash: "https://ipfs.infura.io/ipfs/QmZ7smTQUxBXZW7Bx14VuxPgBurp2PcF7H9G6F74nC9viX",
  userAddress: "",

};

const TheirCryptoBoys = ({
  accountAddress,
  cryptoBoys,
  
  callbackFromParent1,
  //cryptoBoysContract,
  
  userExists,
 

}) => {
  const [loading, setLoading] = useState(false);
  const [myBoughtCryptoBoys, setMyBoughtCryptoBoys] = useState([]);
  const [myMintedCryptoBoys, setMyMintedCryptoBoys] = useState([]);
  const [myAllCryptoBoys, setMyAllCryptoBoys] = useState([]);
  const[currentUser,setCurrentUser]=useState(initialUserState);
  //const [theirAccountAddress,setTheirAccountAddress]=useState("")
  //console.log(theirAccountAddress);
  let theirAccountAddress=accountAddress;
  if(!accountAddress){theirAccountAddress=window.location.href.split("/")[4]};
  console.log(accountAddress);
  const [checked, setChecked] = useState(false);
  console.log("cryptoBoys",cryptoBoys);
  const getCurrentUser=async()=>{
    if(theirAccountAddress){
      console.log("here")
      
     //const current=await users.find((user)=>user.userAddress===theirAccountAddress);
     await UserDataService.getByAddress(theirAccountAddress)
      .then(response => 
        { 
          console.log(response);
        setCurrentUser({
          userId: response.data.data[0].userId,
          userName: response.data.data[0].userName,
          userEmail: response.data.data[0].userEmail,
          userSocial: response.data.data[0].userSocial,
          userRepo: response.data.data[0].userRepo,
          userBio: response.data.data[0].userBio,
          userAvatarHash: response.data.data[0].userAvatarHash,
          userAddress: response.data.data[0].userAddress
        }
        );
     
       console.log(currentUser)
      
      })
      .catch(e => {
        console.log(e);
      });
   
   
   
    }
  }
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
    getCurrentUser();
    let tokens=cryptoBoys.map((cryptoBoy)=>{return cryptoBoy[0]});
    const my_minted_crypto_boys = tokens.filter(
      (cryptoboy) => cryptoboy.mintedBy === theirAccountAddress
    );
    const groupedMy = groupBy(my_minted_crypto_boys, 'name');
    setMyMintedCryptoBoys(groupedMy);
    const my_bought_crypto_boys = tokens.filter(
      (cryptoboy) => cryptoboy.currentOwner === theirAccountAddress && !(cryptoboy.mintedBy === theirAccountAddress)
    );
    const groupedMyBought = groupBy(my_bought_crypto_boys, 'name');
    setMyBoughtCryptoBoys(groupedMyBought);
    
    // const my_all_crypto_boys = cryptoBoys.filter(
    //   (cryptoboy) => cryptoboy.currentOwner === theirAccountAddress
    // );
    // setMyAllCryptoBoys(my_all_crypto_boys);
  }, [cryptoBoys]);
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
  const classes=useStyles();
  const gridStyles = useGridStyles();
  return (
    
    <div style={{padding:"0.5%"}}>
      {userExists?(<>
        {currentUser?(
           <TheirAccountDetails 
           accountAddress={theirAccountAddress}
          // cryptoBoysContract={cryptoBoysContract}
          
           currentUser={currentUser}
           />
        ):(<Loading/>)}
         
       
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          {/* <h5>
            Total No. of Designs They Own : {myAllCryptoBoys.length}
          </h5> */}
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
  {!checked ?
      ( <>
        
                <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Collections
          </h5>
        </div>
      </div>
    
        {myMintedCryptoBoys.length!=0?(<>
          {myMintedCryptoBoys.length !=0 ? (
          <div style={{display:"flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
         
           {Object.keys(myMintedCryptoBoys).map((key,index)=>{
              {console.log(key)}
              return(<div style={{height:"100vh"}}>
                <StackedCarousel
      autoRotate={false}
      onCardChange={onCardChange}
      // containerClassName={"container"}
      // cardClassName="card"
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
            marginLeft: "40px",
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
 {console.log("here",cryptoboy)}
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
              </div>)
    
       })}
           {/* {myMintedCryptoBoys.map((cryptoboy) => {
            return (
              <>
              <Grid item xs={12} sm={6} lg={4} xl={3}>
              <MyCryptoBoyNFTDetails
                      callback1={myCallback1}
                      cryptoboy={cryptoboy}
                      accountAddress={theirAccountAddress}
                 
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
     
       
        </>
            
          )

       :(
          <>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Bought
          </h5>
        </div>
      </div>
     
      {myBoughtCryptoBoys.length!=0?(<>
        {myBoughtCryptoBoys.length!=0?(
        <div style={{display:"flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
        
        <Grid classes={gridStyles} container spacing={4} >
          {Object.keys(myBoughtCryptoBoys).map((key,index)=>{
              {console.log(key)}
              return(
              <div style={{height:"100vh"}}>
                 <Grid item xs={12} sm={6} lg={4} xl={3} >
                <StackedCarousel
      autoRotate={false}
      onCardChange={onCardChange}
      // containerClassName={"container"}
      // cardClassName="card"
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
            marginLeft: "40px",
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
 {console.log("here",cryptoboy)}
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
      </Grid>
              </div>)
    
       })}
       </Grid>
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
 )})} */}
 </div>):(<>
 No Designs Bought</>)}
       </>):(<Loading/>)}
   
          </>
        )}
</>):(<><Loading/></>)}
     

        </>):(<><h3>User name does not exist</h3></>)}
     
       
    </div>
    
  );
};

export default TheirCryptoBoys;
