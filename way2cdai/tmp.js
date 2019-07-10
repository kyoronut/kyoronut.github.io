var jsons = {"cToken":[{"borrow_rate":{"value":"0.091894855517653061"},"cash":{"value":"448.455371198573953757"},"collateral_factor":{"value":"0.60000000000000000"},"exchange_rate":{"value":"0.020124918684173925"},"interest_rate_model_address":"0x6330d442a2d7ee4dc66c0adb9969e8702aefc9fe","name":"Compound 0x 📈","number_of_borrowers":14,"number_of_suppliers":20,"reserves":{"value":"0"},"supply_rate":{"value":"0.022022557867524233"},"symbol":"cZRX","token_address":"0x52201ff1720134bbbbb2f6bc97bf3715490ec19b","total_borrows":{"value":"141.345493069018120798"},"total_supply":{"value":"29306.99365913"},"underlying_address":"0xddea378a6ddc8afec82c36e9b0078826bf9e68b6","underlying_name":"0x 📈","underlying_price":{"value":"0.000954626666666666"},"underlying_symbol":"ZRX"},{"borrow_rate":{"value":"0.090173269979583168"},"cash":{"value":"1004.097130"},"collateral_factor":{"value":"0.80000000000000000"},"exchange_rate":{"value":"0.020127346076895277"},"interest_rate_model_address":"0x1a43bfd39b15dcf444e17ab408c4b5be32deb7f5","name":"Compound USD Coin 📈","number_of_borrowers":6,"number_of_suppliers":51,"reserves":{"value":"0"},"supply_rate":{"value":"0.040656093093997058"},"symbol":"cUSDC","token_address":"0x5b281a6dda0b271e91ae35de655ad301c976edb1","total_borrows":{"value":"824.414253"},"total_supply":{"value":"90847.11794674"},"underlying_address":"0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b","underlying_name":"USD Coin 📈","underlying_price":{"value":"0.0032447970934859970000000000"},"underlying_symbol":"USDC"},{"borrow_rate":{"value":"0.095528220821981033"},"cash":{"value":"10349.043915292108710566"},"collateral_factor":{"value":"0.70000000000000000"},"exchange_rate":{"value":"0.020282141607491117"},"interest_rate_model_address":"0xe12630c8fdd7d0096c9cd72cd228598aebe58795","name":"Compound Dai 📈","number_of_borrowers":117,"number_of_suppliers":126,"reserves":{"value":"0"},"supply_rate":{"value":"0.036243582769284324"},"symbol":"cDAI","token_address":"0x6d7f0754ffeb405d23c51ce938289d4835be3b14","total_borrows":{"value":"6326.873909450917467388"},"total_supply":{"value":"822197.09079360"},"underlying_address":"0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea","underlying_name":"Dai 📈","underlying_price":{"value":"0.003225692078019018"},"underlying_symbol":"DAI"},{"borrow_rate":{"value":"0.070922692379460859"},"cash":{"value":"125.382256178551644759"},"collateral_factor":{"value":"0.80000000000000000"},"exchange_rate":{"value":"0.020203168350118263"},"interest_rate_model_address":"0x1a43bfd39b15dcf444e17ab408c4b5be32deb7f5","name":"Compound Ether 📈","number_of_borrowers":20,"number_of_suppliers":172,"reserves":{"value":"0"},"supply_rate":{"value":"0.025150141471758177"},"symbol":"cETH","token_address":"0xd6801a1dffcd0a410336ef88def4320d6df1883e","total_borrows":{"value":"68.892412994359536532"},"total_supply":{"value":"9616.04961193"},"underlying_address":null,"underlying_name":"Ether 📈","underlying_price":{"value":"1"},"underlying_symbol":"ETH"},{"borrow_rate":{"value":"0.040074638568551265"},"cash":{"value":"998.361238160110097546"},"collateral_factor":{"value":"0.40000000000000000"},"exchange_rate":{"value":"0.020004301037678978"},"interest_rate_model_address":"0x6330d442a2d7ee4dc66c0adb9969e8702aefc9fe","name":"Compound Augur 📈","number_of_borrowers":5,"number_of_suppliers":14,"reserves":{"value":"0"},"supply_rate":{"value":"0.002681612950096638"},"symbol":"cREP","token_address":"0xebe09eb3411d18f4ff8d859e096c533cac5c6b60","total_borrows":{"value":"71.59673176602680719"},"total_supply":{"value":"53486.39614605"},"underlying_address":"0x6e894660985207feb7cf89faf048998c71e8ee89","underlying_name":"Augur 📈","underlying_price":{"value":"0.05345611000000000"},"underlying_symbol":"REP"},{"borrow_rate":{"value":"0.044194995039214401"},"cash":{"value":"121627.155661572318371230"},"collateral_factor":{"value":"0.60000000000000000"},"exchange_rate":{"value":"0.020106741192769895"},"interest_rate_model_address":"0x6330d442a2d7ee4dc66c0adb9969e8702aefc9fe","name":"Compound Basic Attention Token 📈","number_of_borrowers":8,"number_of_suppliers":23,"reserves":{"value":"0"},"supply_rate":{"value":"0.003564325619106325"},"symbol":"cBAT","token_address":"0xebf1a11532b93a529b5bc942b4baa98647913002","total_borrows":{"value":"10669.742662153311968604"},"total_supply":{"value":"6579728.51270885"},"underlying_address":"0xbf7a7169562078c96f0ec1a8afd6ae50f12e5a99","underlying_name":"Basic Attention Token 📈","underlying_price":{"value":"0.00095749750000000"},"underlying_symbol":"BAT"}],"error":null,"request":{"addresses":[],"block_number":4705668,"block_timestamp":0}}
;

var rate = 0;
var cprice;
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
				//console.log(prefix+" "+key+": "+response[key]);
				cprice = rate;
				console.log(cprice);
			}
		}
	}

}
plotres(jsons,""); 
console.log(cprice);
