const Biedatoken = artifacts.require('Biedatoken');
const Krzysiek = artifacts.require('Krzysiek');

contract('Krzysiek', accounts => {
  it('Krzysiek?', async () => {
    let krzysiek = await Krzysiek.deployed();
    let biedatoken = await Biedatoken.deployed();
    let biedakrzysiek = Biedatoken.at(krzysiek.address)
    let kek = await biedakrzysiek.kek.call();
    assert.equal(kek.toNumber(), 69);
  });
});