var compound_price = document.getElementById("compound_price");
var cprice;
var rate;
function plotres(response, prefix) {
	for (var key in response){
		if (typeof response[key] == "object") {
			if(Array.isArray(response[key])) {
				// 配列の場合は forEach で要素ごとにに再帰呼び出し
				response[key].forEach(function(item){
						plotres(item, prefix+" "+key) ;
						});
			} else {
				// 連想配列はそのまま再帰呼び出し
				plotres(response[key], prefix+" "+key) ;
			}  
		} else {
			// 配列や連想配列でなければキーの値を表示
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
