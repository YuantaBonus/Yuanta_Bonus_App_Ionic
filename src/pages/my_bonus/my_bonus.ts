import { Component } from '@angular/core';
import { NavController, LoadingController, Events  } from 'ionic-angular';
import { My_bonus_banksPage } from '../my_bonus_banks/my_bonus_banks';
import { DataServiceProvider } from '../../providers/data-service/data-service';

// 全域的變數 js 才讀的到
declare var Web3: any;
var web3;
var myContractInstance;

var event_result;
var event_check = false;

@Component ({
  selector: 'page-my_bonus',
  templateUrl: 'my_bonus.html'
})


export class My_bonusPage {

  loading;  // loading動畫 的 變數

  items = [];
  account_data_list = [];

  profile_list= { // 單純為了讓 html不會顯示錯誤 先宣告裡面有甚麼key
    name: "",
    username: ""
  };

  event_resultList = []; //js 讀不到 => 從 全域的 event_result 獲得資料 顯示在 html

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private DataServiceProvider: DataServiceProvider,
              public events: Events) {

    this.presentLoading();

    this.get_account_data(); //在 constructer　裡　call 這個function 要資料><
    this.get_profile(); //在 constructer　裡　call 這個function 要資料><

    this.requireWeb3();
    this.client_eventGet();
    this.event_update();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.get_account_data(); //在 constructer　裡　call 這個function 要資料><
    this.get_profile(); //在 constructer　裡　call 這個function 要資料><

    this.requireWeb3();
    this.client_eventGet();
    this.event_update();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  presentLoading() {  //顯示 loading 的 動畫
    this.loading = this.loadingCtrl.create({
      content: '載入中...',
    });

    this.loading.present();
  }

  openNavDetailsPage(item) {  // 跳到選擇的銀行頁面 with 該銀行的data
    this.navCtrl.push(My_bonus_banksPage, { item: item });

    this.events.subscribe('finish_transfer',() => {
      this.presentLoading();

      this.get_account_data(); //在 constructer　裡　call 這個function 要資料><
      this.get_profile(); //在 constructer　裡　call 這個function 要資料><

      this.requireWeb3();
      this.client_eventGet();
      this.event_update();
    });
  }


  get_account_data(){ // 跟 dataservice 要 用戶的帳戶資料
    this.DataServiceProvider.get_account_data().subscribe(data => this.account_data_list = data);
                                 // data 丟到 messageList 去跟php要到資料! dataservice
                                 //messageList->account_data_list
  }

  get_profile() {  // 跟 dataservice 要 用戶的個人資料
    this.DataServiceProvider.get_profile().subscribe(data => this.profile_list = data);
  }

  requireWeb3() {    // 建立contract

    web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider("http://140.113.72.54:8545"));	//連到哪台server

    // creation of contract object
    var MyContract = web3.eth.contract([{ "constant": false, "inputs": [{ "name": "newSellPrice", "type": "uint256" }, { "name": "newBuyPrice", "type": "uint256" }], "name": "setPrices", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string", "from_bank_value": "YuantaCoin_string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_from_bank_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256", "from_bank_value": "0" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_from_bank_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8", "from_bank_value": "0" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "sellPrice", "outputs": [{ "name": "", "type": "uint256", "from_bank_value": "0" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "standard", "outputs": [{ "name": "", "type": "string", "from_bank_value": "Token 0.1" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256", "from_bank_value": "0" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "account", "type": "string" }, { "name": "from_bonus", "type": "uint256" }, { "name": "to_bonus", "type": "uint256" }, { "name": "fee", "type": "uint256" }, { "name": "date", "type": "string" }, { "name": "_to", "type": "address" }, { "name": "_from_bank_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "target", "type": "address" }, { "name": "mintedAmount", "type": "uint256" }], "name": "mintToken", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "buyPrice", "outputs": [{ "name": "", "type": "uint256", "from_bank_value": "0" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address", "from_bank_value": "0xf58f04539ada143abec19204500d501160c44436" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string", "from_bank_value": "$" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "buy", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "frozenAccount", "outputs": [{ "name": "", "type": "bool", "from_bank_value": false }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_from_bank_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256", "from_bank_value": "0" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "sell", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "target", "type": "address" }, { "name": "freeze", "type": "bool" }], "name": "freezeAccount", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "inputs": [{ "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "from_bank_value": "1000000000" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "from_bank_value": "YuantaCoin_string" }, { "name": "decimalUnits", "type": "uint8", "index": 2, "typeShort": "uint", "bits": "8", "displayName": "decimal Units", "template": "elements_input_uint", "from_bank_value": "0" }, { "name": "tokenSymbol", "type": "string", "index": 3, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "from_bank_value": "$" }, { "name": "centralMinter", "type": "address", "index": 4, "typeShort": "address", "bits": "", "displayName": "central Minter", "template": "elements_input_address", "from_bank_value": "0xf58F04539ADA143aBec19204500D501160c44436" }], "payable": false, "type": "constructor" }, { "payable": false, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "target", "type": "address" }, { "indexed": false, "name": "frozen", "type": "bool" }], "name": "FrozenFunds", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "from_bank_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "account", "type": "string" }, { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "from_bonus", "type": "uint256" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "to_bonus", "type": "uint256" }, { "indexed": false, "name": "fee", "type": "uint256" }, { "indexed": false, "name": "date", "type": "string" }, { "indexed": false, "name": "from_bank_value", "type": "uint256" }], "name": "Exchange", "type": "event" }])

    var myContractAddress = '0x19ecbD8f51a13E5Ed533f8c5736e71B3cC1f5C07';	//ethereum 中 contract 的 address

    myContractInstance = MyContract.at(myContractAddress);	// initiate contract for an address
  }

  client_eventGet() { // get event

    var event = myContractInstance.Exchange({},
      {
        fromBlock: 24798,
        toBlock: 'latest'
      });

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


        setTimeout(() => {  //等一秒在關閉 loading 動畫
          this.loading.dismiss();
        }, 1000);
      }
    }, 100);
  }


}
