import React, { useState, useEffect } from "react";
import CryptoBoyNFTImage from "../CryptoBoyNFTImage/CryptoBoyNFTImage";
import CryptoBoyNFTDetails from "../CryptoBoyNFTDetails/CryptoBoyNFTDetails";
import NFTHighlights from "../NFTHighlights/NFTHighlights";
import Loading from "../Loading/Loading";



const AllCryptoBoys = ({
  cryptoBoys,
  accountAddress,
  totalTokensMinted,
  changeTokenPrice,
  toggleForSale,
  buyCryptoBoy,
  callbackFromParent
}) => {
  const [loading, setLoading] = useState(false);
  const [address,setAddress]=useState("");
 //console.log(cryptoBoys[0])
  useEffect(() => {
    if (cryptoBoys.length !== 0) {
      if (cryptoBoys[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }
  }, [cryptoBoys]);
  
  const myCallback1=(dataFromChild1)=>{
    //console.log(dataFromChild)
   // setAddress(dataFromChild1)
    callbackFromParent(dataFromChild1)
   // console.log(address)
  }
  
  return (
    <div>
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
