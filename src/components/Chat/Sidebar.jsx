import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { CssBaseline, Paper, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItemIcon, Menu, MenuItem, Modal, TextField, Button } from '@material-ui/core';
import { DonutLarge, MoreVert, Chat, SearchOutlined, Add, PowerSettingsNew, Delete } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link } from 'react-router-dom';
import SidebarChats from './SidebarChats';
import '../App.css';
import { useSidebarStyles } from './ChatStyles';
import useAuth from './useAuth';
import axios from 'axios';
import ChatService from '../../services/ChatService';
import UserService from '../../services/UserService';   
function Sidebar(props) {
  //const { name, email, dp } = props.user;
 const name=props.user.userName;
 const email=props.user.userEmail;
 const dp=props.user.userAvatarHash;
  const [authorise, unauthorise, ProtectedRoutes] = useAuth();
  const history = useHistory();

  const searchRef = useRef(null);

  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setSearching] = useState(false);
  const [ne, setNe] = useState(true);
  const [gName, setGName] = useState('');
  const [grpImg, setGrpImg] = useState(null);
  const [grpMem, setGrpMem] = useState([]);
  const [grpMemT, setGrpMemT] = useState('');
  const [sM, setSM] = useState('');

  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);

  const [modalStyle,setModalStyle] = useState({
    top: '20%',
    left: '13%',
    transform: 'translate(-20%, -13%)'
  });
  const [open, setOpen] = useState(false);
