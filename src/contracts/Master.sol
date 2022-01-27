// File: src\contracts\DigiArtERC1155.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract Master is ERC1155, ERC1155Holder, Ownable {

  IERC20 public token;
  IERC20 public wEth;

  function Existing(address _t,address _w) external onlyOwner {
    token = IERC20(_t);
    wEth = IERC20(_w);
  }
  
  // 1 Ether = 100 tokens (1 Token = 0.01 Ether)
  uint256 private rate = 10**16;
  // Total number of Tokens minted
  uint256 public _tokensMintedCount = 0;

 // check if token name exists
  mapping(string => bool) public tokenNameExists;
  // check if image exists
  mapping(string => bool) public imageExists;
  // check if token URI exists
  mapping(string => bool) public tokenURIExists;

//   // id => tokenUri
//   mapping(uint256 => string) public tokensUri;
  // id => balance (For Sale, on platform)
  mapping(uint256 => uint256) public tokensBalances;

  mapping(address => uint256) public noOfTransfers;
  mapping(address => uint256) public wethSpent;
  mapping(address => uint256) public tokenSpent;
//   //id => price
//   mapping(uint256 => uint256) public tokenPrice;
//   //id => address
//   mapping(uint256 =>address) public tokenIdToAdd;

  // map design's token id to design
mapping(uint256 => Design) public allDesigns;


struct Design {
    uint256 tokenId;
    string name;
    string tokenURI;
    address payable mintedBy;
    address payable currentOwner;
    address payable previousOwner;
    uint256 price;
    uint256 tokenPrice;
    uint256 numberOfTransfers;
    bool forSale;
 }
  constructor () ERC1155("https://ipfs.infura.io/ipfs/{id}.json") {}
 
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC1155, ERC1155Receiver)
    returns (bool) {
    return super.supportsInterface(interfaceId);
  }

//   // Update Token metadata
//   function updateTokenMetaData(uint256 _tokenId, string memory _urihash) external {
//     require(balanceOf(msg.sender, _tokenId) != 0); 
//     //tokensUri[_tokenId] = _urihash;
//     Design memory design = allDesigns[_tokenId];
//     design.tokenURI=_urihash;
//     // set and update that token in the mapping
//     allDesigns[_tokenId] = design;
//   }
//   function _ownerOf(uint256 tokenId) internal view returns (bool) {
//     return balanceOf(msg.sender, tokenId) != 0;
// }


//   // Update token price
//   function updateTokenPrice(uint256 _tokenId, uint256 _price) external {
//     require(balanceOf(msg.sender, _tokenId) != 0); 
//     Design memory design = allDesigns[_tokenId];
   
//     design.price = _price;
//     // set and update that token in the mapping
//     allDesigns[_tokenId] = design;
//     //tokenPrice[_tokenId] = _price;
//   }
   // Update token price and sale status
  function updateTokenData(uint256 _tokenId, uint256 _price,uint256 _tokenPrice, bool _sale) external {
       // require caller of the function is not an empty address
    require(msg.sender != address(0));
    Design memory design = allDesigns[_tokenId];
    // require that token should exist
        require(tokensBalances[_tokenId] > 0);
        // get the token's owner 
        address tokenOwner = design.currentOwner;
        // check that token's owner should be equal to the caller of the function
        require(tokenOwner == msg.sender);
        require(balanceOf(msg.sender, _tokenId) != 0); 
      if(_sale){      
        // if token's forSale is false make it true and vice versa
        if(design.forSale) {
        design.forSale = false;
        } else {
        design.forSale = true;
        }
      }
      else{
        
        design.price = _price;
        design.tokenPrice=_tokenPrice;
        }
    // set and update that token in the mapping
    allDesigns[_tokenId] = design;
   
  }

  // Get metadata of the token
  function getTokenMetaData(uint256 _tokenId) public view returns(string memory) {
    //string memory tokenMetaData = tokensUri[_tokenId];
    Design memory design = allDesigns[_tokenId];
    string memory tokenMetaData =design.tokenURI;
    return tokenMetaData;
  }

  // Mint multiple tokens of the same id
//   function mintTokens(uint256 id,uint256 amount) external {
//     // check if thic fucntion caller is not an zero address account
//     require(msg.sender != address(0));
//     require(amount > 0, "Amount should be greater then 0");
//     _mint(msg.sender, id, amount, "");
//     _tokensMintedCount += amount;  
//     _tokensForSaleCount += amount;  
    
