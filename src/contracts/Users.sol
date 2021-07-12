// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;


contract Users{

  // total number of users
  uint256 public userCounter;
  
  //define user struct
  struct User{
    uint userId;
    string userName;
    string email;
    string social;
    string repo;
    string bio;
    string avatarhash;
    address userAddress;
  }
  
  // map cryptoboy's token id to crypto boy
  mapping(address => User) public allUsers;
  // check if token name exists
  mapping(string => bool) public userNameExists;
  // check if image exists
  mapping(string => bool) public userEmailExists;
  // check if user Address exists
  mapping(address => bool) public userAddressExists;
  //map address to username
  mapping(address=>string)public addressToName;
  //map address to userId
  mapping(address=>uint)public addressToId;
  
  constructor(){
   // userAddressExists[msg.sender]=true;
  }

 
  //create a user
  function createUser(string memory _userName,string memory _email,string memory _social,string memory _repo,string memory _bio,string memory _avatar)external{
    // check if thic fucntion caller is not an zero address account
    require(msg.sender != address(0));
    
    // increment counter
    userCounter ++;
    // check if user already exists
    require(!userAddressExists[msg.sender]); 
    // check if the userName already exists or not
    require(!userNameExists[_userName]);

    // check if the email already exists or not
    require(!userEmailExists[_email]);
    // make passed userName as exists
    userNameExists[_userName]=true;
    // make passed userAddress as exists
    userAddressExists[msg.sender]=true;
    // make passed email as exists
    userEmailExists[_email]=true;
    // creat a new user (struct) and pass in new values
    User memory newUser=User(
     userCounter,
     _userName,
     _email,
     _social,
     _repo,
     _bio,
     _avatar,
     msg.sender
    );
    // add the address and it's user to all users mapping
    allUsers[msg.sender] = newUser;

  }

  //update User
  function updateUser(string memory _userName,string memory _oldemail,string memory _email,string memory _social,string memory _repo,string memory _bio,string memory _avatar)external{
   // check if thic fucntion caller is not an zero address account
    require(msg.sender != address(0));
    // user already exists
    require(userAddressExists[msg.sender]); 
    // check if the userName already exists or not
    // if(keccak256(abi.encodePacked((addressToName[msg.sender])))==keccak256(abi.encodePacked((_userName)))){
      
    //   emit SameUserName(_userName);
    //   userNameExists[_userName]=true;
    // // make passed email as exists
    // userEmailExists[_email]=true;
    // User memory newUser=User(
    //  addressToId[msg.sender],
    //  _userName,
    //  _email,
    //  _social,
    //  _repo,
    //  _bio,
    //  _avatar,
    //  msg.sender
    // );
    //  // add the address and it's user to all users mapping
    // allUsers[msg.sender] = newUser;
    // }
    // else{
        
    //require(!userNameExists[_userName]);
    // check if the email already exists or not
    //require(!userEmailExists[_email]);
    // // make passed userName as exists
    userEmailExists[_oldemail]=false;
    userNameExists[_userName]=true;
    // make passed email as exists
    userEmailExists[_email]=true;
    // creat a new user (struct) and pass in new values
    User memory newUser=User(
     addressToId[msg.sender],
     _userName,
     _email,
     _social,
     _repo,
     _bio,
     _avatar,
     msg.sender
    );
     // add the address and it's user to all users mapping
    allUsers[msg.sender] = newUser;
    }
   
}


