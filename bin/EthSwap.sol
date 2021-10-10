// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;

import "./Token.sol";

contract EthSwap {
  string public name = "EthSwap Instant Exchange";
  Token public token;
  // uint public rate = 100;

  // event TokensPurchased(
  //   address account,
  //   address token,
  //   uint amount,
  //   uint rate
  // );

  // event TokensSold(
  //   address account,
  //   address token,
  //   uint amount,
  //   uint rate
  // );

  constructor(Token _token) public {
    token = _token;
  }

  // function buyTokens() public payable {
  //   // Calculate the number of tokens to buy
  //   uint tokenAmount = msg.value * rate;

  //   // Require that EthSwap has enough tokens
  //   require(token.balanceOf(address(this)) >= tokenAmount);

  //   // Transfer tokens to the user
  //   token.transfer(msg.sender, tokenAmount);

  //   // Emit an event
  //   emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
  // }

  // function sellTokens(uint _amount) public {
  //   // User can't sell more tokens than they have
  //   require(token.balanceOf(msg.sender) >= _amount);

  //   // Calculate the amount of Ether to redeem
  //   uint etherAmount = _amount / rate;

  //   // Require that EthSwap has enough Ether
  //   require(address(this).balance >= etherAmount);

  //   // Perform sale
  //   token.transferFrom(msg.sender, address(this), _amount);
  //   msg.sender.transfer(etherAmount);

  //   // Emit an event
  //   emit TokensSold(msg.sender, address(token), _amount, rate);
  // }

  // To Transfer VID tokens to smart contract
  function transferTokensToContract(uint _amount, address _sender) public {
    // User can't sell more tokens than they have
    require(token.balanceOf(_sender) >= _amount);

    // Perform sale
    token.transferFrom(_sender, address(this), _amount);  
  } 

  // To Transfer VID tokens from smart contract to desired address
  function transferTokensToAccount(uint _amount, address receiver) public payable {
    // User can't sell more tokens than they have
    require(token.balanceOf(address(this)) >= _amount);

    // Transfer tokens to the receiver
    token.transfer(receiver, _amount);  
  } 

}