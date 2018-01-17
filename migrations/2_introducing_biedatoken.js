var Biedatoken = artifacts.require("./Biedatoken.sol");
var Krzysiek = artifacts.require("./Krzysiek.sol");

module.exports = function(deployer) {
  deployer.deploy(Biedatoken)
  .then(function() {
    return deployer.deploy(Krzysiek);
  })
  .then(function() {
    return Krzysiek.deployed();
  })
  .then(function(krzysiek) {
    return krzysiek.setDestination(Biedatoken.address);
  });
};