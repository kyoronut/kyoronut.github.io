const n = 7;
const am = [10, 30, 100, 300, 1000, 3000, 10000];
var amount = document.getElementById("amount");
var buy = document.getElementById("buy");
var sell = document.getElementById("sell");
var form = document.forms.mainForm;
var token;
const kyber_tokens = [];

async function get_buy_dai_info(val){
	console.log(val);
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.dex.ag/price?from=" + token + "&to=DAI&toAmount="+ String(val.toFixed(3)) +"&dex=kyber",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			console.log(data.price)
				console.log(data.dex)

				resolve([
						data.price,
						data.dex
				]);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};
async function get_sell_dai_info(val){
	console.log(val);
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.dex.ag/price?from=DAI&to=" + token + "&fromAmount="+ String(val.toFixed(3)) +"&dex=kyber",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			console.log(data.price)
				console.log(data.dex)

				resolve([
						data.price,
						data.dex
				]);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};
async function search_price(){
	buy.innerHTML = "";
	sell.innerHTML = "";
	amount.innerHTML = "";
	document.getElementById("medium0").innerHTML = "";
	token = form.token.value;
	var list = new Array(2*n);
	var data = new Array(2*n);
	var prelist = new Array(2*4);
	for(var i=0; i<4; i++){
		prelist[i] = get_buy_dai_info(am[i]);
		prelist[i + 4] = get_sell_dai_info(am[i]);
	}
	const predata = await Promise.all(prelist);
	for(var i=0; i<4; i++){
		data[i] = predata[i];
		data[i + n] = predata[i + 4];
	}
	var sell_price0 = 1/ Number(data[0][0]);
	var buy_price0 = 1/ Number(data[0 + n][0]);
	var medium0 = (buy_price0 + sell_price0) / 2;
	document.getElementById("medium0").innerHTML = "<h3>" + String(medium0.toExponential(3)) + "</h3>"
		+"<h5>(10 DAI center price)</h5> "; 

	for(var i = 0; i < n; i++){
		if(i >= 4){
			var tmpdata = await Promise.all([get_buy_dai_info(am[i]), get_sell_dai_info(am[i])])
			data[i] = tmpdata[0];
			data[i + n] = tmpdata[1];
		}
		//var buy_price = Number(data[i][0]);
		//var sell_price = Number(data[i + n][0]);
		var sell_price = 1/ Number(data[i][0]);
		var buy_price = 1/ Number(data[i + n][0]);
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

		amount.innerHTML += "<h4>" + String(am[i]) + "</h4>"
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
		document.getElementById("kyber_tokens").innerHTML+= '<option value="'+ idata.symbol
			+ '" label="'+ idata.name + '('+ idata.symbol +')"></option>';
		//console.log(symbol);
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
