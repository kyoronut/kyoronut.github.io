var univ1dai_tot_supply = document.getElementById("univ1dai_tot_supply");
var univ1_in_univ1= document.getElementById("univ1_in_univ1");
var eth_in_univ1 = document.getElementById("eth_in_univ1");
var eth_in_univ1univ1 = document.getElementById("eth_in_univ1univ1");
var internal_price = document.getElementById("internal_price");
var market_price = document.getElementById("market_price");

var supply;
var uniuni;
var eth_in;
var eth_uniuni;
var iprice;
var mprice;
function get_supply(){
	return new Promise(function(resolve){
			$.ajax({
url:"https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x09cabec1ead1c0ba254b09efb3ee13841712be14&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
dataType:"json",
})
			.done((data)=>{console.log(data);
				supply = data.result * 1e-18;
				univ1dai_tot_supply.innerHTML = supply.toFixed(3)
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
$(function(){
		get_supply();
		get_eth_in_univ1();
		});

Promise.all([get_supply(), get_eth_in_univ1()])
	.then(function(data){
			console.log(data);
			iprice = data[1] * 2 / data[0];
			internal_price.innerHTML = iprice.toFixed(3) + " ETH";
			});

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
Promise.all([get_uniuni(), get_eth_uniuni()])
	.then(function(data){
			console.log(data);
			mprice = data[1] / data[0];
			market_price.innerHTML = mprice.toFixed(3) + " ETH";
			});
