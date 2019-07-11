var compound_price = document.getElementById("compound_price");
var cdai_eth_price = document.getElementById("cdai_eth_price");
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

var a_cdai_eth_price;
var a_eth_dai_price;
var a_eth_in_cdai_pool;
var cdai_in_cdai_pool;
var a_eth_in_dai_pool;
var dai_in_dai_pool;
var cprice;
var uprice;
var upricem;
var upricep;
var upricem2;
var upricep2;
var rate;
var ufee_primitive = 0.3;
var a_ufee = ufee_primitive;
var a_ufee2 = ufee_primitive * 2;

ufeem.innerHTML = "-" + a_ufee + "%" ;
ufeep.innerHTML = "+" + a_ufee + "%" ;
ufeem2.innerHTML = "-" + a_ufee2 + "%" ;
ufeep2.innerHTML = "+" + a_ufee2 + "%" ;
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
			cprice = rate;
			}
		}
	}

}
$(function get_price(){
	$.ajax({
url:"https://api.stage.compound.finance/api/v2/ctoken",
dataType:"json",
})
.done((data)=>{console.log(data);
		plotres(data, "");
		console.log(cprice);
		compound_price.innerHTML = Number(cprice).toFixed(5);
		})
.fail((data)=>{console.log(data.responceText);})
.always((data)=>{console.log(data);});
});

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
				cdai_in_cdai_pool = data.result * 1e-8;
				resolve(cdai_in_cdai_pool);
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
				dai_in_dai_pool = data.result * 1e-18;
				resolve(dai_in_dai_pool);
				})
			.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
			})
};//);
Promise.all([
get_eth_in_dai_pool(),
get_dai_in_dai_pool(),
get_eth_in_cdai_pool(),
get_cdai_in_cdai_pool(),
])
	.then(function(data){
			console.log(data);

			a_eth_dai_price = data[1] / data[0];
			eth_dai_price.innerHTML = a_eth_dai_price.toFixed(2);

			a_cdai_eth_price = data[2] / data[3];
			cdai_eth_price.innerHTML = a_cdai_eth_price.toExponential(3)

			uprice = data[1] * data[2] / data[0] / data[3]; 
			upricem = data[1] * data[2] / data[0] / data[3] * (1 - a_ufee / 100); 
			upricep = data[1] * data[2] / data[0] / data[3] * (1 + a_ufee / 100); 
			upricem2 = data[1] * data[2] / data[0] / data[3] * (1 - a_ufee2 / 100); 
			upricep2 = data[1] * data[2] / data[0] / data[3] * (1 + a_ufee2 / 100); 
			console.log(uprice);
			uniswap_price.innerHTML = uprice.toFixed(5);
			uniswap_price_m.innerHTML = upricem.toFixed(5);
			uniswap_price_p.innerHTML = upricep.toFixed(5);
			uniswap_price_m2.innerHTML = upricem2.toFixed(5);
			uniswap_price_p2.innerHTML = upricep2.toFixed(5);
			});
