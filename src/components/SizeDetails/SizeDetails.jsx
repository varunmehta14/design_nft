import React from "react";
const SizeDetails=(props)=>{
    console.log(props)
    let tokenNo=props.tokenNoOfDress;
    let price=props.priceOfDress;
    console.log(window.location.href.split("/"))
    // if(!props.tokenNo){
    //     tokenNo=window.location.href.split("/")[4];
    //     price=window.location.href.split("/")[5];
    // }
    console.log(props.tokenNoOfDress)
    return(

     <div>
        
        {tokenNo}
         <button
                className="btn btn-outline-primary mt-3 "
                value={price}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={(e) =>
                  props.buyCryptoBoyWithDress(
                    tokenNo,
                    e.target.value)
                }
              // onClick={(e)=>{props.tokenIdAndPrice(props.cryptoBoys[thistokenId].tokenId.toNumber(),e.target.value)}}
               //onClick={handleOpen}
              >
               Buy with Dress For{" "}
                {window.web3.utils.fromWei(
                  price.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </button>
     </div>
    );
}

export default SizeDetails;