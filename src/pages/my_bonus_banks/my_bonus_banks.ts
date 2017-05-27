import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

declare var Web3: any;
var web3;
var myContractInstance;

var event_result;
var event_check = false;

@Component ({
  selector: 'page-my_bonus_banks',
  templateUrl: 'my_bonus_banks.html'
})
export class My_bonus_banksPage {

  nav_data;
  select_to_banks: string;
  from_bank_value: number;
  to_bank_value: number;

  event_resultList = [];

  constructor(public navCtrl: NavController,
              public NavParams: NavParams,
              public ActionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private DataServiceProvider: DataServiceProvider) {

    this.requireWeb3();
    this.client_eventWatch();
    this.event_update();

    this.nav_data = NavParams.data.item;
  }

  option_onChange(option){ // 選項變化時做的事情
    this.select_to_banks = option; //傳來 選的選項 = option ; 存進 ts 裡宣告的變數 this.select_to_banks
    console.log("Selected bank", option);
  }

  input_onChange(from_bank_value){
    this.to_bank_value = this.from_bank_value*10;
    console.log(this.to_bank_value);
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '交易確認',
      message: '此項紅利交換是否確認送出?',
      buttons: [
        {
          text: '否',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');

          }
        },
        {
          text: '是',
          handler: () => {
            console.log('Submit clicked');
            console.log(this.from_bank_value);
            console.log(this.select_to_banks);

            this.web3_sendTransaction();
          }
        }
      ]
    });
    alert.present();
  }

   requireWeb3(){    // 建立contract

    web3 = new Web3();
	  web3.setProvider(new web3.providers.HttpProvider("http://140.113.72.54:8545"));	//連到哪台server

    // creation of contract object
    var MyContract = web3.eth.contract([ { "constant": false, "inputs": [ { "name": "newSellPrice", "type": "uint256" }, { "name": "newBuyPrice", "type": "uint256" } ], "name": "setPrices", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "from_bank_value": "YuantaCoin_string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_from_bank_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256", "from_bank_value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_from_bank_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "from_bank_value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "sellPrice", "outputs": [ { "name": "", "type": "uint256", "from_bank_value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "standard", "outputs": [ { "name": "", "type": "string", "from_bank_value": "Token 0.1" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256", "from_bank_value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "account", "type": "string" }, { "name": "from_bonus", "type": "uint256" }, { "name": "to_bonus", "type": "uint256" }, { "name": "fee", "type": "uint256" }, { "name": "date", "type": "string" }, { "name": "_to", "type": "address" }, { "name": "_from_bank_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "target", "type": "address" }, { "name": "mintedAmount", "type": "uint256" } ], "name": "mintToken", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "buyPrice", "outputs": [ { "name": "", "type": "uint256", "from_bank_value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "from_bank_value": "0xf58f04539ada143abec19204500d501160c44436" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "from_bank_value": "$" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "buy", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "frozenAccount", "outputs": [ { "name": "", "type": "bool", "from_bank_value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_from_bank_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" } ], "name": "approveAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256", "from_bank_value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "amount", "type": "uint256" } ], "name": "sell", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "target", "type": "address" }, { "name": "freeze", "type": "bool" } ], "name": "freezeAccount", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "from_bank_value": "1000000000" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "from_bank_value": "YuantaCoin_string" }, { "name": "decimalUnits", "type": "uint8", "index": 2, "typeShort": "uint", "bits": "8", "displayName": "decimal Units", "template": "elements_input_uint", "from_bank_value": "0" }, { "name": "tokenSymbol", "type": "string", "index": 3, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "from_bank_value": "$" }, { "name": "centralMinter", "type": "address", "index": 4, "typeShort": "address", "bits": "", "displayName": "central Minter", "template": "elements_input_address", "from_bank_value": "0xf58F04539ADA143aBec19204500D501160c44436" } ], "payable": false, "type": "constructor" }, { "payable": false, "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "target", "type": "address" }, { "indexed": false, "name": "frozen", "type": "bool" } ], "name": "FrozenFunds", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "from_bank_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "account", "type": "string" }, { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "from_bonus", "type": "uint256" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "to_bonus", "type": "uint256" }, { "indexed": false, "name": "fee", "type": "uint256" }, { "indexed": false, "name": "date", "type": "string" }, { "indexed": false, "name": "from_bank_value", "type": "uint256" } ], "name": "Exchange", "type": "event" } ])

    var myContractAddress ='0x19ecbD8f51a13E5Ed533f8c5736e71B3cC1f5C07';	//ethereum 中 contract 的 address

    myContractInstance = MyContract.at(myContractAddress);	// initiate contract for an address
  }

  web3_sendTransaction(){

    var fromAddress = '0x13f42EcB9fBF94Ff33cD22828070F2FA10048a27';	//由哪個銀行送出元大幣，暫時寫死國泰
		var from_Password = 'citi';

    var from_bank_value = this.from_bank_value;
    var from_bank_rate = 0;

    var from_bank_user_account = this.nav_data.account;

    var to_bank = this.select_to_banks;
    var to_bank_value = this.to_bank_value   // 缺試算功能

    var fee = 0; // 缺試算功能

    var date = this.current_date();

    var to_bank_address = "";

		var bank_yuanta_address='0xf58F04539ADA143aBec19204500D501160c44436';
		var bank_citi_address='0x13f42EcB9fBF94Ff33cD22828070F2FA10048a27';
		var bank_cathay_address='0xB27dc07C2984d9643449E3F9f8feb63236Fc2C98';

		var bank_yuanta_rate=100;
		var bank_citi_rate=200;
		var bank_cathay_rate=50;

		if (to_bank=="元大銀行") {
			to_bank_address = bank_yuanta_address;
		}else if (to_bank=="花旗銀行") {
			to_bank_address = bank_citi_address;
		}else if (to_bank=="國泰銀行") {
			to_bank_address = bank_cathay_address;
		}

		from_bank_rate = bank_citi_rate;

    var value = Math.round(from_bank_value/from_bank_rate);

		console.log("from_bank_user_account:", from_bank_user_account, "from_bank_value:", from_bank_value, "fromAddress:", fromAddress);
		console.log("to_bank_value:", to_bank_value, "fee:", fee, "date:", date, "to_bank_address:", to_bank_address, "value:", value);

    web3.personal.unlockAccount(fromAddress, from_Password, 300);	//解鎖要執行 function 的 account

    // var res = myContractInstance.transfer(	// transfer 是 contract 裡 的一個 function
		// 		from_bank_user_account,
		// 		from_bank_value,
		// 		to_bank_value,
		// 		fee,
		// 		date,
		// 		to_bank_address,	//input
		// 		value,	//input
		// 		{
		// 			from: fromAddress,	//從哪個ethereum帳戶執行
		// 			'gas': myContractInstance.transfer.estimateGas(from_bank_user_account,from_bank_value,to_bank_value,fee,date,to_bank_address,value) //執行function所需的gas ((發現放input突然就可以了
		// 		},
		// 		function(err, result) {	//callback 的 function
		// 			if (!err){
		// 				console.log("Transaction_Hash: " + result);
		// 				// bootbox.alert("交易成功!");	//瀏覽器 會 顯示 交易成功視窗
		// 			}
		// 			else {
		// 				console.log(err);
		// 				//alert(err);
		// 			}
		// 		}
		// 	);

    var update_data = {
      "from_bank_value": from_bank_value,
      "to_bank_value": to_bank_value,
      "fee": fee
    };

    this.update_value(update_data);
  }

  update_value(data) {
    this.DataServiceProvider.update_value(data);
  }

  client_eventWatch() {

    var event = myContractInstance.Exchange({},
      {
        fromBlock: 8063,
        toBlock: 'latest'
      });

    var id = 1;
    event.get(function (error, result) {
      if (!error) {
        console.log(result);
        for (var i = result.length - 1; i >= 0; i--) {
          // console.log(result[i].transactionHash);
          // console.log(result[i].args.account);
          // console.log(result[i].args.date);
          // console.log(result[i].args.fee.c[0]);
          // console.log(result[i].args.from);
          // console.log(result[i].args.from_bonus.c[0]);
          // console.log(result[i].args.to);
          // console.log(result[i].args.to_bonus.c[0]);

          var bank_yuanta_address = '0xf58f04539ada143abec19204500d501160c44436';
          var bank_citi_address = '0x13f42ecb9fbf94ff33cd22828070f2fa10048a27';
          var bank_cathay_address = '0xb27dc07c2984d9643449e3f9f8feb63236fc2c98';
          var seller_address = '0x4aaa9ba999f9f489d3ee2326906d6231759b24c4';

          if (result[i].args.from === bank_yuanta_address) {
            result[i].args.from = "元大銀行";
          } else if (result[i].args.from === bank_citi_address) {
            result[i].args.from = "花旗銀行";
          } else if (result[i].args.from === bank_cathay_address) {
            result[i].args.from = "國泰銀行";
          }

          if (result[i].args.to === bank_yuanta_address) {
            result[i].args.to = "元大銀行";
          } else if (result[i].args.to === bank_citi_address) {
            result[i].args.to = "花旗銀行";
          } else if (result[i].args.to === bank_cathay_address) {
            result[i].args.to = "國泰銀行";
          }
          else if (result[i].args.to === seller_address) {
            result[i].args.to = "Puma專賣店";
          }

          if (result[i].args.account === '0367821 0235641' || result[i].args.account === '0134589 0134285' || result[i].args.account === '0126839 0693256') {

          } else {
            result.splice(i, 1);
          }
        }
        event_result = result;
        event_check = true;
      }
    });

  }

  event_update() {     //每隔 0.1 秒 檢查 event_check ; 若為true 把 global 的 event_result 放進 result_list 給 html 讀取

    setTimeout(() => {
      if (event_check == false) {
        this.event_update();
      } else {
        this.event_resultList = event_result;
        console.log("Event Get!");
        console.log(this.event_resultList);
      }
    }, 100);
  }

  current_date(){
	var date = new Date();
			var yyyy = date.getFullYear();
			var mm = date.getMonth()+1; //January is 0!
			var dd = date.getDate();
			var hour    = date.getHours();
      var minute  = date.getMinutes();
      var second  = date.getSeconds();
			if(dd<10) {
			    dd=parseInt('0'+dd);
			}
			if(mm<10) {
			    mm=parseInt('0'+mm);
			}
			if(hour.toString().length == 1) {
          var hour = parseInt('0'+hour);
      }
      if(minute.toString().length == 1) {
          var minute = parseInt('0'+minute);
      }
      if(second.toString().length == 1) {
          var second = parseInt('0'+second);
      }
			var date_result = yyyy+"-"+mm+"-"+dd+" "+hour+":"+minute+":"+second;
			return date_result;
		}
}
