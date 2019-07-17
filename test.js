const { main } = require('./yarn/node_modules/ethereum-dex-prices-service')

function getDexPrices() {
	return new Promise(function(resolve){
		const results = main('DAI', 500, 'BUY')
		resolve(results);
			});
  }

  getDexPrices().then(function (data){
	  //console.log(data);
	  var info = [];
	  data.forEach(obj => {
		  var string = JSON.stringify(obj);
		  if(string.search("Eth2Dai") > 0){
			  info["Eth2Dai"] =obj["Eth2Dai"].totalPrice;
		  }
		  if(string.search("DDEX") > 0){
			  info["DDEX"] =obj["DDEX"].totalPrice;
		  }
		  if(string.search("AirSwap") > 0){
			  info["AirSwap"] =obj["AirSwap"].totalPrice;
		  }
	  });
	  info.sort(function(a, b){
		  if(a < b) return -1;
		  if(a > b) return 1;
		  return 0
	  });
	  for(i in info){
		  console.log(i);
		  console.log(info[i]);

	  }
  });
