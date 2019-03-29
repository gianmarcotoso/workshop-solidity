const CollectableDonation = artifacts.require('CollectableDonation')

module.exports = function(deployer) {
	deployer.deploy(CollectableDonation)
}
