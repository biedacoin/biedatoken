pragma solidity ^0.4.17;

contract Biedatoken {
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowances;

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    address public minter;

    modifier onlyMinter {
        require(msg.sender == minter);
        _;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    function Biedatoken() public {
        name = "Biedatoken";
        decimals = 18;
        symbol = "BID";
        totalSupply = 0;
        minter = msg.sender;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        require(balances[_to] + _value >= balances[_to]);

        balances[msg.sender] -= _value;
        balances[_to] += _value;

        Transfer(msg.sender, _to, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(allowances[_from][msg.sender] >= _value);
        require(balances[_from] >= _value);
        require(balances[_to] + _value >= balances[_to]);

        allowances[_from][msg.sender] -= _value;
        balances[_from] -= _value;
        balances[_to] += _value;

        Transfer(_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowances[msg.sender][_spender] = _value;

        Approval(msg.sender, _spender, _value);

        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowances[_owner][_spender];
    }

    function mint(uint256 _value) public onlyMinter returns (bool success) {
        require(balances[minter] + _value >= balances[minter]);
        require(totalSupply + _value >= totalSupply);

        balances[minter] += _value;
        totalSupply += _value;

        Transfer(this, minter, _value);

        return true;
    }

    function newMinter(address _newMinter) public onlyMinter {
        minter = _newMinter;
    }

    function kek() public pure returns(uint32) {
        return 69;
    }
}