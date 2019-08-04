const n = 7;
const dai_am = [10, 30, 100, 300, 1000, 3000, 10000];
var buy_dai_rate =[];
var sell_dai_rate =[];
var eth_am = [];
var token_am = [];
var amount = document.getElementById("amount");
var buy = document.getElementById("buy");
var sell = document.getElementById("sell");
var form = document.forms.mainForm;
var token;
var token_contract;
var token_buy_in_eth;
var token_sell_in_eth;
var token_in_eth;
const kyber_tokens = [];
const dai_contract = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";
const usdc_contract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
var dai_in_eth;
var dai_buy_in_eth;
var dai_sell_in_eth;
var market;

async function get_rate_kyber(buyOrSell, address, qty){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.kyber.network/" + String(buyOrSell) + "_rate?id="+ String(address) +"&qty=" + qty,
			dataType:"json",
		})

		.done((data)=>{console.log(data.data[0]);
			var rate;
			if(buyOrSell=="buy"){
				rate = data.data[0].src_qty[0] / data.data[0].dst_qty[0];
			}else{
				rate = data.data[0].dst_qty[0] / data.data[0].src_qty[0];
			}
			resolve(rate);
			console.log(rate);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};

async function get_market(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.kyber.network/market",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			resolve(data);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};
async function first_step(){
	console.log("test");
	form.token.disabled = true;
	market = await get_market();
	market.data.forEach(idata=>{
		if(idata.base_symbol == "DAI"){
		console.log(idata.current_bid)
			dai_buy_in_eth = idata.current_ask;
			dai_sell_in_eth = idata.current_bid;
		}
	});
	dai_in_eth = (dai_buy_in_eth + dai_sell_in_eth) * 0.5;
	var plist=[];
	for(var i=0; i < n; i++){
		eth_am[i] = dai_am[i] * dai_in_eth;
		plist[i] = get_rate_kyber("buy", dai_contract, dai_am[i]); 
		plist[i + n] = get_rate_kyber("sell", dai_contract, dai_am[i]);
	
	}
	const data = await Promise.all(plist);
	for(var i=0; i < n; i++){
		buy_dai_rate[i] = data[i];
		sell_dai_rate[i] = data[i + n];
	}
};

$(first_step().then(()=>{
	form.token.disabled=false}
	));


async function search_price(){
	buy.innerHTML = "";
	sell.innerHTML = "";
	amount.innerHTML = "";
	document.getElementById("medium0").innerHTML = "";
	token = await form.token.value;
	var token_for_search;
	if(token == "ETH"){token_for_search = "WETH";}
	else{token_for_search = token;}

	//Search token address and current price
	await market.data.forEach(idata=>{
		console.log(token_for_search)
		if(idata.base_symbol == token_for_search){
			token_contract = idata.base_address;
			token_buy_in_eth = idata.current_ask;
			token_sell_in_eth = idata.current_bid;
		}
	});
	token_in_eth = (token_buy_in_eth + token_sell_in_eth) * 0.5;
	console.log(token_in_eth);
	var token_am = [];
	for(var i = 0; i < n; i++){
	token_am[i] = eth_am[i] / token_in_eth;
	}
	
	var list = new Array(2*n);
	var data = new Array(2*n);
	var prelist = new Array(2*4);

	for(var i=0; i<4; i++){
		console.log(token_am[i]);
		prelist[i] = get_rate_kyber("buy", token_contract, token_am[i]);
		prelist[i + 4] = get_rate_kyber("sell", token_contract, token_am[i]);
	}
	const predata = await Promise.all(prelist);
	for(var i=0; i<4; i++){
		data[i] = predata[i];
		data[i + n] = predata[i + 4];
	}
	var buy_price0 = Number(data[0]) / sell_dai_rate[0];
	var sell_price0 = Number(data[0 + n]) / buy_dai_rate[0];
	console.log(sell_dai_rate[0], buy_dai_rate[0]);
	var medium0 = (buy_price0 + sell_price0) / 2;
	document.getElementById("medium0").innerHTML = "<h3>" + String(medium0.toExponential(3)) + "</h3>"
		+"<h5>(10 DAI center price)</h5> "; 

	for(var i = 0; i < n; i++){
		if(i >= 4){
			var tmpdata = await Promise.all([
					get_rate_kyber("buy", token_contract, token_am[i]),
					get_rate_kyber("sell", token_contract, token_am[i])
			]);
			data[i] = tmpdata[0];
			data[i + n] = tmpdata[1];
		}
		//var buy_price = Number(data[i][0]);
		//var sell_price = Number(data[i + n][0]);
		var buy_price = Number(data[i]) / sell_dai_rate[i];
		var sell_price = Number(data[i + n]) / buy_dai_rate[i];
			console.log(sell_price);
			console.log(sell_dai_rate[i]);
			console.log(data[i+n]);
		var spread = buy_price - sell_price;
		var medium = (buy_price + sell_price) / 2;
		var spread_p = spread / medium * 100;
		var pslip = (buy_price - medium0) / medium0 * 100;
		var mslip = (sell_price - medium0) / medium0 * 100;
		var digit;
		//buy.innerHTML += "<h4>" + String(Number(data[i][0]).toExponential(3)) + "</h4>"
		buy.innerHTML += "<h4>" + String(buy_price.toExponential(3)) + "</h4>"
			//+ "<h5>" + String(data[i][1]) + "</h5>";
			+ "<h5>+" +String(pslip.toFixed(2))+"%</h5>";
		//sell.innerHTML += "<h4>" + String(Number(data[i + n][0]).toExponential(3)) + "</h4>"
		sell.innerHTML += "<h4>" + String(sell_price.toExponential(3)) + "</h4>"
			//+ "<h5>" + String(data[i + n][1]) + "</h5>";
			+ "<h5>" +String(mslip.toFixed(2))+"%</h5>";

		amount.innerHTML += "<h4>" + String(dai_am[i]) + "</h4>"
			+ "<h5>" + String(Number(spread_p).toFixed(2))+"%</h5>";
	}
}

async function get_tokens(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.kyber.network/currencies",
			dataType:"json",
		})

		.done((data)=>{
			console.log(data);
			//data.data.forEach(idata=>{
			//kyber_tokens.push(idata.symbol);
			//});
			//console.log(kyber_tokens)

			//resolve(kyber_tokens);
			resolve(data);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};

$(get_tokens().then(data => {
	data.data.forEach(idata =>{
		if(idata.symbol != "WETH"
				&& idata.symbol != "DAI" ){
			document.getElementById("kyber_tokens").innerHTML+= '<option value="'+ idata.symbol
				+ '" label="'+ idata.name + '('+ idata.symbol +')"></option>';
		}
	})
}));

$("#box").keypress(e=>{
	if(e.which == 13){
		$("#search").click();
	}
})
$("#box").focusin(e =>{
	var tmp = form.token.value;
	console.log(tmp);
	form.token.value = "";
});
