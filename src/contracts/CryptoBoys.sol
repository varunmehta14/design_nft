// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

// import ERC721 iterface
import "./ERC721.sol";

// CryptoBoys smart contract inherits ERC721 interface
contract CryptoBoys is ERC721 {

  // this contract's token collection name
  string public collectionName;
  // this contract's token symbol
  string public collectionNameSymbol;
  // total number of crypto boys minted
  uint256 public cryptoBoyCounter;
  // total number of users
  uint256 public userCounter;

  // define crypto boy struct
   struct CryptoBoy {
    uint256 tokenId;
    string tokenName;
    string tokenURI;
    address payable mintedBy;
    address payable currentOwner;
    address payable previousOwner;
    uint256 price;
    string imageHash;
    
    uint256 numberOfTransfers;
    bool forSale;
  }

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
  mapping(uint256 => CryptoBoy) public allCryptoBoys;
  // check if token name exists
  mapping(string => bool) public tokenNameExists;
  // check if image exists
  mapping(string => bool) public imageExists;
  // check if token URI exists
  mapping(string => bool) public tokenURIExists;
  // map cryptoboy's token id to crypto boy
  mapping(address => User) public allUsers;
  // check if token name exists
  mapping(string => bool) public userNameExists;
  // check if image exists
  mapping(string => bool) public userEmailExists;
  // check if user Address exists
  mapping(address => bool) public userAddressExists;

  // initialize contract while deployment with contract's collection name and token
  constructor() ERC721("Crypto Boys Collection", "CB") {
    collectionName = name();
    collectionNameSymbol = symbol();
  }


  //create a user
  function createUser(string memory _userName,string memory _avatar,string memory _email,string memory _social,string memory _repo,string memory _bio)external{
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
  function updateUser(string memory _userName,string memory _avatar,string memory _email,string memory _social,string memory _repo,string memory _bio)external{
   // check if thic fucntion caller is not an zero address account
    require(msg.sender != address(0));
    // user already exists
    require(userAddressExists[msg.sender]); 
    // check if the userName already exists or not
    require(!userNameExists[_userName]);
    // check if the email already exists or not
    //require(!userEmailExists[_email]);
    // // make passed userName as exists
    userNameExists[_userName]=true;
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

  // mint a new crypto boy
  function mintCryptoBoy(string memory _name, string memory _tokenURI, uint256 _price,string memory _imageHash) external {
    // check if thic fucntion caller is not an zero address account
    require(msg.sender != address(0));
    // increment counter
    cryptoBoyCounter ++;
    // check if a token exists with the above token id => incremented counter
    require(!_exists(cryptoBoyCounter));

    // loop through the colors passed and check if each colors already exists or not
    // for(uint i=0; i<_colors.length; i++) {
    //   require(!colorExists[_colors[i]]);
    // }
    // check if the image already exists or not
    require(!imageExists[_imageHash]);
    // check if the token URI already exists or not
    require(!tokenURIExists[_tokenURI]);
    // check if the token name already exists or not
    require(!tokenNameExists[_name]);

    // mint the token
    _mint(msg.sender, cryptoBoyCounter);
    // set token URI (bind token id with the passed in token URI)
    _setTokenURI(cryptoBoyCounter, _tokenURI);

    // loop through the colors passed and make each of the colors as exists since the token is already minted
    // for (uint i=0; i<_colors.length; i++) {
    //   colorExists[_colors[i]] = true;
    // }
    // make passed token URI as exists
    tokenURIExists[_tokenURI] = true;
    // make token name passed as exists
    tokenNameExists[_name] = true;
    // make passed image as exists
    imageExists[_imageHash]=true;

    // creat a new crypto boy (struct) and pass in new values
    CryptoBoy memory newCryptoBoy = CryptoBoy(
    cryptoBoyCounter,
    _name,
    _tokenURI,
    msg.sender,
    msg.sender,
    address(0),
    _price,
    _imageHash,
    0,
    true);
    // add the token id and it's crypto boy to all crypto boys mapping
    allCryptoBoys[cryptoBoyCounter] = newCryptoBoy;
  }

  // get owner of the token
  function getTokenOwner(uint256 _tokenId) public view returns(address) {
    address _tokenOwner = ownerOf(_tokenId);
    return _tokenOwner;
  }

  // get metadata of the token
  function getTokenMetaData(uint _tokenId) public view returns(string memory) {
    string memory tokenMetaData = tokenURI(_tokenId);
    return tokenMetaData;
  }

  // get total number of tokens minted so far
  function getNumberOfTokensMinted() public view returns(uint256) {
    uint256 totalNumberOfTokensMinted = totalSupply();
    return totalNumberOfTokensMinted;
  }

  // get total number of tokens owned by an address
  function getTotalNumberOfTokensOwnedByAnAddress(address _owner) public view returns(uint256) {
    uint256 totalNumberOfTokensOwned = balanceOf(_owner);
    return totalNumberOfTokensOwned;
  }

  // check if the token already exists
  function getTokenExists(uint256 _tokenId) public view returns(bool) {
    bool tokenExists = _exists(_tokenId);
    return tokenExists;
  }

  // by a token by passing in the token's id
  function buyToken(uint256 _tokenId) public payable {
    // check if the function caller is not an zero account address
    require(msg.sender != address(0));
    // check if the token id of the token being bought exists or not
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // token's owner should not be an zero address account
    require(tokenOwner != address(0));
    // the one who wants to buy the token should not be the token's owner
    require(tokenOwner != msg.sender);
    // get that token from all crypto boys mapping and create a memory of it defined as (struct => CryptoBoy)
    CryptoBoy memory cryptoboy = allCryptoBoys[_tokenId];
    // price sent in to buy should be equal to or more than the token's price
    require(msg.value >= cryptoboy.price);
    // token should be for sale
    require(cryptoboy.forSale);
    // transfer the token from owner to the caller of the function (buyer)
    _transfer(tokenOwner, msg.sender, _tokenId);
    // get owner of the token
    address payable sendTo = cryptoboy.currentOwner;
    // send token's worth of ethers to the owner from smart contract
    sendTo.transfer(msg.value);
    // update the token's previous owner
    cryptoboy.previousOwner = cryptoboy.currentOwner;
    // update the token's current owner
    cryptoboy.currentOwner = msg.sender;
    // update the how many times this token was transfered
    cryptoboy.numberOfTransfers += 1;
    // set and update that token in the mapping
    allCryptoBoys[_tokenId] = cryptoboy;
  }

  function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
    // require caller of the function is not an empty address
    require(msg.sender != address(0));
    // require that token should exist
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // check that token's owner should be equal to the caller of the function
    require(tokenOwner == msg.sender);
    // get that token from all crypto boys mapping and create a memory of it defined as (struct => CryptoBoy)
    CryptoBoy memory cryptoboy = allCryptoBoys[_tokenId];
    // update token's price with new price
   cryptoboy.price = _newPrice;
    // set and update that token in the mapping
    allCryptoBoys[_tokenId] = cryptoboy;
  }

  // switch between set for sale and set not for sale
  function toggleForSale(uint256 _tokenId) public {
    // require caller of the function is not an empty address
    require(msg.sender != address(0));
    // require that token should exist
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // check that token's owner should be equal to the caller of the function
    require(tokenOwner == msg.sender);
    // get that token from all crypto boys mapping and create a memory of it defined as (struct => CryptoBoy)
    CryptoBoy memory cryptoboy = allCryptoBoys[_tokenId];
    // if token's forSale is false make it true and vice versa
    if(cryptoboy.forSale) {
      cryptoboy.forSale = false;
    } else {
      cryptoboy.forSale = true;
    }
    // set and update that token in the mapping
    allCryptoBoys[_tokenId] = cryptoboy;
  }
}