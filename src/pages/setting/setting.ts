import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var Web3: any;
var myContractInstance;
var event_result;
var event_check = false;

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  resultList = [];
  text = "Start";

  constructor(public navCtrl: NavController) {
      this.requireWeb3();
      this.web3_event();
      this.event_update();
  }

   requireWeb3(){    // 建立contract

    var web3 = new Web3();
	  web3.setProvider(new web3.providers.HttpProvider("http://140.113.72.54:8545"));	//連到哪台server

    // creation of contract object
    var MyContract = web3.eth.contract([ { "constant": false, "inputs": [ { "name": "newSellPrice", "type": "uint256" }, { "name": "newBuyPrice", "type": "uint256" } ], "name": "setPrices", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "YuantaCoin_string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "sellPrice", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "standard", "outputs": [ { "name": "", "type": "string", "value": "Token 0.1" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "account", "type": "string" }, { "name": "from_bonus", "type": "uint256" }, { "name": "to_bonus", "type": "uint256" }, { "name": "fee", "type": "uint256" }, { "name": "date", "type": "string" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "target", "type": "address" }, { "name": "mintedAmount", "type": "uint256" } ], "name": "mintToken", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "buyPrice", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xf58f04539ada143abec19204500d501160c44436" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "$" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "buy", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "frozenAccount", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" } ], "name": "approveAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "amount", "type": "uint256" } ], "name": "sell", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "target", "type": "address" }, { "name": "freeze", "type": "bool" } ], "name": "freezeAccount", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "value": "1000000000" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "value": "YuantaCoin_string" }, { "name": "decimalUnits", "type": "uint8", "index": 2, "typeShort": "uint", "bits": "8", "displayName": "decimal Units", "template": "elements_input_uint", "value": "0" }, { "name": "tokenSymbol", "type": "string", "index": 3, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "value": "$" }, { "name": "centralMinter", "type": "address", "index": 4, "typeShort": "address", "bits": "", "displayName": "central Minter", "template": "elements_input_address", "value": "0xf58F04539ADA143aBec19204500D501160c44436" } ], "payable": false, "type": "constructor" }, { "payable": false, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "target", "type": "address" }, { "indexed": false, "name": "frozen", "type": "bool" } ], "name": "FrozenFunds", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "account", "type": "string" }, { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "from_bonus", "type": "uint256" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "to_bonus", "type": "uint256" }, { "indexed": false, "name": "fee", "type": "uint256" }, { "indexed": false, "name": "date", "type": "string" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Exchange", "type": "event" } ])

    var myContractAddress ='0x19ecbD8f51a13E5Ed533f8c5736e71B3cC1f5C07';	//ethereum 中 contract 的 address

    myContractInstance = MyContract.at(myContractAddress);	// initiate contract for an address
  }

  web3_event(){   //建立 event filter

    var event = myContractInstance.Exchange({},
				{
					fromBlock: 8063,
					toBlock: 'latest'
				});

      this.event_get(event);

  }

  event_get(event){   // get event 並丟到 global 的 event_result ; 再把 event_check 改為 true

    event.get(function(error, result){
			  	if (!error){
            event_result = result;
            event_check = true;
				    for (var i = result.length-1; i >=0; i--) {
				    	console.log(result[i].transactionHash);
              // console.log(result[i].args.account);
              // console.log(result[i].args.date);
              // console.log(result[i].args.fee.c[0]);
              // console.log(result[i].args.from);
              // console.log(result[i].args.from_bonus.c[0]);
              // console.log(result[i].args.to);
              // console.log(result[i].args.to_bonus.c[0]);
              // console.log(result[i].args.value.c[0]);
				    }
				  }
      });

  }

  event_update(){     //每隔 0.1 秒 檢查 event_check ; 若為true 把 global 的 event_result 放進 result_list 給 html 讀取

      setTimeout(()=>{
        if(event_check == false){
          this.event_update();
        }else{
          this.resultList = event_result;
          this.text = "Event Get!";
        }
      }, 100);
  }
}
