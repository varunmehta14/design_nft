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
  
  const getCurrentUser=async()=>{
    if(theirAccountAddress){
      console.log("here")
      
     //const current=await users.find((user)=>user.userAddress===theirAccountAddress);
     await UserDataService.getByAddress(theirAccountAddress)
      .then(response => 
        { 
          console.log(response);
        setCurrentUser({
          userId: response.data[0].userId,
          userName: response.data[0].userName,
          userEmail: response.data[0].userEmail,
          userSocial: response.data[0].userSocial,
          userRepo: response.data[0].userRepo,
          userBio: response.data[0].userBio,
          userAvatarHash: response.data[0].userAvatarHash,
          userAddress: response.data[0].userAddress
        }
        );
     
       console.log(currentUser)
      
      })
      .catch(e => {
        console.log(e);
      });
   
   
   
    }
  }

  useEffect(() => {
    getCurrentUser();
    
    const my_bought_crypto_boys = cryptoBoys.filter(
      (cryptoboy) => cryptoboy.currentOwner === theirAccountAddress && !(cryptoboy.mintedBy === theirAccountAddress)
    );
    setMyBoughtCryptoBoys(my_bought_crypto_boys);
    const my_minted_crypto_boys = cryptoBoys.filter(
      (cryptoboy) => cryptoboy.mintedBy === theirAccountAddress
    );
    setMyMintedCryptoBoys(my_minted_crypto_boys);
    const my_all_crypto_boys = cryptoBoys.filter(
      (cryptoboy) => cryptoboy.currentOwner === theirAccountAddress
    );
    setMyAllCryptoBoys(my_all_crypto_boys);
  }, [cryptoBoys]);
  const myCallback1=(dataFromChild1)=>{
    console.log(dataFromChild1)
   // setAddress(dataFromChild1)
  callbackFromParent1(dataFromChild1)
   // console.log(address)
  }
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
     

     
      {!checked ?
      ( <>
        
                <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Collections
          </h5>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"center",padding:"1%"}}>
        {myMintedCryptoBoys?(<>
          {myMintedCryptoBoys.length !=0 ? (<>
           <Grid classes={gridStyles} container spacing={4} >
           {myMintedCryptoBoys.map((cryptoboy) => {
            return (
              <>
              <Grid item xs={12} sm={6} lg={4} xl={3}>
              <MyCryptoBoyNFTDetails
                      callback1={myCallback1}
                      cryptoboy={cryptoboy}
                      accountAddress={theirAccountAddress}
                 
                    />
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
                  </Grid>
                </>
              
            );
  
          })}</Grid>
  
         </>):(<>
          No Items Created</>)}
           
        </>):(<Loading/>)}
     
        </div>
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
      <div style={{display:"flex",justifyContent:"center",padding:"1%"}}>
      {myBoughtCryptoBoys?(<>
        {myBoughtCryptoBoys.length!=0?(<>
        
          <Grid classes={gridStyles} container spacing={4} >

{myBoughtCryptoBoys.map((cryptoboy) => {
 return (
   <>
   <Grid item xs={12} sm={6} lg={4} xl={3}>
   < MyBoughtDesignsDetails
           callback1={myCallback1}
           cryptoboy={cryptoboy}
           accountAddress={accountAddress}
      
         />
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
       </Grid>
     </>
 )})}</Grid></>):(<>
 No Designs Bought</>)}
       </>):(<Loading/>)}
     </div>
          </>
        )}</>):(<><h3>User name does not exist</h3></>)}
     
       
    </div>
    
  );
};

export default TheirCryptoBoys;
