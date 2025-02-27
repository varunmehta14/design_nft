// File: src\contracts\DigiArtERC1155.sol
// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;
import './Token.sol';
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/introspection/ERC165.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// CryptoBoyERC1155s smart contract inherits ERC721 interface
contract DigiArtERC1155 is ERC1155 {

  // this contract's token collection name
  //string public collectionName;
  // this contract's token symbol
  //string public collectionNameSymbol;
  // total number of crypto boys minted
  uint256 public CryptoBoyERC1155Counter;
  
  //EthSwap public ethSwap;

  address public deployer;
  // define crypto boy struct
   struct CryptoBoyERC1155 {
    uint256 tokenId;
    string tokenName;
    string tokenURI;
    address payable mintedBy;
    //address payable currentOwner;
    //address payable previousOwner;
    uint256 price;
    //uint256 dressPrice;
    string imageHash;
    //uint256 numberOfTransfers;
    //bool forSale;
  }
//  struct Collection{
//    uint256 collectionId;
//    CryptoBoyERC1155 design;
//  }
 

  // map CryptoBoyERC1155's token id to crypto boy
  mapping(uint256 => CryptoBoyERC1155) public allCryptoBoysERC1155;
  // check if token name exists
  mapping(string => bool) public tokenNameExists;
  // check if image exists
  mapping(string => bool) public imageExists;
  // check if token URI exists
  mapping(string => bool) public tokenURIExists;
  //check if tokenId exists
  mapping(uint256=>bool)public tokenIdExists;
  //map tokenName to token
  mapping(string=>CryptoBoyERC1155)public nameToCryptoBoyERC1155;
  //map name to Id
   mapping(string=>uint256)public nameToId;

// constructor(EthSwap _token) public {
//     ethSwap = _token;
//     deployer = msg.sender;
//   }
  // initialize contract while deployment with contract's collection name and token
  constructor() public ERC1155("https://game.example/api/item/{id}.json") {
       deployer=msg.sender;
    }
  // function getEthSwapAddress(address ethswapadd){
  //   EthSwap ethSwap=EthSwap(ethswapadd);
  // }

  

  // mint a new crypto boy
  function mintCryptoBoyERC1155(string memory _name, string memory _tokenURI, uint256 _price,uint256 _dressPrice,string memory _imageHash,uint256 _amount) external {
    // check if thic fucntion caller is not an zero address account
    require(msg.sender != address(0));
    // increment counter
    CryptoBoyERC1155Counter +=_amount;
    // check if a token exists with the above token id => incremented counter
    require(!_exists(CryptoBoyERC1155Counter));

    // check if the token name already exists or not
    require(!tokenNameExists[_name]);
    // check if the image already exists or not
    require(!imageExists[_imageHash]);
    // check if the token URI already exists or not
    require(!tokenURIExists[_tokenURI]);
    

    // mint the token
    _mint(msg.sender, CryptoBoyERC1155Counter,_amount,"");
    // set token URI (bind token id with the passed in token URI)
    _setURI(_tokenURI);

    
    // make passed token URI as exists
    tokenURIExists[_tokenURI] = true;
    // make token name passed as exists
    tokenNameExists[_name] = true;
    // make passed image as exists
    imageExists[_imageHash]=true;
    //make tokenId passed as exists
    tokenIdExists[CryptoBoyERC1155Counter]=true;

    // creat a new crypto boy (struct) and pass in new values
    CryptoBoyERC1155 memory newCryptoBoyERC1155 = CryptoBoyERC1155(
    CryptoBoyERC1155Counter,
    _name,
    _tokenURI,
    msg.sender,
    //msg.sender,
    //address(0),
    _price,
    //_dressPrice,
    _imageHash
   // 0,
    //true
    );
    // add the token id and it's crypto boy to all crypto boys mapping
    allCryptoBoyERC1155s[CryptoBoyERC1155Counter] = newCryptoBoyERC1155;

    nameToCryptoBoyERC1155[_name]=newCryptoBoyERC1155;
    nameToId[_name]=CryptoBoyERC1155Counter;
  }

  // get owner of the token
//   function getTokenOwner(uint256 _tokenId) public view returns(address) {
//     address _tokenOwner = ownerOf(_tokenId);
//     return _tokenOwner;
//   }

  // get metadata of the token
  function getTokenMetaData(uint _tokenId) public view returns(string memory) {
    string memory tokenMetaData = uri(_tokenId);
    return tokenMetaData;
  }

//   // get total number of tokens minted so far
//   function getNumberOfTokensMinted() public view returns(uint256) {
//     uint256 totalNumberOfTokensMinted = totalSupply();
//     return totalNumberOfTokensMinted;
//   }

  // get total number of tokens owned by an address of an Id
  function getTotalNumberOfTokensOwnedByAnAddressOfId(address _owner,uint256 _id) public view returns(uint256) {
    uint256 totalNumberOfTokensOwnedOfId = balanceOf(_owner,_id);
    return totalNumberOfTokensOwnedOfId;
  }

  // check if the token already exists
//   function getTokenExists(uint256 _tokenId) public view returns(bool) {
//     bool tokenExists = _exists(_tokenId);
//     return tokenExists;
//   }

  // by a token by passing in the token's id
  function buyToken(uint256 _tokenId,uint256 _price,address _tokenadd) public payable {
    
    // check if the function caller is not an zero account address
    require(msg.sender != address(0));
    // check if the token id of the token being bought exists or not
    //require(_exists(_tokenId));
    // get the token's owner
    CryptoBoyERC1155 memory cryptoBoyERC1155 = allCryptoBoyERC1155s[_tokenId];
    address tokenOwner=cryptoBoyERC1155.mintedBy;
   // address tokenOwner = ownerOf(_tokenId);
    // token's owner should not be an zero address account
    require(tokenOwner != address(0));
    // the one who wants to buy the token should not be the token's owner
    require(tokenOwner != msg.sender);
    // get that token from all crypto boys mapping and create a memory of it defined as (struct => CryptoBoyERC1155)
    
    // price sent in to buy should be equal to or more than the token's price
   // require(msg.value >= CryptoBoyERC1155.price);
    // token should be for sale
    //require(cryptoBoyERC1155.forSale);
    // transfer the token from owner to the caller of the function (buyer)
    safeTransferFrom(tokenOwner, msg.sender, _tokenId,_amount,"");
    // get owner of the token
    //address payable sendTo = CryptoBoyERC1155.currentOwner;
    // send token's worth of ethers to the owner from smart contract
    //sendTo.transfer(msg.value);
    transferTokensToContract(_price*_amount,msg.sender, _tokenadd);
    transferTokensToAccount(_price*_amount,tokenOwner,_tokenadd);
    // update the token's previous owner
    //CryptoBoyERC1155.previousOwner = CryptoBoyERC1155.currentOwner;
    // update the token's current owner
    //CryptoBoyERC1155.currentOwner = msg.sender;
    // update the how many times this token was transfered
    //CryptoBoyERC1155.numberOfTransfers += 1;
    // set and update that token in the mapping
    //allCryptoBoyERC1155s[_tokenId] = CryptoBoyERC1155;
  }

//   function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
//     // require caller of the function is not an empty address
//     require(msg.sender != address(0));
//     // require that token should exist
//     //require(_exists(_tokenId));
//     // get the token's owner
//     CryptoBoyERC1155 memory cryptoBoyERC1155 = allCryptoBoyERC1155s[_tokenId];
//     address tokenOwner=cryptoBoyERC1155.mintedBy;
//     //address tokenOwner = ownerOf(_tokenId);
//     // check that token's owner should be equal to the caller of the function
//     require(tokenOwner == msg.sender);
//     // get that token from all crypto boys mapping and create a memory of it defined as (struct => CryptoBoyERC1155)
//     //CryptoBoyERC1155 memory CryptoBoyERC1155 = allCryptoBoyERC1155s[_tokenId];
//     // update token's price with new price
//    cryptoBoyERC1155.price = _newPrice;
//     // set and update that token in the mapping
//     allCryptoBoyERC1155s[_tokenId] = cryptoBoyERC1155;
//   }

//   function changeTokenDressPrice(uint256 _tokenId, uint256 _newPrice) public {
//     // require caller of the function is not an empty address
//     require(msg.sender != address(0));
//     // require that token should exist
//     require(_exists(_tokenId));
//     // get the token's owner
//     address tokenOwner = ownerOf(_tokenId);
//     // check that token's owner should be equal to the caller of the function
//     require(tokenOwner == msg.sender);
//     // get that token from all crypto boys mapping and create a memory of it defined as (struct => CryptoBoyERC1155)
//     CryptoBoyERC1155 memory CryptoBoyERC1155 = allCryptoBoyERC1155s[_tokenId];
//     // update token's price with new price
//    CryptoBoyERC1155.dressPrice = _newPrice;
//     // set and update that token in the mapping
//     allCryptoBoyERC1155s[_tokenId] = CryptoBoyERC1155;
//   }

  // switch between set for sale and set not for sale
//   function toggleForSale(uint256 _tokenId) public {
//     // require caller of the function is not an empty address
//     require(msg.sender != address(0));
//     // require that token should exist
//     require(_exists(_tokenId));
//     // get the token's owner
//     address tokenOwner = ownerOf(_tokenId);
//     // check that token's owner should be equal to the caller of the function
//     require(tokenOwner == msg.sender);
//     // get that token from all crypto boys mapping and create a memory of it defined as (struct => CryptoBoyERC1155)
//     CryptoBoyERC1155 memory CryptoBoyERC1155 = allCryptoBoyERC1155s[_tokenId];
//     // if token's forSale is false make it true and vice versa
//     if(CryptoBoyERC1155.forSale) {
//       CryptoBoyERC1155.forSale = false;
//     } else {
//       CryptoBoyERC1155.forSale = true;
//     }
//     // set and update that token in the mapping
//     allCryptoBoyERC1155s[_tokenId] = CryptoBoyERC1155;
//   }

  // To Transfer VID tokens to smart contract
  function transferTokensToContract(uint _amount, address _sender,address _tokenadd) public {
    // User can't sell more tokens than they have
    Token ethswap=Token(_tokenadd);
    require(ethswap.balanceOf(_sender) >= _amount);

    // Perform sale
    ethswap.transferERC20From(_sender, address(this), _amount);  
  } 

  // To Transfer VID tokens from smart contract to desired address
  function transferTokensToAccount(uint _amount, address receiver,address _tokenadd) public payable {
    // User can't sell more tokens than they have
    Token ethswap=Token(_tokenadd);
    require(ethswap.balanceOf(address(this)) >= _amount);

    // Transfer tokens to the receiver
    ethswap.transferERC20(receiver, _amount);  
  }
}
// contract EthSwap{
//   function transferTokensToContract(uint , address )public;
//   function transferTokensToAccount(uint , address )public;
// }