// // SPDX-License-Identifier: MIT
// pragma solidity >=0.4.21 <0.8.0;

// //import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
// import "./Token.sol";
// Token public token;
// contract Timelock {
//   uint public constant duration = 365 days;
//   uint public immutable end;
//   address payable public immutable owner;

//   constructor(address payable _owner,Token _token) {
//     end = block.timestamp + duration;
//     owner = _owner;
//     token = _token;     
//   }

//   function deposit(uint _amount) external {
//     require(token.balanceOf(msg.sender) >= _amount);
//     token.transferFrom(msg.sender, address(this), _amount);
//   }

//   receive() external payable {}

//   function withdraw(address buyer,uint _amount) external {
//     //require(msg.sender == owner, 'only owner');
//     require(block.timestamp >= end, 'too early');
//     if(token == address(0)) { 
//       owner.transfer(amount);
//     } else {
//       token.transfer(buyer, _amount);
//     }
//   }
// }