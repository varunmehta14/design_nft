import axios from "axios";
let token = localStorage.getItem("token");


export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-type": "application/json",
    Accept: "application/json",

   
  },
  mode:"cors"
});