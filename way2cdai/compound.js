const slip = 0.001;
var compound_price = document.getElementById("compound_price");
var compound_price_m = document.getElementById("compound_price_m");
var compound_price_p = document.getElementById("compound_price_p");
var cdai_eth_price = document.getElementById("cdai_eth_price");
var eth_cdai_price = document.getElementById("eth_cdai_price");
var eth_dai_price = document.getElementById("eth_dai_price");
var uniswap_price = document.getElementById("uniswap_price");
var uniswap_price_m = document.getElementById("uniswap_price_m");
var uniswap_price_p = document.getElementById("uniswap_price_p");
var uniswap_price_m2 = document.getElementById("uniswap_price_m2");
var uniswap_price_p2 = document.getElementById("uniswap_price_p2");
var eth_in_dai_pool = document.getElementById("eth_in_dai_pool");
var eth_in_cdai_pool = document.getElementById("eth_in_cdai_pool");
var ufeem = document.getElementById("ufeem");
var ufeep = document.getElementById("ufeep");
var ufeem2 = document.getElementById("ufeem2");
var ufeep2 = document.getElementById("ufeep2");
var trading_amount = document.getElementById("trading_amount");
var buy_dai_dex = document.getElementById("buy_dai_dex");
var sell_dai_dex = document.getElementById("sell_dai_dex");
var spread_center = document.getElementById("spread_center");
var spread_cross0 = document.getElementById("spread_cross0");
var spread_cross1 = document.getElementById("spread_cross1");

var a_spread_center;
var a_spread_cross0 = new Array(2);
var a_spread_cross1 = new Array(2);
var a_cdai_eth_price;
var a_eth_cdai_price;
var a_eth_dai_price;
var a_eth_in_cdai_pool;
var a_cdai_in_cdai_pool;
var a_eth_in_dai_pool;
var a_dai_in_dai_pool;
var cprice;
var cpricem;
var cpricep;
var uprice;
var upricem;
var upricep;
var upricem2;
var upricep2;
var rate;
var ufee_primitive = 0.3;
var a_ufee = ufee_primitive;
var a_ufee2 = ufee_primitive * 2;
var amount = 1000;
var amount_eth;
var pfix = 5;


function plotres(response, prefix) {
	for (var key in response){
		if (typeof response[key] == "object") {
			if(Array.isArray(response[key])) {
				response[key].forEach(function(item){
					plotres(item, prefix+" "+key) ;
				});
			} else {
				plotres(response[key], prefix+" "+key) ;
			}  
		} else {
			if(prefix == " cToken exchange_rate"){
				rate = response[key];
			}
			if(response[key] == "cDAI"){
				console.log(rate);
				cprice = Number(rate);
			}
		}
	}

}
function get_price(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.compound.finance/api/v2/ctoken",
			dataType:"json",
		})
		.done((data)=>{console.log(data);
			plotres(data, "");
			console.log(cprice);
			var a_cprice = Number(cprice);
			compound_price.innerHTML = Number(cprice).toFixed(pfix);
			resolve(a_cprice);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	});
};

//cdai/eth

function get_eth_in_cdai_pool(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=balance&address=0x45A2FDfED7F7a2c791fb1bdF6075b83faD821ddE&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			a_eth_in_cdai_pool = data.result * 1e-18;
			eth_in_cdai_pool.innerHTML = a_eth_in_cdai_pool.toFixed(1);
			resolve(a_eth_in_cdai_pool);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};

