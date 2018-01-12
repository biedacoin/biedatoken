const Biedatoken = artifacts.require('Biedatoken');

contract('Biedatoken', accounts => {
  it('should have default minter address', async () => {
    let instance = await Biedatoken.deployed();
    let minter = await instance.minter();
    assert.equal(minter.length, 42);
    assert.equal(minter.slice(0, 2), '0x');
  });

  it('should set new minter address', async () => {
    let instance = await Biedatoken.deployed();
    let minter = await instance.minter();
    await instance.newMinter(accounts[8], {from: minter});
    let newMinter = await instance.minter();
    assert.equal(newMinter, accounts[8]);
  });

  it('should mint 6969 tokens', async () => {
    let instance = await Biedatoken.deployed();
    let minter = await instance.minter();
    await instance.mint(6969, {from: minter});
    let totalSupply = await instance.totalSupply();
    assert.equal(totalSupply.toNumber(), 6969);
  });

  it('should fail to mint tokens when not minter', async () => {
    let instance = await Biedatoken.deployed();
    let minter = await instance.minter();
    let notMinter = accounts[4];
    try {
        await instance.mint(6969, {from: notMinter});
    } catch (e) {
        return;
    }
    assert.fail();
  });

  it('should transfer 69 tokens', async () => {
    let instance = await Biedatoken.deployed();
    let minter = await instance.minter();
    let notMinter = accounts[4];
    let minterBalanceBefore = await instance.balanceOf(minter);
    await instance.transfer(notMinter, 69, {from: minter});
    let minterBalanceAfter = await instance.balanceOf(minter);
    assert.ok(minterBalanceBefore.toNumber() > minterBalanceAfter.toNumber());
    let notMinterBalance = await instance.balanceOf(notMinter);
    assert.equal(notMinterBalance.toNumber(), 69);
  });

  it('should approve spending 696 tokens', async () => {
    let instance = await Biedatoken.deployed();
    let minter = await instance.minter();
    let notMinter = accounts[4];
    await instance.approve(notMinter, 696, {from: minter});
    let allowance = await instance.allowance(minter, notMinter);
    assert.equal(allowance, 696);
  });

  it('should spend 690 tokens', async () => {
    let instance = await Biedatoken.deployed();
    let minter = await instance.minter();
    let notMinter = accounts[4];
    await instance.approve(notMinter, 696);
    await instance.transferFrom(minter, notMinter, 690, {from: notMinter});
    let allowance = await instance.allowance(minter, notMinter);
    assert.equal(allowance, 6);
  });

  it('should fail to transfer tokens from empty account', async () => {
    let instance = await Biedatoken.deployed();
    try {
        await instance.transfer(account[2], 6969, {from: account[3]});
    } catch (e) {
        return;
    }
    assert.fail();
  });

  it('should fail to transfer tokens when not allowed', async () => {
    let instance = await Biedatoken.deployed();
    let minter = await instance.minter();
    let notMinter = accounts[2];
    try {
        await instance.transferFrom(minter, accounts[2], 690, {from: notMinter});
    } catch (e) {
        return;
    }
    assert.fail();
  });
});
