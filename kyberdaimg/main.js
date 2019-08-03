const n = 7;
const am = [10, 30, 100, 300, 1000, 3000, 10000];
var amount = document.getElementById("amount");
var buy = document.getElementById("buy");
var sell = document.getElementById("sell");
var form = document.forms.mainForm;
var token;

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
		var digit;
		//buy.innerHTML += "<h4>" + String(Number(data[i][0]).toExponential(3)) + "</h4>"
		buy.innerHTML += "<h4>" + String(buy_price.toExponential(3)) + "</h4>"
			//+ "<h5>" + String(data[i][1]) + "</h5>";
			+ "<h5><br></h5>";
		//sell.innerHTML += "<h4>" + String(Number(data[i + n][0]).toExponential(3)) + "</h4>"
		sell.innerHTML += "<h4>" + String(sell_price.toExponential(3)) + "</h4>"
			//+ "<h5>" + String(data[i + n][1]) + "</h5>";
			+ "<h5><br></h5>";

		amount.innerHTML += "<h4>" + String(am[i]) + "</h4>"
			+ "<h5>" + String(Number(spread_p).toFixed(2))+"%</h5>";
	}


}
