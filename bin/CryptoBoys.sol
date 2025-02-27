// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;
import "./EthSwap.sol";

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
  
  //EthSwap public ethSwap;

  address public deployer;
  // define crypto boy struct
   struct CryptoBoy {
    uint256 tokenId;
    string tokenName;
    string tokenURI;
    address payable mintedBy;
    address payable currentOwner;
    address payable previousOwner;
    uint256 price;
    uint256 dressPrice;
    string imageHash;
    
    uint256 numberOfTransfers;
    bool forSale;
  }
//  struct Collection{
//    uint256 collectionId;
//    CryptoBoy design;
//  }
  

  // map cryptoboy's token id to crypto boy
  mapping(uint256 => CryptoBoy) public allCryptoBoys;
  // check if token name exists
  mapping(string => bool) public tokenNameExists;
  // check if image exists
  mapping(string => bool) public imageExists;
  // check if token URI exists
  mapping(string => bool) public tokenURIExists;
  //check if tokenId exists
  mapping(uint256=>bool)public tokenIdExists;
  //map tokenName to token
  mapping(string=>CryptoBoy)public nameToCryptoBoy;
  //map name to Id
   mapping(string=>uint256)public nameToId;

// constructor(EthSwap _token) public {
//     ethSwap = _token;
//     deployer = msg.sender;
//   }
  // initialize contract while deployment with contract's collection name and token
  constructor()public ERC721("Crypto Boys Collection", "CB") {
    
    //ethSwap = _token;
    deployer = msg.sender;
    collectionName = name();
    collectionNameSymbol = symbol();
    
  }
  // function getEthSwapAddress(address ethswapadd){
  //   EthSwap ethSwap=EthSwap(ethswapadd);
  // }

  

  // mint a new crypto boy
  function mintCryptoBoy(string memory _name, string memory _tokenURI, uint256 _price,uint256 _dressPrice,string memory _imageHash) external {
    // check if thic fucntion caller is not an zero address account
    require(msg.sender != address(0));
    // increment counter
    cryptoBoyCounter ++;
    // check if a token exists with the above token id => incremented counter
    require(!_exists(cryptoBoyCounter));

    // check if the token name already exists or not
    require(!tokenNameExists[_name]);
    // check if the image already exists or not
    require(!imageExists[_imageHash]);
    // check if the token URI already exists or not
    require(!tokenURIExists[_tokenURI]);
    

    // mint the token
    _mint(msg.sender, cryptoBoyCounter);
    // set token URI (bind token id with the passed in token URI)
    _setTokenURI(cryptoBoyCounter, _tokenURI);

    
    // make passed token URI as exists
    tokenURIExists[_tokenURI] = true;
    // make token name passed as exists
    tokenNameExists[_name] = true;
    // make passed image as exists
    imageExists[_imageHash]=true;
    //make tokenId passed as exists
    tokenIdExists[cryptoBoyCounter]=true;

    // creat a new crypto boy (struct) and pass in new values
    CryptoBoy memory newCryptoBoy = CryptoBoy(
    cryptoBoyCounter,
    _name,
    _tokenURI,
    msg.sender,
    msg.sender,
    address(0),
    _price,
    _dressPrice,
    _imageHash,
    0,
    true);
    // add the token id and it's crypto boy to all crypto boys mapping
    allCryptoBoys[cryptoBoyCounter] = newCryptoBoy;

    nameToCryptoBoy[_name]=newCryptoBoy;
    nameToId[_name]=cryptoBoyCounter;
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
  function buyToken(uint256 _tokenId,uint256 _price,address _ethswapadd) public payable {
    EthSwap ethSwap=EthSwap(_ethswapadd);
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
   // require(msg.value >= cryptoboy.price);
    // token should be for sale
    require(cryptoboy.forSale);
    // transfer the token from owner to the caller of the function (buyer)
    _transfer(tokenOwner, msg.sender, _tokenId);
    // get owner of the token
    address payable sendTo = cryptoboy.currentOwner;
    // send token's worth of ethers to the owner from smart contract
    //sendTo.transfer(msg.value);
    ethSwap.transferTokensToContract(_price,msg.sender);
    ethSwap.transferTokensToAccount(_price,sendTo);
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

  function changeTokenDressPrice(uint256 _tokenId, uint256 _newPrice) public {
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
   cryptoboy.dressPrice = _newPrice;
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

  // To Transfer VID tokens to smart contract
  function transferTokensToContract(uint _amount, address _sender) public {
    // User can't sell more tokens than they have
    require(balanceOf[_sender] >= _amount);

    // Perform sale
    transferFrom(_sender, address(this), _amount);  
  } 

  // To Transfer VID tokens from smart contract to desired address
  function transferTokensToAccount(uint _amount, address receiver) public payable {
    // User can't sell more tokens than they have
    require(balanceOf[address(this)] >= _amount);

    // Transfer tokens to the receiver
    transfer(receiver, _amount);  
  }
}
// contract EthSwap{
//   function transferTokensToContract(uint , address )public;
//   function transferTokensToAccount(uint , address )public;
// }