module.exports = function(oauth2) {

	var provider = 'ContractManipulationAPI';
	var client = require('../../client/Client.js')(oauth2);

	function amend(contractId, version) {
		return load('ContractAmender', contractId, {}, version);
	}

	function renew(masterContractId, renewedContracts, version) {
		var context = { masterContractId: masterContractId, renewedContracts: renewedContracts };
		return load('ContractRenewer', null, context, version);
	}

	function load(loader, uid, context, version) {
		return client.load( { loader: provider + '.' + loader,  uid: uid, context: context, version: version } );
	}

	return {
		amend: amend,
		renew: renew
	};
};