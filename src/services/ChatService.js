import http from "../http-common.js";

const getAllRooms = () => {
  return http.get("/getRooms");
};

const getAllGroups = () => {
    return http.get("/getGroups");
  };
const createNewRoom = (data1,data2) => {
  
  return http.post("/newRoom",{data1,data2});
};

const createNewGroup = (data) => {
  
    return http.post("/newGroup",data);
  };

const getChats = (data) => {
  
    return http.post("/chat",data);
};

const deleteConversation = (data) => {
  
    return http.post("/deleteConversation",data);
};







export default {
  getAllRooms,
  getAllGroups,
  createNewGroup,
  createNewRoom,
  getChats,
  deleteConversation
  
  
} ;