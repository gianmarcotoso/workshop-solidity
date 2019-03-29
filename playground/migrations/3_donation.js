const SupplierTrust = artifacts.require('SupplierTrust')

module.exports = function(deployer) {
	deployer.deploy(SupplierTrust)
}
