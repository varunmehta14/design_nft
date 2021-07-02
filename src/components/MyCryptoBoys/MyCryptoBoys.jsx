import React, { useState, useEffect } from "react";
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage";
import MyCryptoBoyNFTDetails from "../MyCryptoBoyNFTDetails/MyCryptoBoyNFTDetails";
import Loading from "../Loading/Loading";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch'; 




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
  return (
    <div>
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
      <div className="d-flex flex-wrap mb-2">
        
         {myMintedCryptoBoys.map((cryptoboy) => {
          return (
            <>
            <div
              key={cryptoboy.tokenId.toNumber()}
              className="col-md-6 "
              className="w-50 p-4 mt-1 border"
              style={{display:"flex"}}
              
            >
            
                  {!loading ? (
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
                </div>
              </>
            
          );

        })}</div></>):(
          <>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Bought
          </h5>
        </div>
      </div>
      <div className="d-flex flex-wrap mb-2">
         {myBoughtCryptoBoys.map((cryptoboy) => {
          return (
            <>
            <div
              key={cryptoboy.tokenId.toNumber()}
              className="col-md-6 "
              className="w-50 p-4 mt-1 border"
              style={{display:"flex"}}
              
            >
            
                  {!loading ? (
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
                </div>
              </>
          )})}</div></>
        )}
       
    </div>
    
  );
};

export default MyCryptoBoys;