function get_cdai_in_cdai_pool(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xF5DCe57282A584D2746FaF1593d3121Fcac444dC&address=0x45A2FDfED7F7a2c791fb1bdF6075b83faD821ddE&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})
		.done((data)=>{console.log(data);
			a_cdai_in_cdai_pool = data.result * 1e-8;
			resolve(a_cdai_in_cdai_pool);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};//);

//eth/dai
function get_eth_in_dai_pool(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=balance&address=0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			a_eth_in_dai_pool = data.result * 1e-18;
			eth_in_dai_pool.innerHTML = a_eth_in_dai_pool.toFixed(1);
			resolve(a_eth_in_dai_pool);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};

function get_dai_in_dai_pool(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359&address=0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})
		.done((data)=>{console.log(data);
			a_dai_in_dai_pool = data.result * 1e-18;
			resolve(a_dai_in_dai_pool);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};//);


function get_buy_dai_info(val){
	console.log(val);
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.dex.ag/trade?from=ETH&to=DAI&toAmount="+ String(val.toFixed(3)) +"&dex=best",
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
function get_sell_dai_info(val){
	console.log(val);
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.dex.ag/trade?from=DAI&to=ETH&fromAmount="+ String(val.toFixed(3)) +"&dex=best",
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
			get_eth_in_dai_pool(),//0
			get_dai_in_dai_pool(),//1
			get_eth_in_cdai_pool(),//2
			get_cdai_in_cdai_pool(),//3
			get_price(),//4
	])
	.then(function(data){
		console.log(data);

		a_eth_dai_price = data[1] / data[0];
		eth_dai_price.innerHTML = a_eth_dai_price.toFixed(2);

		a_cdai_eth_price = data[2] / data[3];
		a_eth_cdai_price = data[3] / data[2];
		cdai_eth_price.innerHTML = a_cdai_eth_price.toExponential(3)
			eth_cdai_price.innerHTML = Number(a_eth_cdai_price).toExponential(3)

			uprice = 1 * (data[1] * data[2] / data[0] / data[3]); 
		uniswap_price.innerHTML = uprice.toFixed(pfix);
		
		a_spread_center = 2 * (uprice - cprice) / (uprice + cprice) * 100;
		spread_center.innerHTML = "Spread (Uni - Comp): " + a_spread_center.toFixed(2) + "%";

		if(cprice >= uprice){
			c_factor = 1 - a_ufee / 100 ;
		}else{
			c_factor = 1 + a_ufee / 100 ;
		}
		target_price = cprice * c_factor;
		if(Math.abs(a_spread_center) < (a_ufee + slip * 100)){
			amount = slip * a_eth_in_cdai_pool * a_eth_dai_price;
		}
		else{
			amount = Math.abs(1 - Math.sqrt(target_price/uprice)) * a_eth_in_cdai_pool * a_eth_dai_price;
		}

		amount_eth = amount / a_eth_dai_price;
		trading_amount.innerHTML = String(amount.toFixed(0))
			+ " DAI (~" + String(amount_eth.toFixed(2)) + " ETH)";

		Promise.all([get_buy_dai_info(amount), get_sell_dai_info(amount)])
			.then(async function(data2){
				var buy_dai_price = data2[0][0];
				var a_buy_dai_dex = data2[0][1];
				var sell_dai_price = data2[1][0];
				var a_sell_dai_dex = data2[1][1];
			        var d_eth_dai_price = await 1. / ((data2[0][0] + data2[1][0]) * 0.5);
			console.log(d_eth_dai_price);
				cpricep = buy_dai_price * d_eth_dai_price * cprice;//(dai/eth)(eth/dai)(dai/cdai)
				cpricem = sell_dai_price * d_eth_dai_price * cprice;
				compound_price_m.innerHTML = Number(cpricem).toFixed(pfix);
				compound_price_p.innerHTML = Number(cpricep).toFixed(pfix);
				buy_dai_dex.innerHTML = String(a_buy_dai_dex);
				sell_dai_dex.innerHTML = String(a_sell_dai_dex);

				//uniswap price calculation from https://docs.uniswap.io/frontend-integration/swap
				//ETH to cDAI trade projection to DAI/cDAI price
				numeratorp = amount_eth * a_cdai_in_cdai_pool * (1 - a_ufee /100);
				denominatorp = a_eth_in_cdai_pool + amount_eth * (1 - a_ufee / 100);
				output = numeratorp / denominatorp;
				upricep = amount_eth / output / a_cdai_eth_price * uprice;
				spread = 2 * (upricep - uprice) / (upricep + uprice);
				upricem = (1 - spread) * uprice;
				
				description1 = "ETH trade";
				ufeem.innerHTML = description1;
				ufeep.innerHTML = description1;
				
				//DAI to cDAI trade
				//TokenA to ETH (DAI to ETH)
					inputAmountA = amount;
					 inputReserveA = a_dai_in_dai_pool;
					 outputReserveA = a_eth_in_dai_pool; 

					 numeratorA = inputAmountA * outputReserveA * (1 - a_ufee /100);
					 denominatorA = inputReserveA + inputAmountA * (1 - a_ufee / 100);
					 outputAmountA = numeratorA / denominatorA;

					// ETH to TokenB conversion (ETH to cDAI)
					 inputAmountB = outputAmountA;
					 inputReserveB = a_eth_in_cdai_pool;
					 outputReserveB = a_cdai_in_cdai_pool;

					 numeratorB = inputAmountB * outputReserveB * (1 - a_ufee / 100);
					 denominatorB = inputReserveB  + inputAmountB * (1 - a_ufee / 100);
					 outputAmountB = numeratorB / denominatorB;

					 upricep2 = 1 / (outputAmountB / inputAmountA);
					 spread2 = 2 * (upricep2 - uprice) / (upricep2 + uprice);
					 upricem2 = (1 - spread2) * uprice;




				ufeem2.innerHTML = "DAI trade" ;
				ufeep2.innerHTML = "DAI trade" ;

				uniswap_price_m.innerHTML = "("+String(upricem.toFixed(pfix))+")";
				uniswap_price_p.innerHTML = "("+String(upricep.toFixed(pfix))+")";
				uniswap_price_m2.innerHTML = String(upricem2.toFixed(pfix));
				uniswap_price_p2.innerHTML = String(upricep2.toFixed(pfix));

				a_spread_cross0 = [
					2 * (upricep - cpricem) / (upricep + cpricem) * 100,
					2 * (upricep2 - cpricem) / (upricep2 + cpricem) * 100
				];
				a_spread_cross1 = [
					2 * (cpricep - upricem) / (cpricep + upricem) * 100,
					2 * (cpricep - upricem2) / (cpricep + upricem2) * 100
				];
				spread_cross0.innerHTML = "UniBuy - Burn&Sell: " 
					+ a_spread_cross0[1].toFixed(2) + "%"
					+ " (" + a_spread_cross0[0].toFixed(2) + "%)"
					;
				spread_cross1.innerHTML = "Buy&Mint - UniSell: "
					+ a_spread_cross1[1].toFixed(2) + "%"
					+ " (" + a_spread_cross1[0].toFixed(2) + "%)"


			});





	});
