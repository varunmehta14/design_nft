import React, { useState, useEffect } from "react";
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage";
import MyCryptoBoyNFTDetails from "../MyCryptoBoyNFTDetails/MyCryptoBoyNFTDetails";
import Loading from "../Loading/Loading";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch'; 



const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingLeft:"5%",
    paddingRight:"5%",
   //width:"-webkit-fill-available",
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
  totalTokensOwnedByAccount,
  callbackFromParent1
}) => {
  const [loading, setLoading] = useState(false);
  const [myBoughtCryptoBoys, setMyBoughtCryptoBoys] = useState([]);
  const [myMintedCryptoBoys, setMyMintedCryptoBoys] = useState([]);
  const [myAllCryptoBoys, setMyAllCryptoBoys] = useState([]);

  const [checked, setChecked] = useState(false);
  


  useEffect(() => {
    if (cryptoBoys.length !== 0) {
      if (cryptoBoys[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }
    const my_bought_crypto_boys = cryptoBoys.filter(
      (cryptoboy) => cryptoboy.currentOwner === accountAddress && !(cryptoboy.mintedBy === accountAddress)
    );
    setMyBoughtCryptoBoys(my_bought_crypto_boys);
    const my_minted_crypto_boys = cryptoBoys.filter(
      (cryptoboy) => cryptoboy.mintedBy === accountAddress
    );
    setMyMintedCryptoBoys(my_minted_crypto_boys);
    const my_all_crypto_boys = cryptoBoys.filter(
      (cryptoboy) => cryptoboy.currentOwner === accountAddress
    );
    setMyAllCryptoBoys(my_all_crypto_boys);
  }, [cryptoBoys]);
  const classes=useStyles();
  // myCallBack=(address)=>{
  //   this.props.callbackFromParent(address)
  // }
  const myCallback1=(dataFromChild1)=>{
    console.log(dataFromChild1)
   // setAddress(dataFromChild1)
  callbackFromParent1(dataFromChild1)
   // console.log(address)
  }
  const gridStyles = useGridStyles();
  return (
    <div style={{padding:"0.5%"}}>
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
      <Grid classes={gridStyles} container spacing={4} >
         {myMintedCryptoBoys.map((cryptoboy) => {
          return (
            <>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
            <MyCryptoBoyNFTDetails
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
            
          );

        })}</Grid>
        </div>
        </>):(
          <>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Bought
          </h5>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"center",padding:"1%"}}>
      <Grid classes={gridStyles} container spacing={4} >
         {myBoughtCryptoBoys.map((cryptoboy) => {
          return (
            <>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
            <MyCryptoBoyNFTDetails
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
          )})}</Grid></div></>
        )}
       
    </div>
    
  );
};

export default MyCryptoBoys;
