import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, useParams, Link, useHistory } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import io from 'socket.io-client';
import axios from 'axios';
import moment from 'moment';
import { Paper, Avatar, IconButton, Box, Menu, MenuItem } from '@material-ui/core';
import { useChatComponentStyles } from './ChatStyles';
import '../App.css';
import { AttachFile, InsertEmoticon, MoreVert, Send, ArrowBackIos } from '@material-ui/icons';

function ChatComponent(props) {
  const { chatId, grpId } = useParams();
  const history = useHistory();
  const { name, email, dp, connections } = props.user;

  const bottomRef = useRef();
  const mediaUploadRef = useRef();

  const [update, setUpdate] = useState(true);
  const [roomName,setRoomName] = useState(null);
  const [chatMsg,setChatMsg] = useState('');
  const [msgs,setMsgs] = useState([]);
  const [file, setFile] = useState(null);
  const [isVisible,setVisible] = useState(false);
  const [placeholder,setPlaceholder] = useState('Type a message');

  const [p2, setP2] = useState({});
  const [groups, setGroups] = useState([]);

  const scrollToBottom = () => {
    if(typeof(chatId) !== 'undefined') {
      bottomRef.current.scrollIntoView({
        behaviour: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  const server = 'http://localhost:8080';
  const socket = io(server);

  const connectSocket = async () => {
    await socket.on('Output Chat Message', (msgServer) => {
      console.log(msgServer[0]);
      if(msgServer[0].chatMessage != null) {
        setMsgs(prev => {
          if(prev.length>0 && prev[prev.length-1]._id !== msgServer[0]._id) prev.push(msgServer[0]);
          else if(prev.length === 0) prev.push(msgServer[0]);

          return([
          ...prev
          ])
        });
      }
    })
  };

  const getChats = async () => {
    if(chatId) {
      const res = await axios.post('http://localhost:8080/chat', { 
        roomId: chatId,
      });
      console.log(res.data);
      setMsgs(res.data);
    }
    else if(grpId) {
      const res = await axios.post('http://localhost:8080/chat', { 
        grpId: grpId,
      });
      console.log(res.data);
      setMsgs(res.data);
    }
  };

  useEffect(() => {
    if(chatId) {
      setRoomName(chatId);
    }
    else if(grpId) {
      setRoomName(grpId);
    }
  },[])

  useEffect(() => {
    getChats();
    const getDetails = async () => {
      if(chatId) {
        const rooms = await axios.get('http://localhost:8080/getRooms');
        for(let i=0;i<rooms.data.length;i++) {
          if(rooms.data[i]._id === chatId) {
            setP2(rooms.data[i].p2.email === email ? rooms.data[i].p1 : rooms.data[i].p2);
          }
        }
      }
      else if(grpId) {
        const rooms = await axios.get('http://localhost:8080/getGroups');
        for(let i=0;i<rooms.data.length;i++) {
          if(rooms.data[i]._id === grpId) {
            let str1 = `${rooms.data[i].members[0].name}`;
            for(let k=1;k<rooms.data[i].members.length;k++) {
              let temp = str1.concat(`, ${rooms.data[i].members[k].name}`);
              str1 = temp;
            }
            setP2({ name: rooms.data[i].name, dp: `http://localhost:8080/${rooms.data[i].pic}`, email: str1 });
            break;
          }
        }
      }
    }
    getDetails();
  }, [roomName])

  useEffect(() => {
    connectSocket();
  },[update])

  useEffect(() => {
    scrollToBottom();
  },[msgs])

  const onEmojiClick = (event, emojiObject) => {
    setChatMsg((prev) => `${prev}${emojiObject.emoji}`)
  };

  const handleChange = (e) => { 
    setChatMsg(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let chatMessage,type,grpMsg;

    if(file == null) {
      chatMessage = chatMsg;
      type = 'Text'; 
    }
    else {
      const data = new FormData();
      data.append('file',file);
      const url = 'http://localhost:8080/mediaMsg';
      const res = await axios.post(url,data);
      console.log(res);
      chatMessage = res.data;
      type = 'Media';
    }

    if(chatId) {
      grpMsg = false;
      await socket.emit('Input Chat Message', {
        chatMessage,
        email,
        name,
        grpMsg,
        type,
        roomName
      });
    }
    else if(grpId) {
      grpMsg = true;
      await socket.emit('Input Chat Message', {
        chatMessage,
        email,
        name,
        grpMsg,
        type,
        grpId
      });
    }

    setFile(null);
    setChatMsg('');
    setVisible(false);
    setUpdate((prev) => !prev);
  };

  const onChangeHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setPlaceholder('Click on send to send your msg');
  };

  const showEmojiPicker = () => {
    setVisible(true);
  };

  const classes = useChatComponentStyles();

  const [anchorEl1, setAnchorEl1] = useState(null);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  return(
    <div className='chatComponent'>
      <Paper square>
        {/* Chat Component {chatId} */}
        <Router><Switch>
        {/* {typeof(chatId) !== 'undefined' ? */}
        <Route path={`/chat/:chatId`}>
        <div className='chat'>
        <Paper elevation={2} square>
          <div className={classes.chatTop}>
            <Box display={{xs:'block',sm:'none'}}>
              <IconButton onClick={() => window.location.href = "http://localhost:3000/chat"}>
                <ArrowBackIos className={classes.icons} />
              </IconButton>
            </Box>
            <Avatar style={{marginLeft: '15px'}} src={p2.dp} />

            <div className={classes.chatTopInfo}>
              <p><span style={{fontWeight: 'bold'}}>{p2.name}</span><br />
              <span style={{whiteSpace: 'nowrap',overflow: 'hidden', color: '#808080'}}>{p2.email}</span></p>
            </div>

            <div className={classes.chatTopRight}>
              <input type='file' ref={mediaUploadRef} style={{display: 'none'}} onChange={onChangeHandler} />
              <IconButton onClick={() => mediaUploadRef.current.click()}>
                <AttachFile className={classes.icons} />
              </IconButton>
              <IconButton onClick={handleClick1}>
                <MoreVert className={classes.icons} />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl1}
                keepMounted
                open={Boolean(anchorEl1)}
                onClose={handleClose1}
              >
              <MenuItem onClick={async () => {
                handleClose1();
                if(chatId) {
                  await axios.post('http://localhost:8080/deleteConversation',{
                    roomId: chatId
                  });
                }
                else if(grpId) {
                  await axios.post('http://localhost:8080/deleteConversation',{
                    grpId: grpId
                  });
                }
                window.location.href="http://localhost:3000/chat";
              }}>Delete Conversation</MenuItem>
            </Menu>
            </div>
          </div>
          </Paper>
          <div className='chatBody'>
          {file === null ?
          <React.Fragment>
          {msgs.map(msg => 
          <div className={msg.senderEmail === email ? 'chatMsgSend' : 'chatMsgGet'} key={msgs.indexOf(msg)+1}>
            <span style={{fontWeight: 800,fontSize: 'small',color: '#3F3D56',display: msg.senderEmail === email || chatId ? 'none' : msg.chatMessage.substring(0,6) !== 'public' ? 'initial' : 'block'}}>{msg.senderName}</span>
            {
              msg.chatMessage.substring(0,6) !== 'public' ? 
              <React.Fragment>
                <br style={{display: msg.senderEmail === email || chatId ? 'none' : 'initial'}} />
                {msg.chatMessage}
              </React.Fragment> 
              :
              msg.chatMessage.substring(msg.chatMessage.length - 3,msg.chatMessage.length) === 'mp4' ?
              <video style={{width:'200px',maxWidth: '100%',marginTop: '2px'}} src={`http://localhost:8080/${msg.chatMessage}`} alt='mediaVideo' type='video/mp4' controls />
              :
              msg.chatMessage.substring(msg.chatMessage.length - 3,msg.chatMessage.length) === 'jpg' || msg.chatMessage.substring(msg.chatMessage.length - 3,msg.chatMessage.length) === 'png' || msg.chatMessage.substring(msg.chatMessage.length - 3,msg.chatMessage.length) === 'jpeg'?
              <img style={{width:'200px',maxWidth: '100%',marginTop: '2px'}} src={`http://localhost:8080/${msg.chatMessage}`} alt='mediaImg' /> 
              :
              <a href={`http://localhost:8080/${msg.chatMessage}`} download={msg.chatMessage.substring(7,msg.chatMessage.length)}>{msg.chatMessage.substring(7,msg.chatMessage.length)}</a>
              // <div style={{height: '100%'}}>
              //   <iframe src={`http://localhost:8080/${msg.chatMessage}`} style={{width:'200px',maxWidth: '100%',marginTop: '2px'}} ></iframe>
              // </div>
            }
            <br />
            <div style={{textAlign: 'right'}}>
              <span className={classes.chatTimestamp}>{moment(msg.createdAt).format('DD/MM/YY hh:mm')}</span>
            </div>
            </div>  
          )}

          <div ref={bottomRef}></div>
          </React.Fragment>
          :
          <div style={{height: '100%'}}>
            <iframe src={URL.createObjectURL(file)} style={{width: '100%',height: '100%'}}></iframe>
          </div>
          }
         </div>
          <Paper elevation={2} square>
          <div className={classes.chatFooter}>
            <div className='emojiPosition' style={{display: isVisible ? 'initial' : 'none'}}>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
            <IconButton onClick={showEmojiPicker}>
              <InsertEmoticon />
            </IconButton>
            <form id='myForm' className={classes.form}>
              <input type='text' placeholder={placeholder} className={classes.input} value={chatMsg} onChange={handleChange} disabled={file === null ? false : true} />
              <IconButton type='submit' style={{border: 'none',backgroundColor: '#fff'}} onClick={handleSubmit} disabled={chatMsg.trim() !== '' || file !== null ? false : true}>
                <Send />
              </IconButton>
            </form>
          </div>
          </Paper>
        </div>
        </Route>
        <Route exact path='/chat'>
        <div style={{height: '90vh'}}>
          <img src={require('../assets/emptyChat.png')} alt='emptyChat' style={{height: '90%',maxHeight: '80vh',maxWidth: '90%'}} />
          <h2 style={{color: '#3F3D56', marginBottom: '20px'}}>Select a conversation or Start a new Chat</h2>
        </div>
        </Route>
        </Switch></Router>
      </Paper>
    </div>
  )
};

export default ChatComponent;