//     if (tokensBalances[id] == 0) {
//       // If new token
//       _tokensUniqueMintedCount ++;
//       _tokensUniqueForSaleCount ++;
//     }
//     tokensBalances[id] += amount;
//   }

  // Can mint multiple tokens (even with the same id).
  function mintMultipleTokens(uint256 _amount,string memory _name,string memory _imageHash,string memory uriHash,uint256 _price,uint256 _tokenPrice) external {
    // check if this function caller is not an zero address account
    require(msg.sender != address(0));
    require(_amount > 0, "Amount should be greater then 0");
    //require(ids.length > 0, "Amount should be greater then 0");
    // check if the token name already exists or not
    require(!tokenNameExists[_name]);
    // check if the image already exists or not
    require(!imageExists[_imageHash]);
    // check if the token URI already exists or not
    require(!tokenURIExists[uriHash]);
    
      uint256[] memory  ids=new uint256[](_amount);
      uint256[] memory amounts=new uint256[](_amount);
      uint256 tempId=_tokensMintedCount+1;
   _tokensMintedCount+=_amount;
    for(uint256 i = 0; i < _amount; i++){
        
        ids[i]=tempId;
        amounts[i]=1;
        tokensBalances[tempId]++;
       
       
    Design memory newdesign = Design(
    tempId,
    _name,
    uriHash,
    payable(msg.sender),
    payable(msg.sender),
    payable(address(0)),
    _price,
    _tokenPrice,
    0,
    true);
    
    // add the token id and it's design to all designs mapping
    allDesigns[tempId] = newdesign; 
       tempId++; 
    } 
    // make passed token URI as exists
    tokenURIExists[uriHash] = true;
    // make token name passed as exists
    tokenNameExists[_name] = true;
    // make passed image as exists
    imageExists[_imageHash]=true;

    _mintBatch(msg.sender, ids, amounts, "");
    
  }

  // Buy Single Token
  function buySingleToken(uint256 _tokenId,string memory tokenName,uint256 _amount) public payable {
    Design memory design = allDesigns[_tokenId];
      
    uint256 fromBalance = balanceOf(design.currentOwner, _tokenId);

    require(fromBalance >= 1, "Insufficient balance for transfer");
    require(tokensBalances[_tokenId] > 0, "Not on sale");
    // require(msg.value == design.price, "Ether sent does not match the price");
    require(design.forSale);
    // Removing from tokenBalances
    // tokensBalances[_tokenId] -= 1;
    // _tokensForSaleCount -= 1;
    // if(tokensBalances[_tokenId] == 0) {
    //   _tokensUniqueForSaleCount -= 1;
    // }

    address payable sendTo = payable(design.currentOwner);
    // uint tokenAmount = (msg.value * 98)/100;
    // send token's worth of ethers to the owner from smart contract
    //sendTo.transfer(tokenAmount);
    if(keccak256(abi.encodePacked((tokenName))) == keccak256(abi.encodePacked(("wEth")))) {
      uint tokenAmount = (_amount * 95)/100;
      // User can't send more tokens than they have
      require(wEth.balanceOf(msg.sender) >=tokenAmount);

      wEth.transferFrom(msg.sender, sendTo, tokenAmount);
      wEth.transferFrom(msg.sender,address(this),_amount-tokenAmount);
      wethSpent[msg.sender]+=_amount;
    }
    else {
      uint tokenAmount = (_amount * 99)/100;
      // User can't send more tokens than they have
      require(token.balanceOf(msg.sender) >= tokenAmount);

      token.transferFrom(msg.sender, sendTo,tokenAmount);
      token.transferFrom(msg.sender,address(this),_amount-tokenAmount);
      tokenSpent[msg.sender]+=_amount;
    } 
    // Transfer
    _safeTransferFrom(design.currentOwner, msg.sender, _tokenId, 1, "");
    noOfTransfers[msg.sender]++;
    noOfTransfers[design.currentOwner]++;
    //tokenIdToAdd[_tokenId]=msg.sender
     // update the token's previous owner
    design.previousOwner = design.currentOwner;
    // update the token's current owner
    design.currentOwner = payable(msg.sender);
    // update the how many times this token was transfered
    design.numberOfTransfers += 1;
    // set and update that token in the mapping
    allDesigns[_tokenId] = design;
     
  }



 // switch between set for sale and set not for sale
//   function toggleForSale(uint256 _tokenId) public {
//     // require caller of the function is not an empty address
//     require(msg.sender != address(0));
//     // require that token should exist
//     require(tokensBalances[_tokenId] > 0);
//     // get the token's owner
//     //address tokenOwner = ownerOf(_tokenId);
//     Design memory design = allDesigns[_tokenId];
//     address tokenOwner = design.currentOwner;
//     // check that token's owner should be equal to the caller of the function
//     require(tokenOwner == msg.sender);
//     // get that token from all designs mapping and create a memory of it defined as (struct => design)
//     // if token's forSale is false make it true and vice versa
//     if(design.forSale) {
//       design.forSale = false;
//     } else {
//       design.forSale = true;
//     }
//     // set and update that token in the mapping
//     allDesigns[_tokenId] = design;
//   }

  // Withdraw ether from contract.
 // function withdraw() external onlyOwner {
  //  require(address(this).balance > 0, "Balance must be positive");
    
  //  (bool success, ) = msg.sender.call{value: address(this).balance}("");
    
  //  require(success == true);
 // }
  // Withdraw ether from contract.
  // function withdrawFromContract() external onlyOwner {
  //   require(address(this).balance > 0, "Balance must be positive");
  //   payable(msg.sender).transfer(address(this).balance);  
  // }
  // To Transfer any ERC20 token to smart contract
  // function transferTokensToContract(uint _amount, string memory tokenName) public payable {
    // if(keccak256(abi.encodePacked((tokenName))) == keccak256(abi.encodePacked(("wEth")))) {
    //   // User can't send more tokens than they have
    //   require(wEth.balanceOf(msg.sender) >= _amount);

    //   wEth.transferFrom(msg.sender, address(this), _amount);
    // }
    // else {
    //   // User can't send more tokens than they have
    //   require(token.balanceOf(msg.sender) >= _amount);

    //   token.transferFrom(msg.sender, address(this), _amount);
    // } 
  // } 

  // To Transfer any ERC20 token from smart contract to owner 
  function withdrawTokens(string memory tokenName) external onlyOwner {
    // User can't sell more tokens than they have
    if(keccak256(abi.encodePacked((tokenName))) == keccak256(abi.encodePacked(("wEth")))) {
      require(wEth.balanceOf(address(this)) > 0);

      // Transfer tokens to the receiver
      wEth.transferFrom(address(this),msg.sender, wEth.balanceOf(address(this)));
    }
    else {
      require(token.balanceOf(address(this)) > 0);

      // Transfer tokens to the receiver
      token.transferFrom(address(this),msg.sender, token.balanceOf(address(this)));
    }  
  }
}
