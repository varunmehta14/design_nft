import http from "../http-common.js";

const getAccountBalance = id => {
  return http.get(`/nfts/accountBalance/${id}`);
};

const getCount=()=>{
  return http.get(`/nfts/getCount`);
}
const getAllDesigns=()=>{
  return http.get(`/nfts/allDesigns`);
}
const getTokensMinted=()=>{
  return http.get(`/nfts/tokensMinted`);
}
const getTokensOwnedByAccount=(data)=>{
  return http.post(`/nfts/tokensOwnedByAccount`,data)

}
const getNameIsUsed=(data)=>{
  return http.post(`nfts/nameUsed`,data)
}
const getImageIsUsed=(data)=>{
  return http.post(`nfts/imageUsed`,data)
}
const createDesign=(data)=>{
  return http.post(`nfts/createDesign`,data)
}

const toggleSale=(data)=>{
  return http.post(`nfts/toggleSale`,data)
}
const changeTokenPrice=(data)=>{
  return http.post(`nfts/changetokenPrice`,data)
}

const changeTokenDressPrice=(data)=>{
  return http.post(`nfts/changetokenDressPrice`,data)
}

const buyCryptoBoy=(data)=>{
  return http.post(`nfts/buyCryptoBoy`,data)
}

const buyCryptoBoyWithDress=(data)=>{
  return http.post(`nfts/buyCryptoBoyWithDress`,data)
}

export default {
  getAccountBalance,
  getCount,
  getAllDesigns,
  getTokensMinted,
  getTokensOwnedByAccount,
  getNameIsUsed,
  getImageIsUsed,
  createDesign,
  toggleSale,
  changeTokenPrice,
  changeTokenDressPrice,
  buyCryptoBoy,
  buyCryptoBoyWithDress
} ;