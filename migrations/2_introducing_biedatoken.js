var Biedatoken = artifacts.require("./Biedatoken.sol");

module.exports = function(deployer) {
  deployer.deploy(Biedatoken);
};