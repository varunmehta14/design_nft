// File: src\contracts\DigiArtERC1155.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract DigiArt is ERC1155, ERC1155Holder, Ownable {

  IERC20 public token;
  IERC20 public wEth;

  // Update wEth and custom token contract addresses
  function Existing(address _t, address _w) external onlyOwner {
    token = IERC20(_t);
    wEth = IERC20(_w);
  }
  
  // Total number of Tokens minted
  uint256 public _tokensMintedCount = 0;

  // check if token name exists
  mapping(string => bool) public tokenNameExists;
  // check if image exists
  mapping(string => bool) public imageExists;
  // check if token URI exists
  mapping(string => bool) public tokenURIExists;

  // id => balance (For Sale, on platform)
  mapping(uint256 => uint256) public tokensBalances;

  // Tracking transactions
  mapping(address => uint256) public noOfTransfers;
  mapping(address => uint256) public wethSpent;
  mapping(address => uint256) public tokenSpent;
  
  // map design's token id to design
  mapping(uint256 => Design) public allDesigns;

  struct Design {
    uint256 tokenId;
    string name;
    string tokenURI;
    address payable mintedBy;
    address payable currentOwner;
    address payable previousOwner;
    uint256 price; // Price in wEth/our token
    bool isCustomToken; 
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

  // Update token price and sale status
  function updateTokenData(uint256 _tokenId, uint256 _price, bool _sale) external {
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
    
    design.forSale = _sale;
    design.price = _price;
    // set and update that token in the mapping
    allDesigns[_tokenId] = design;
  }

  // Get metadata of the token
  function getTokenMetaData(uint256 _tokenId) public view returns(string memory) {
    //string memory tokenMetaData = tokensUri[_tokenId];
    Design memory design = allDesigns[_tokenId];
    string memory tokenMetaData = design.tokenURI;
    return tokenMetaData;
  }

  // Can mint multiple tokens (even with the same id).
  function mintMultipleTokens(uint256 _amount, string memory _name, string memory _imageHash, string memory uriHash, uint256 _price, bool _iscustomToken) external {
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
    
    uint256[] memory  ids = new uint256[](_amount);
    uint256[] memory amounts = new uint256[](_amount);
    uint256 tempId = _tokensMintedCount+1;
    _tokensMintedCount += _amount;
    for(uint256 i = 0; i < _amount; i++) {    
      ids[i] = tempId;
      amounts[i] = 1;
      tokensBalances[tempId]++;
      
      Design memory newdesign = Design(
        tempId,
        _name,
        uriHash,
        payable(msg.sender),
        payable(msg.sender),
        payable(address(0)),
        _price,
        _iscustomToken,
        0,
        true
      );
      // add the token id and it's design to all designs mapping
      allDesigns[tempId] = newdesign; 
      tempId++; 
    } 
    // make passed token URI as exists
    tokenURIExists[uriHash] = true;
    // make token name passed as exists
    tokenNameExists[_name] = true;
    // make passed image as exists
    imageExists[_imageHash] = true;

    _mintBatch(msg.sender, ids, amounts, "");
  }

  // Buy Single Token
  function buySingleToken(uint256 _tokenId, uint256 _amount) public payable {
    Design memory design = allDesigns[_tokenId];
      
    uint256 fromBalance = balanceOf(design.currentOwner, _tokenId);

    require(fromBalance >= 1, "Insufficient balance for transfer");
    require(tokensBalances[_tokenId] > 0, "Not on sale");
    // require(msg.value == design.price, "Ether sent does not match the price");
    require(design.forSale);
  
    address payable sendTo = payable(design.currentOwner);
    // uint tokenAmount = (msg.value * 98)/100;
    // send token's worth of ethers to the owner from smart contract
    //sendTo.transfer(tokenAmount);
    if(design.isCustomToken) {
      uint tokenAmount = (_amount * 99)/100;
      // User can't send more tokens than they have
      require(token.balanceOf(msg.sender) >= tokenAmount);

      token.transferFrom(msg.sender, sendTo, tokenAmount);
      token.transferFrom(msg.sender, address(this), _amount-tokenAmount);
      tokenSpent[msg.sender] += _amount;
    }
    else {
      uint tokenAmount = (_amount * 95)/100;
      // User can't send more tokens than they have
      require(wEth.balanceOf(msg.sender) >=tokenAmount);

      wEth.transferFrom(msg.sender, sendTo, tokenAmount);
      wEth.transferFrom(msg.sender, address(this), _amount-tokenAmount);
      wethSpent[msg.sender] += _amount;
    } 
    // Transfer
    _safeTransferFrom(design.currentOwner, msg.sender, _tokenId, 1, "");
    noOfTransfers[msg.sender]++;
    noOfTransfers[design.currentOwner]++;
    // update the token's previous owner
    design.previousOwner = design.currentOwner;
    // update the token's current owner
    design.currentOwner = payable(msg.sender);
    // update the how many times this token was transfered
    design.numberOfTransfers += 1;
    // update sale to off
    design.forSale = false;
    // set and update that token in the mapping
    allDesigns[_tokenId] = design;   
  }

  // To Transfer ERC20 token from smart contract to owner 
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
