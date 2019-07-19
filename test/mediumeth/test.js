const { AirSwap } = require('../kyoronut.github.io/yarn/node_modules/ethereum-dex-prices-service');
const { main } = require('../kyoronut.github.io/yarn/node_modules/ethereum-dex-prices-service');

function getAirSwapPrice() {
	return new Promise(function(resolve){
		var result = AirSwap.computePrice('DAI', 500, 'BUY', 0);
		//var result = main('DAI', 500, 'BUY', 0);
		resolve(result);
		console.log(result);
	});
}
getAirSwapPrice().then(function(data){

	console.log(data);
});
