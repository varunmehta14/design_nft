import React from "react";
import loadingGIF from "./loading.gif";

const Loading = () => {
  return (<img src={loadingGIF} alt="Loading.."
   className="d-block m-auto"  style={{padding:"5%"}}
   />);
};

export default Loading;
