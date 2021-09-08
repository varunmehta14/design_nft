import React from 'react';
import { Avatar } from '@material-ui/core';
import '../App.css';
import { useSidebarChatsStyles } from './ChatStyles';

function SidebarChats(props) {
  let myPic, myName, myDes;
  if(props.p2) {
    const { name, email, dp } = props.p2;
    myPic = dp;
    myName = name;
    myDes = email;
  }
  else {
    const { name, members, pic } = props.info;
    myPic = `http://localhost:9000/${pic}`;
    myName = name;
    let str1 = `${members[0].name}`;
    for(let i=1;i<members.length;i++) {
      let temp = str1.concat(`, ${members[i].name}`);
      str1 = temp;
    }
    myDes = str1;
  }

  const classes = useSidebarChatsStyles();

  return (
    <div className='main'>
      <Avatar style={{margin: 'auto 0'}} src={myPic} alt="avatar" />
      <div className={classes.chatInfo}>
        <p><span style={{fontWeight: 'bold'}}>Name{myName}</span><br />
        <span style={{whiteSpace: 'nowrap',overflow: 'hidden'}}>Text{myDes}</span></p>
      </div>
    </div>
  )
};

export default SidebarChats;