const n = 7;
const dai_am = [10, 30, 100, 300, 1000, 3000, 10000];
var buy_dai_rate =[];
var sell_dai_rate =[];
var eth_am = [];
var token_am = [];
var amount = document.getElementById("amount");
var buy = document.getElementById("buy");
var sell = document.getElementById("sell");
var token = "cDAI";
var token_contract;
var token_buy_in_eth;
var token_sell_in_eth;
var token_in_eth;
const dai_contract = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";
//const usdc_contract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
var dai_in_eth;
var dai_buy_in_eth;
var dai_sell_in_eth;
var cprice;

async function get_price(from_token, to_token, amount_type, amount){
	return new Promise(function(resolve){
		var str ="https://api.dex.ag/trade?from=" + from_token + "&to=" + to_token + "&" + amount_type +"Amount="+ amount +"&dex=best"; 
		//console.log(str);
		$.ajax({
			url:"https://api.dex.ag/trade?from=" + from_token + "&to=" + to_token + "&" + amount_type +"Amount="+ amount +"&dex=best",
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
function get_cprice(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.compound.finance/api/v2/ctoken",
			dataType:"json",
		})
		.done((data)=>{console.log(data);
			plotres(data, "");
			var a_cprice = Number(cprice);
			resolve(a_cprice);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	});
};


async function search_price(){
	buy.innerHTML = "";
	sell.innerHTML = "";
	amount.innerHTML = "";
	document.getElementById("medium0").innerHTML = "";

	
	var list0 = new Array(2*n + 1);
	list0[2*n] = get_cprice();

	for(var i=0; i<n; i++){
		list0[i] = get_price("ETH", "DAI", "to", dai_am[i]);
		list0[i + n] = get_price("DAI", "ETH", "from", dai_am[i]);
	}
	const data0 = await Promise.all(list0);
	var buy_price0 = Number(data0[0][0]) * cprice;
	var sell_price0 = Number(data0[0 + n][0]) * cprice;
	var medium0 = (buy_price0 + sell_price0) / 2;
	console.log(buy_price0);
	document.getElementById("medium0").innerHTML = "<h3>" + String(medium0.toExponential(3)) + "</h3>"
		+"<h5>(10 DAI center price in ETH * compound rate)</h5>"; 
	
	var cdai_am = [];
	for(var i=0; i < n; i++){
		cdai_am[i] = dai_am[i] / cprice;
	}
	
	var data = new Array(2*n);
	//read small amount simultaneously
	for(var i = 0; i < 4; i++){
		var tmpdata = await Promise.all([
				get_price("ETH", token, "to", cdai_am[i].toFixed(8)),
				get_price(token, "ETH", "from", cdai_am[i].toFixed(8))
		]);
		data[i] = tmpdata[0];
		data[i + n] = tmpdata[1];
	}

	

	for(var i = 0; i < n; i++){
		if(i >= 4){
			var tmpdata = await Promise.all([
					get_price("ETH", token, "to", cdai_am[i].toFixed(8)),
					get_price(token, "ETH", "from", cdai_am[i].toFixed(8))
			]);
			data[i] = tmpdata[0];
			data[i + n] = tmpdata[1];
		}
		//var buy_price = Number(data0[i][0]) * cprice;
		//var sell_price = Number(data0[i + n][0]) * cprice;
		//price comparison
		var buy_price;
		var sell_price;
		var mint_flag = 0;
		var redeem_flag = 0;
		var buy_dex;
		var sell_dex;

		//buy price
		var direct_buy_price = Number(data[i][0]);
		var buy_mint_price = Number(data0[i][0]) * cprice;
		if(direct_buy_price < buy_mint_price){
			buy_price = direct_buy_price;
			buy_dex = data[i][1];
		}else{
			buy_price = buy_mint_price;
			mint_flag = 1;
			buy_dex = data0[i][1];
		}

		//sell price
		var direct_sell_price = Number(data[i + n][0]);
		var redeem_sell_price = Number(data0[i + n][0]) * cprice;
		if(direct_sell_price > redeem_sell_price){
			sell_price = direct_sell_price;
			sell_dex = data[i + n][1];
		}else{
			sell_price = redeem_sell_price;
			redeem_flag = 1;
			sell_dex = data0[i + n][1];
		}

		var spread = buy_price - sell_price;
		var medium = (buy_price + sell_price) / 2;
		var spread_p = spread / medium * 100;
		var pslip = (buy_price - medium0) / medium0 * 100;
		var mslip = (sell_price - medium0) / medium0 * 100;
		var digit;
		//buy.innerHTML += "<h4>" + String(Number(data0[i][0]).toExponential(3)) + "</h4>"
		buy.innerHTML += "<h4>" + String(buy_price.toExponential(3)) + "</h4>"
			//+ "<h5>" + String(data0[i][1]) + "</h5>";
			+ "<h5>+" +String(pslip.toFixed(2))+"%</h5>";
		//sell.innerHTML += "<h4>" + String(Number(data0[i + n][0]).toExponential(3)) + "</h4>"
		if(mint_flag > 0){
		buy.innerHTML += "<h5>buy&amp;mint</h5>";
		buy.innerHTML += "<h5>"+ buy_dex +"</h5>";
		}else{
		buy.innerHTML += "<h5>direct buy</h5>";
		buy.innerHTML += "<h5>"+ buy_dex +"</h5>";
		}
		sell.innerHTML += "<h4>" + String(sell_price.toExponential(3)) + "</h4>"
			//+ "<h5>" + String(data0[i + n][1]) + "</h5>";
			+ "<h5>" +String(mslip.toFixed(2))+"%</h5>";
		if(redeem_flag > 0){
		sell.innerHTML += "<h5>redeem&amp;sell</h5>";
		sell.innerHTML += "<h5>"+ sell_dex +"</h5>";
		}else{
		sell.innerHTML += "<h5>direct sell</h5>";
		sell.innerHTML += "<h5>"+ sell_dex +"</h5>";
		}

		amount.innerHTML += "<h4>" + String(dai_am[i]) + "</h4>"
			+ "<h5>" + String(Number(spread_p).toFixed(2))+"%</h5>"
			+ "<h5>"+String(cdai_am[i].toExponential(3))+"</h5>"
			+ "<h5><br></h5>";
	}
}

search_price();

