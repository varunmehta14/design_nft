import React from "react";

const CryptoBoyNFTImage = (props) => {
  
  const cryptoboy_card = {
   // width: "280px",
   // height: "260px",
    margin: "auto",
   // backgroundColor: `${cardBackgroundColor}`,
   // border: `10px solid ${cardBorderColor}`,
  };
//console.log(props.cryptoboy.imageHash)
  

  return (
    <div style={cryptoboy_card}>
     <img src={props.cryptoboy.imageHash} style={{borderStyle:"solid"}}/>  </div>
  );
};

export default CryptoBoyNFTImage;
