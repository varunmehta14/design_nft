module.exports =app=>{

const Chat = require('../controllers/chat.controller.js');

var router = require("express").Router();


router
  
  .post('/chat',Chat.getChats);

router
  
  .post('/newRoom',Chat.newRoom);

router
  
  .post('/newGroup',Chat.newGroup);

router
 
  .get('/getRooms',Chat.allRooms);

router
  
  .get('/getGroups',Chat.allGroups);

router
  
  .post('/deleteConversation',Chat.deleteConversation);

};