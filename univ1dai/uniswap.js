var univ1dai_tot_supply = document.getElementById("univ1dai_tot_supply");
var univ1_in_univ1= document.getElementById("univ1_in_univ1");
var eth_in_univ1 = document.getElementById("eth_in_univ1");
var eth_in_univ1univ1 = document.getElementById("eth_in_univ1univ1");
var internal_price = document.getElementById("internal_price");
var internal_price_m = document.getElementById("internal_price_m");
var internal_price_p = document.getElementById("internal_price_p");
var market_price = document.getElementById("market_price");
var ufeem = document.getElementById("ufeem");
var ufeep = document.getElementById("ufeep");
var market_price_m = document.getElementById("market_price_m");
var market_price_p = document.getElementById("market_price_p");
//var market_price_m2 = document.getElementById("market_price_m2");
//var market_price_p2 = document.getElementById("market_price_p2");
var buy_dai_dex = document.getElementById("buy_dai_dex");
var sell_dai_dex = document.getElementById("sell_dai_dex");
var trading_amount = document.getElementById("trading_amount");

var supply;
var uniuni;
var eth_in;
var eth_uniuni;
var iprice;
var ipricem;
var ipricep;
var mprice;
var mpricem;
var mpricep;
var mpricem2;
var mpricep2;
var a_ufee_primitive = 0.3;
var a_ufee = a_ufee_primitive;
var a_ufee2 = a_ufee_primitive * 1.5;
var dexag_rate_buy_dai;
var dexag_rate_buy_dai_inv;
var dexag_dex_buy_dai;
var amount = 1000;

ufeem.innerHTML = "-" + a_ufee.toFixed(2) + "%" ;
ufeep.innerHTML = "+" + a_ufee.toFixed(2) + "%" ;
/*
   ufeem2.innerHTML = "-" + a_ufee2.toFixed(2) + "%" ;
   ufeep2.innerHTML = "+" + a_ufee2.toFixed(2) + "%" ;
   */
trading_amount.innerHTML = amount;


function get_supply(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x09cabec1ead1c0ba254b09efb3ee13841712be14&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})
		.done((data)=>{console.log(data);
			supply = data.result * 1e-18;
			univ1dai_tot_supply.innerHTML = supply.toFixed(3);
			resolve(supply);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};//);

function get_eth_in_univ1(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=balance&address=0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			eth_in = data.result * 1e-18;
			eth_in_univ1.innerHTML = eth_in.toFixed(3)
				resolve(eth_in);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};


function get_uniuni(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x09cabec1ead1c0ba254b09efb3ee13841712be14&address=0x601c32E0580D3aef9437dB52D09f5a5D7E60eC22&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})
		.done((data)=>{console.log(data);
			uniuni = data.result * 1e-18;
			univ1_in_univ1.innerHTML = uniuni.toFixed(3)
				resolve(uniuni);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};//);

function get_eth_uniuni(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=balance&address=0x601c32E0580D3aef9437dB52D09f5a5D7E60eC22&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			eth_uniuni = data.result * 1e-18;
			eth_in_univ1univ1.innerHTML = eth_uniuni.toFixed(3)
				resolve(eth_uniuni);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};
function get_dai_in_univ1(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359&address=0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})
		.done((data)=>{console.log(data);
			var dai_in_univ1 = data.result * 1e-18;
			console.log(dai_in_univ1);
			resolve(dai_in_univ1);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};//);

function get_buy_dai_info(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.dex.ag/trade?from=ETH&to=DAI&toAmount="+ amount +"&dex=best",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			console.log(data.metadata.source.price)
				console.log(data.metadata.source.dex)

				resolve([
						data.metadata.source.price,
						data.metadata.source.dex
				]);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};
function get_sell_dai_info(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.dex.ag/trade?from=DAI&to=ETH&fromAmount="+ amount +"&dex=best",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			console.log(data.metadata.source.price)
				console.log(data.metadata.source.dex)

				resolve([
						data.metadata.source.price,
						data.metadata.source.dex
				]);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};
	Promise.all([
			get_uniuni(), //0
			get_eth_uniuni(),//1
			get_supply(), //2
			get_eth_in_univ1(),//3
			get_dai_in_univ1(),//4
			get_buy_dai_info(),//5
			get_sell_dai_info()//6
	])
	.then(function(data){
		console.log(data);
		iprice = data[3] * 2 / data[2];
		internal_price.innerHTML = iprice.toFixed(3) ;

		mprice = data[1] / data[0];
		market_price.innerHTML = mprice.toFixed(3);

		mpricem = data[1] / data[0] * (1 - a_ufee / 100);
		market_price_m.innerHTML = mpricem.toFixed(3);

		mpricep = data[1] / data[0] * (1 + a_ufee / 100);
		market_price_p.innerHTML = mpricep.toFixed(3);

		mpricem2 = data[1] / data[0] * (1 - a_ufee2 / 100);
		//market_price_m2.innerHTML = mpricem2.toFixed(3);

		mpricep2 = data[1] / data[0] * (1 + a_ufee2 / 100);
		//market_price_p2.innerHTML = mpricep2.toFixed(3);

		//dexag etc
		var dai_in_univ1 = data[4];
		var buy_dai_price = data[5][0];
		var a_buy_dai_dex = data[5][1];
		var sell_dai_price = data[6][0];
		var a_sell_dai_dex = data[6][1];
		var eth_price = dai_in_univ1 / eth_in;
		var buy_dai_spread = buy_dai_price * eth_price;
		var sell_dai_spread = sell_dai_price * eth_price;
		var ipricep = (0.5 + 0.5 * buy_dai_spread) * iprice;
		var ipricem = (0.5 + 0.5 * sell_dai_spread) * iprice;
		internal_price_m.innerHTML = ipricem.toFixed(3) ;
		internal_price_p.innerHTML = ipricep.toFixed(3) ;
		buy_dai_dex.innerHTML = String(a_buy_dai_dex);
		sell_dai_dex.innerHTML = String(a_sell_dai_dex);
		console.log("uniswap dai price in eth " + String(1/eth_price));
		console.log("buy dai price in eth     " + String(1/buy_dai_price));
		console.log("sell dai price in eth    " + String(1/sell_dai_price));
		console.log("uniswap eth price in dai " + String(eth_price));
		console.log("sell eth price in dai     " + String(buy_dai_price));
		console.log("buy eth price in dai    " + String(sell_dai_price));


	});
