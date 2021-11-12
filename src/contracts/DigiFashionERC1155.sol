// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <=0.8.10;

//import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
//import "@openzeppelin/contracts/token/ERC1155/IERC1155MetadataURI.sol";
//import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
//import "@openzeppelin/contracts/introspection/ERC165.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract DigiArtERC1155 is ERC1155, ERC1155Holder, Ownable {

  // 1 Ether = 100 tokens (1 Token = 0.01 Ether)
  uint256 private rate = 10**16;
  // Total number of Tokens minted
  uint256 public _tokensMintedCount = 0;
  // Total number of unique Tokens minted
  uint256 public _tokensUniqueMintedCount = 0;
  // Total number of Tokens for Sale (on platform)
  uint256 public _tokensForSaleCount = 0;
  // Total number of unique Tokens for Sale (on platform)
  uint256 public _tokensUniqueForSaleCount = 0;

  // id => tokenUri
  mapping(uint256 => string) public tokensUri;
  // id => balance (For Sale, on platform)
  mapping(uint256 => uint256) public tokensBalances;
  //id => price
  mapping(uint256 => uint256) public tokenPrice;
  //id => address
  mapping(uint256 =>address) public tokenIdToAdd;




  constructor()public ERC1155("https://ipfs.infura.io/ipfs/{id}.json") {}
 
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC1155, ERC1155Receiver)
    returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  // Update Token metadata
  function updateTokenMetaData(uint _tokenId, string memory _urihash) external {
    tokensUri[_tokenId] = _urihash;
  }

  // Get metadata of the token
  function getTokenMetaData(uint _tokenId) public view returns(string memory) {
    string memory tokenMetaData = tokensUri[_tokenId];
    return tokenMetaData;
  }

  // Mint multiple tokens of the same id
  function mintTokens(uint256 id,uint256 amount) external {
    // check if thic fucntion caller is not an zero address account
    require(msg.sender != address(0));
    require(amount > 0, "Amount should be greater then 0");
    _mint(msg.sender, id, amount, "");
    _tokensMintedCount += amount;  
    _tokensForSaleCount += amount;  
    
    if (tokensBalances[id] == 0) {
      // If new token
      _tokensUniqueMintedCount ++;
      _tokensUniqueForSaleCount ++;
    }
    tokensBalances[id] += amount;
  }

  // Can mint multiple tokens (even with the same id).
  function mintMultipleTokens(uint256 _amount,string memory uriHash,uint256 _price) external {
    // check if this function caller is not an zero address account
    require(msg.sender != address(0));
    require(_amount > 0, "Amount should be greater then 0");
    //require(ids.length > 0, "Amount should be greater then 0");
    
      uint256[] memory  ids=new uint256[](_amount);
      uint256[] memory amounts=new uint256[](_amount);
   
    for(uint256 i = 0; i < _amount; i++){
        _tokensMintedCount++;
        _tokensForSaleCount++;
        ids[i]=_tokensMintedCount;
        tokenPrice[_tokensMintedCount]=_price;
        tokensUri[_tokensMintedCount]=uriHash;
        tokenIdToAdd[_tokensMintedCount]=msg.sender;
        if (tokensBalances[_tokensMintedCount] == 0) {
        // If new token
        _tokensUniqueMintedCount ++;
        _tokensUniqueForSaleCount ++;
        }
        //ids.push((_tokensMintedCount+i));
        amounts[i]=1;
        tokensBalances[_tokensMintedCount]++;
       // amounts.push(1);
       
        
    } 

    _mintBatch(msg.sender, ids, amounts, "");
    //_mintBatch(msg.sender, [1,2,3,4,5], [1,1,1,1,1], "");
    
    // for(uint256 j = 0; j < _amount; j++) {
    //   //require(amounts[i] > 0, "Amount should be greater then 0");

    //   //_tokensMintedCount += amounts[j];  
    //   _tokensForSaleCount += amounts[j];  
    //   tokenPrice[ids[j]]=_price;
    //   tokensUri[ids[j]]=uriHash;
    //   if (tokensBalances[ids[j]] == 0) {
    //     // If new token
    //     _tokensUniqueMintedCount ++;
    //     _tokensUniqueForSaleCount ++;
    //   }
    //   tokensBalances[ids[j]] += amounts[j];
    // }
  }

  // Buy Single Token
  function buySingleToken(uint256 _tokenId) public payable {
    uint256 fromBalance = balanceOf(tokenIdToAdd[_tokenId], _tokenId);

    require(fromBalance >= 1, "Insufficient balance for transfer");
    require(tokensBalances[_tokenId] > 0, "Not on sale");
    
    require(msg.value == tokenPrice[_tokenId], "Ether sent does not match the price");

    // Removing from tokenBalances
    tokensBalances[_tokenId] -= 1;
    _tokensForSaleCount -= 1;
    if(tokensBalances[_tokenId] == 0) {
      _tokensUniqueForSaleCount -= 1;
    }

    // Transfer
    _safeTransferFrom(tokenIdToAdd[_tokenId], msg.sender, _tokenId, 1, "");
    address payable sendTo = payable(tokenIdToAdd[_tokenId]);
    // send token's worth of ethers to the owner from smart contract
    sendTo.transfer(msg.value);
  }



 

  // Withdraw ether from contract.
//   function withdraw() external {
//     require(address(this).balance > 0, "Balance must be positive");
    
//     (bool success, ) = msg.sender.call{value: address(this).balance}("");
    
//     require(success == true);
//   }

}
