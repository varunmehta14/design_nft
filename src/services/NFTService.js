import http from "../http-common.js";

const getAccountBalance = id => {
  return http.post(`/nfts/accountBalance/${id}`);
};





export default {
  getAccountBalance,
  
  
} ;