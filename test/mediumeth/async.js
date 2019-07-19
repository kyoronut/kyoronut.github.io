const { AirSwap } = require('../kyoronut.github.io/yarn/node_modules/ethereum-dex-prices-service')
const { main } = require('../kyoronut.github.io/yarn/node_modules/ethereum-dex-prices-service')
const dex = new AirSwap();
async function getAirSwapPrice() {
  const result = await dex.computePrice('DAI', 500, 'BUY', 0)
  //const result = main('DAI', 500, 'BUY', 0);
  //console.log(result);
  return result;
}
getAirSwapPrice().then(function(data){
	console.log(data);
});
