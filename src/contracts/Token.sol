// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.8.10;

contract Token {
    string  public name = "VAR Token";
    string  public symbol = "VAR";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOfERC20;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOfERC20[msg.sender] = totalSupply;
    }

    function transferERC20(address _to, uint256 _value) public returns (bool success) {
        require(balanceOfERC20[msg.sender] >= _value,"transfer erc 20");
        balanceOfERC20[msg.sender] -= _value;
        balanceOfERC20[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferERC20From(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOfERC20[_from],"transfer erc 20 from 1");
        require(_value <= allowance[_from][msg.sender],"transfer erc 20 from 2");
        balanceOfERC20[_from] -= _value;
        balanceOfERC20[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}