console.log(props.user)
  const handleOpen2 = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen(false);
    setGName('');
    setGrpMem([email]);
    setGrpMemT('');
    setGrpImg(null);
  };

  const classes = useSidebarStyles();

  const [anchorEl1, setAnchorEl1] = useState(null);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  useEffect(() => {
    const getDetails = async () => {
     const resDes = await UserService.getAll().then(response=>{
      console.log(response.data);
      setData(response.data);
      console.log(this.state.allUsers)
    })
    .catch(e => {
      console.log(e);
    });
      const rooms = await ChatService.getAllRooms();
      const grps = await ChatService.getAllGroups();
      
      let myRooms = [], myGroups = [];
      for(let j=0;j<rooms.data.length;j++) {
        if(rooms.data[j].p1.email === email || rooms.data[j].p2.email === email) myRooms.push(rooms.data[j]);
      }
      setRooms(myRooms);
      for(let i=0;i<grps.data.length;i++) {
        for(let j=0;j<grps.data[i].members.length;j++) {
          if(grps.data[i].members[j].email === email) {
            myGroups.push(grps.data[i]);
            break;
          }
        }
      }
      setGroups(myGroups);
      let names = [], aUsers = [];
      for(let i=0;i<resDes.data.length;i++) {
        if(resDes.data[i].email !== email) {
          names.push(resDes.data[i].email);
          aUsers.push(resDes.data[i]);
        }
      }
      setAllUsers(aUsers);
      for(let i=0;i<names.length;i++) {
        for(let j=0;j<myRooms.length;j++) {
          if(myRooms[j].p1.email === names[i] || myRooms[j].p2.email === names[i]) names.splice(i,1);
        }
      }
      setUsers(names);
    }
    getDetails();
  },[email, ne])

  useEffect(() => {
    setGrpMem([email]);
  }, [email])

  useEffect(() => {
    for(let i=0;i<allUsers.length;i++) {
      if(sM === allUsers[i].email) {
        setGrpMem((prev) => {
          if(sM !== prev[prev.length-1]) prev.push(sM);

          return([
            ...prev
          ])
        })
      }
    }
  }, [sM])

  useEffect(() => {
    let str1 = `${grpMem[0]}`;
    for(let i=1;i<grpMem.length;i++) {
      let temp = str1.concat(`a.@.a${grpMem[i]}`);
      str1 = temp;
      setGrpMemT(str1);
    }
  }, [grpMem])

  useEffect(() => {
    if(isSearching) {
      searchRef.current.focus();
      setSearching(false);
    }
  }, [isSearching])

  const onTextChanged = (e) => {
    document.querySelector(".sug").style.display="block";
    const value = e.target.value;
    let suggestions = [];
    if(value.length > 0) {
      try{
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = users.sort().filter(v => regex.test(v));
      }
      catch(err)
      {
        setSuggestions(suggestions);
      }
    }
    setSuggestions(suggestions);
    setText(value);
  };

  const suggestionSelected = async (value) => {
    // setText(value);
    setSuggestions([]);
    await ChatService.createNewRoom({
      p1: email,
      p2: value
    })
    // await axios.post('http://localhost:8080/newRoom',{
    //   p1: email,
    //   p2: value
    // });
    setText('');
    setNe((prev) => !prev);
  };

  const renderSuggestions = () => {
    if(suggestions.length === 0) {
      return (
        <React.Fragment></React.Fragment>
      );
    }
    return (
      <List dense className={classes.list}>
      {suggestions.map((value,index) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        let mySrc;
        for(let i=0;i<data.length;i++) {
          if(data[i].email === value) {
            mySrc = data[i].dp;
            break;
          }
        }
        return (
          <ListItem key={index} button onClick={() => suggestionSelected(value)}>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={mySrc}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={value} />
            {/* <ListItemSecondaryAction>
              <IconButton>
                <Chat />
              </IconButton>
            </ListItemSecondaryAction> */}
          </ListItem>
        );
      })}
    </List>
    );
  };

    if(document.querySelector(".inp")===null?"":document.querySelector('.inp').value==="")
    {
      if(document.querySelector(".sug")!==null)
        document.querySelector(".sug").style.display="none";
    }
    else
    {
      if(document.querySelector(".sug")!==null)
        document.querySelector(".sug").style.display="inherit";
    }

    if(document.querySelector(".srchList")!==null)
      document.querySelector(".srchList").style.width="100%";

    document.addEventListener("click", function (e) {
      // var x = document.getElementsByClassName("frm-hd");
      //   if (e.target !== x) {
          // if(document.querySelector(".sug")!==null)
            // document.querySelector(".sug").style.display="none";
        // }
    });

  const body = (
    <div style={modalStyle} className={classes.modal}>
      <h1 id="simple-modal-title">Group Details</h1>
      <div id="simple-modal-description">
        <TextField id="standard-basic" label="Group Name" value={gName} onChange={(e) => setGName(e.target.value)} />
        <img src={grpImg === null ? grpImg : URL.createObjectURL(grpImg)} style={{maxWidth: '200px',maxHeight: '200px', display: grpImg === null ? 'none':'flex',margin: '5px 0 0 0'}} />
        <div style={{marginTop: '25px',width: '100%'}}>
          <input type="file" onChange={(e) => setGrpImg(e.target.files[0])} name='grpImg' />
        </div>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={allUsers.map((option) => option.email)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
              onChange={(e) => setSM(e.target.value)}
              onClick={(e) => setSM(e.target.value)}
              onMouseOver={(e) => setSM(e.target.value)}
            />
          )}
        />
        <h2>Group Members</h2>
        {grpMem.map((mem) => <p>{mem}</p>)}
        <Button variant="contained" color="primary" onClick={async (e) => {
          e.preventDefault();
          const data = new FormData();
          data.append('name',gName);
          data.append('members',grpMemT);
          data.append('file',grpImg);
          //const url = 'http://localhost:8080/newGroup';
          await ChatService.createNewGroup(data);
          setGName('');
          setGrpMem([email]);
          setGrpMemT('');
          setGrpImg(null);
          handleClose2();
          setNe((prev) => !prev);
        }}>
          Create Group
        </Button>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper elevation={5} square className='mainPaper'>
        <div className={classes.sidebarTop}>
          <Avatar src={dp} />
          <div className={classes.sidebarTopRight}>
            {/* <IconButton>
              <DonutLarge className={classes.icons} />
            </IconButton> */}
            <IconButton onClick={async () => {
              await axios.post('http://localhost:8080/deleteAccount',{
                email
              });
              await unauthorise();
              history.push('/');
            }}>
              <Delete className={classes.icons} />
            </IconButton>
            <IconButton onClick={handleClick1}>
              <Chat className={classes.icons} />
            </IconButton>
            {/* <IconButton>
              <MoreVert className={classes.icons} />
            </IconButton> */}
            <IconButton onClick={async () => {
                await unauthorise();
                history.push('/');
              }}>
              <PowerSettingsNew className={classes.icons} />
            </IconButton>
          </div>
        </div>
        <div className={classes.search}>
          <div className={classes.searchContainer}>
            <SearchOutlined style={{color: '#808080', padding: '10px', fontSize: '40px'}} />
            <input placeholder='Search users by email' id="search myInput" className="inp" style={{border: 'none', outlineWidth: '0',marginLeft: '0.5vw', width: '80%'}} value={text} onChange={onTextChanged} ref={searchRef} />
            <IconButton style={{color: '#808080', padding: '10px', fontSize: '40px'}} onClick={handleClick1}>
              <Add />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl1}
              keepMounted
              open={Boolean(anchorEl1)}
              onClose={handleClose1}
            >
              <MenuItem onClick={() => {
                  handleClose1();
                  setSearching(true);
                }}>
                New Chat
              </MenuItem>
              <MenuItem onClick={() => {
                  handleClose1();
                  handleOpen2();
                }}>New Group</MenuItem>
            </Menu>
            <Modal
              open={open}
              onClose={handleClose2}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </div>
        </div>
        <div className="sug" style={{zIndex: "999"}}>
            {
              renderSuggestions()
            }
        </div>
        <div className='sidebarChats'>
       
          {
            groups.map((grp,index) => 
              <a href={`http://localhost:3000/chat/group/${grp.grpId}`} style={{textDecoration: 'none',color: '#000'}} key={index} >
                <SidebarChats info={grp} />
              </a>  
            )
          }
          {
            rooms.map((room,index) => 
              <a href={`http://localhost:3000/chat/${room.roomId}`} style={{textDecoration: 'none',color: '#000'}} key={index} >
                <SidebarChats p2={room.p2.email === email ? room.p1 : room.p2} />
              </a>  
            )
          }
        </div>
      </Paper>
    </div>
  )
};

export default Sidebar;