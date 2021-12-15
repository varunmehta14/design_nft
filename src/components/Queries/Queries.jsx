import React, { useState } from "react";

const Queries = (props) => {
  // const [tokenIdForOwner, setTokenIdForOwner] = useState("");
  // const [tokenOwner, setTokenOwner] = useState("");
  // const [tokenIdForOwnerNotFound, setTokenIdForOwnerNotFound] = useState(false);

  // const [tokenIdForMetadata, setTokenIdForMetadata] = useState("");
  // const [tokenMetadata, setTokenMetadata] = useState("");
  // const [tokenMetadataLink, setTokenMetadataLink] = useState("");
  // const [tokenIdForMetadataNotFound, setTokenIdForMetadataNotFound] = useState(
  //   false
  // );
console.log(props.token)
  // const getTokenOwner = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const owner = await props.cryptoBoysContract.methods
  //       .getTokenOwner(props.token)
  //       .call();
  //     setTokenOwner(owner);
  //     setTimeout(() => {
  //       setTokenOwner("");
  //       setTokenIdForOwner("");
  //     }, 5000);
  //   } catch (e) {
  //     setTokenIdForOwnerNotFound(true);
  //     setTokenIdForOwner("");
  //   }
  // };

  // const getTokenMetadata = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const metadata = await props.cryptoBoysContract.methods
  //       .getTokenMetaData(props.token)
  //       .call();
  //     setTokenMetadata(
  //       metadata.substr(0, 60) + "..." + metadata.slice(metadata.length - 5)
  //     );
  //     setTokenMetadataLink(metadata);
  //     setTimeout(() => {
  //       setTokenMetadata("");
  //       setTokenIdForMetadata("");
  //     }, 5000);
  //   } catch (e) {
  //     setTokenIdForMetadataNotFound(true);
  //     setTokenIdForMetadata("");
  //   }
  // };
 
  const handleClick=(e)=>{
     console.log(props)
    e.preventDefault();
    //window.open(props.imageUrl, "_blank") 
  }

  return (
    <div>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>View Proof Of Authenticity</h5>
        </div>
      </div>
      <div className="p-4 mt-1 border" style={{display:"flex",justifyContent:"space-evenly"}}>
       
         
            
            {/* <form onSubmit={getTokenOwner}> */}
              {/* <div className="form-group">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={tokenIdForOwner}
                  placeholder="Enter Token Id"
                  onChange={(e) => setTokenIdForOwner(e.target.value)}
                />
              </div> */}
              <button className="mt-3 btn btn-outline-primary"  >
                View Token Object
              </button>
             
              {/* {tokenIdForOwnerNotFound ? (
                <div className="alert alert-danger alert-dissmissible mt-4">
                  <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                  <strong>Non-Existent Token Id</strong>
                </div>
              ) : null} */}
            {/* </form> */}
            {/* <p className="mt-4">{tokenOwner}</p> */}
         
         
           
           <form onSubmit={(e)=>{handleClick(e)}}>
           {/* <form onSubmit={(e)=>{getTokenMetadata(e,props.token)}}> */}
              {/* <div className="form-group">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={tokenIdForMetadata}
                  placeholder="Enter Token Id"
                  onChange={(e) => setTokenIdForMetadata(e.target.value)}
                />
              </div> */}
              <button className="mt-3 btn btn-outline-primary" type="submit">
                View On IPFS
              </button>
              {/* {tokenIdForMetadataNotFound ? (
                <div className="alert alert-danger alert-dissmissible mt-4">
                  <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                  <strong>Non-Existent Token Id</strong>
                </div>
              ) : null} */}
            </form>
           
        
        
      </div>
      {/* <p className="mt-4">
              <a
                href={`${tokenMetadataLink}`}
               // href={props.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tokenMetadata}
              </a>
            </p> */}
    </div>
  );
};

export default Queries;
