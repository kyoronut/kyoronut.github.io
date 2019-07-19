/*const { main } = require('../kyoronut.github.io/yarn/node_modules/ethereum-dex-prices-service')
  const amount = [1e3];
  function getAirSwapPrice(val) {
  var r = main('DAI', val, 'BUY', 0);
//console.log(result);
return r;
}

function get_buy_dai_info(val){
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

const result = [];
const result2 = [];
for(v in amount){
result.push(getAirSwapPrice(amount[v]));
result2.push(get_buy_dai_info(amount[v]));

}
result.forEach(async (a) => {
console.log(await a)
});
*/

async function get_price(from_token, to_token, amount_type, amount){
	return new Promise(function(resolve){
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

async function wait(val){
	await setInterval(console.log(""), val);
}

var form = document.forms.mainForm;
var search = document.getElementById("search");
function search_price(){
	var order_type = form.fromOrTo.value;
	var inverse;
	if(order_type == "to"){inverse = "from";}
	else{inverse = "to";}
	var amount = form.amount.value;
	var from_token = form.from_token.value;
	var to_token = form.to_token.value;
	var med_token = form.med_token.value;
	var ratio;
	var direct_price;
	var direct_amount;
	var direct_dex;
	var med_price;
	var med_amount;
	var med_price=[];
	var med_dex={};
	var eth_amount;
	var token_amount;
	var med_from = [];
	var med_to = [];
	var nume_token = [];
	var deno_token = [];

	//reset outputs
	document.getElementById("direct_price_title").innerHTML = "";
	document.getElementById("direct_price").innerHTML = "";
	document.getElementById("direct_amount").innerHTML = "";
	document.getElementById("med_price_title").innerHTML = "";
	document.getElementById("med_price").innerHTML = "";
	document.getElementById("med_amount").innerHTML = "";
	document.getElementById("from_eth_price_title").innerHTML = "";
	document.getElementById("from_eth_price").innerHTML = "";
	document.getElementById("to_eth_price_title").innerHTML = "";
	document.getElementById("to_eth_price").innerHTML = "";
	document.getElementById("ratio_title").innerHTML ="";
	document.getElementById("ratio").innerHTML ="";
	document.getElementById("eth_amount").innerHTML ="";

	if(from_token == med_token
			|| med_token == to_token
			|| to_token == from_token
			){
		document.getElementById("caution").innerHTML = "Same token.";
		return -1;
	}
	else if(amount == ""){
		document.getElementById("caution").innerHTML = "Enter amount .";
		return -1;
	}
	else{
		document.getElementById("caution").innerHTML = "";
		get_price(from_token, to_token, order_type, amount).then((result)=>{
			console.log("result");
			direct_price = Number(result[0]);
			direct_dex = String(result[1]);
			direct_amount = direct_price * amount;
			document.getElementById("direct_price_title").innerHTML = "Direct swap";
			document.getElementById("direct_price_title").innerHTML += " at " + direct_dex;
			document.getElementById("direct_price").innerHTML += "Price: ";
			document.getElementById("direct_price").innerHTML += direct_price.toExponential(3);
			document.getElementById("direct_amount").innerHTML += inverse + " amount: ";
			document.getElementById("direct_amount").innerHTML += direct_amount.toExponential(3);
			if(order_type=="from"){
				document.getElementById("direct_price").innerHTML +=" "+ to_token+"/"+from_token;
				document.getElementById("direct_amount").innerHTML +=" "+ to_token;
			}else{
				document.getElementById("direct_price").innerHTML +=" "+ from_token+"/"+to_token;
				document.getElementById("direct_amount").innerHTML +=" "+ from_token;
			}
		});
		if(order_type=="from"){
			med_from[0] = from_token;
			med_to[0] = med_token;
			med_from[1] = med_to[0];
			med_to[1] = to_token;
			nume_token[0] = med_token;
			deno_token[0] = from_token;
			nume_token[1] = to_token;
			deno_token[1] = med_token;
		}
		else{
			med_from[0] = med_token;
			med_to[0] = to_token;
			med_from[1] = from_token;
			med_to[1] = med_token;
			nume_token[0] = from_token;
			deno_token[0] = med_token;
			nume_token[1] = med_token;
			deno_token[1] = to_token;
		}

		get_price(med_from[0], med_to[0], order_type, amount).then((result1)=>{
			console.log(result1);
			med_price[0] = Number(result1[0]);
			med_dex[0] = String(result1[1]);
			eth_amount = amount * med_price[0];
			return eth_amount;

		}).then((result2)=>{
			return get_price(med_from[1], med_to[1], order_type, result2);

		}).then((result3)=>{
			console.log(result3);
			med_price[1] = Number(result3[0]);
			med_dex[1] = String(result3[1]);

			console.log(from_eth_price);
			console.log(eth_amount);

			token_amount = from_eth_price * eth_amount;
			console.log("token_amount"+String(token_amount));
			med_price[2] = med_price[0] * med_price[1];
			ratio = med_price[2] / direct_price;
			console.log(med_price[2].toExponential(3));
			med_amount = med_price[2] * amount;
		}).then(()=>{
			document.getElementById("med_price_title").innerHTML = from_token+"-"+med_token+"-"+to_token+" path";
			document.getElementById("med_price").innerHTML += "Price: ";
			document.getElementById("med_price").innerHTML += med_price[2].toExponential(3);
			document.getElementById("med_amount").innerHTML += inverse + " amount: ";
			document.getElementById("med_amount").innerHTML += med_amount.toExponential(3);

			document.getElementById("to_eth_price_title").innerHTML =med_from[0]+"-"+med_to[0];
			document.getElementById("to_eth_price_title").innerHTML += " at "+med_dex[0];
			document.getElementById("to_eth_price").innerHTML += "Price: ";
			document.getElementById("to_eth_price").innerHTML += med_price[0].toExponential(3);
			document.getElementById("eth_amount").innerHTML +="Mediator: "+eth_amount.toExponential(3)+" "+med_token;

			document.getElementById("from_eth_price_title").innerHTML =med_from[1]+"-"+med_to[1];
			document.getElementById("from_eth_price_title").innerHTML += " at "+med_dex[1];
			document.getElementById("from_eth_price").innerHTML += "Price: ";
			document.getElementById("from_eth_price").innerHTML += med_price[1].toExponential(3);
			
			if(order_type=="from"){
				document.getElementById("med_price").innerHTML +=" "+ to_token+"/"+from_token;
				document.getElementById("med_amount").innerHTML +=" "+ to_token;
				document.getElementById("to_eth_price").innerHTML +=" "+med_to[0]+"/"+med_from[0];
				document.getElementById("from_eth_price").innerHTML +=" "+med_to[1]+"/"+med_from[1];
			}else{
				document.getElementById("med_price").innerHTML +=" "+ from_token+"/"+to_token;
				document.getElementById("med_amount").innerHTML +=" "+ from_token;
				document.getElementById("to_eth_price").innerHTML +=" "+med_from[0]+"/"+med_to[0];
				document.getElementById("from_eth_price").innerHTML +=" "+med_from[1]+"/"+med_to[1];
			}

			document.getElementById("ratio_title").innerHTML ="Path / Direct: ";
			//document.getElementById("ratio").innerHTML += "Path/Direct: ";
			document.getElementById("ratio").innerHTML += ratio.toFixed(4);
		});
	}
}

function show(){
	//var tmp = document.getElementById("input").value;
	var tmp = String(form.example.value);
	document.getElementById("output").innerHTML = tmp;}
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	function get_supply(){
		return new Promise(function(resolve){
			$.ajax({
				url:proxyurl+"https://api.uniswap.info/pairs",
				dataType:"json",
			})
			.done((data)=>{console.log(data);
				resolve(data);
			})
			.fail((data)=>{console.log(data.responceText);})
				.always((data)=>{console.log(data);});
		})
	};
get_supply();
