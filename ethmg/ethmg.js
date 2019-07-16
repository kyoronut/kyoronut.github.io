const n = 8;
const am = [0.3, 1, 3, 10, 30, 100, 300, 1000];
var amount = document.getElementById("amount");
var buy = document.getElementById("buy");
var sell = document.getElementById("sell");
var token = document.getElementById("token").innerHTML;

function get_buy_eth_info(val){
	console.log(val);
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.dex.ag/trade?from=" + token + "&to=ETH&toAmount="+ String(val.toFixed(3)) +"&dex=best",
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
function get_sell_eth_info(val){
	console.log(val);
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.dex.ag/trade?from=ETH&to=" + token + "&fromAmount="+ String(val.toFixed(3)) +"&dex=best",
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
var list = new Array(2*n);
for(var i = 0; i < n; i++){
	list[i] = get_buy_eth_info(am[i]);
	list[i + n] = get_sell_eth_info(am[i]);
}
Promise.all(list)
	.then(function(data){
		for(var i = 0; i < n; i++){
			var buy_price = Number(data[i][0]);
			var sell_price = Number(data[i + n][0]);
			var spread = buy_price - sell_price;
			var medium = (buy_price + sell_price) / 2;
			var spread_p = spread / medium * 100;
			var digit;
			if(buy_price > 100){
				buy.innerHTML += "<h4>" + String(Number(data[i][0]).toFixed(1)) + "</h4>"
					+ "<h5>" + String(data[i][1]) + "</h5>";
				sell.innerHTML += "<h4>" + String(Number(data[i + n][0]).toFixed(1)) + "</h4>"
					+ "<h5>" + String(data[i + n][1]) + "</h5>";
			}else{
				buy.innerHTML += "<h4>" + String(Number(data[i][0]).toExponential(3)) + "</h4>"
					+ "<h5>" + String(data[i][1]) + "</h5>";
				sell.innerHTML += "<h4>" + String(Number(data[i + n][0]).toExponential(3)) + "</h4>"
					+ "<h5>" + String(data[i + n][1]) + "</h5>";
			}

			amount.innerHTML += "<h4>" + String(am[i]) + "</h4>"
				+ "<h5>" + String(Number(spread_p).toFixed(2))+"%</h5>";
		}
	});

