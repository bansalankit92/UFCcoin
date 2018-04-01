import {RequestOptions, Http, URLSearchParams} from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from 'app/model/constants';
import { default as Web3} from 'web3';
import { Giveaway } from 'app/model/giveaway';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/bindCallback';
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { UtilService } from './util.service'
import { Subscriber } from 'rxjs/Subscriber';
@Injectable()
export class TokenService {

  private contractAddr = Constants.CONTRACT_ADDRESS;
  private defaultNodeIP = Constants.DEFAULT_NODEIP;
  private nodeIP: string; // Current nodeIP
  private nodeConnected = true; // If we've established a connection yet
  private web3Instance: any; // Current instance of web3
  private unlockedAccount: string; // Current unlocked account

  private ABI = Constants.CONTRACT;

  isWeb3Available = false;
  web3;
  private $accountAddress;
  private $accountPassword;

  constructor(private utilService: UtilService, private http: Http) { }

	public get accountAddress(): string {
		return this.$accountAddress;
	}

	public set accountAddress(value: string) {
		this.$accountAddress = value;
  }
  
  public set accountPassword(value: string) {
		this.$accountPassword = value;
	}  

  private initializeWeb3() {
    if (typeof window['web3'] !== 'undefined' && typeof window['Web3'] !== 'undefined') {
      console.log("Using web3 detected from external source like Metamask")
      this.web3 = new this.Web3(window['web3'].currentProvider)
      this.isWeb3Available = true;
      this.web3Instance = this.web3.eth.contract(this.ABI).at(this.contractAddr);
       console.log(this.web3Instance)
      // console.log(this.web3.eth.accounts[0])
      // console.log(this.web3)
      

      //  console.log(this.web3.eth.accounts)
      // this.getBalanceOf('0x9831b22d110D694c0a10651D82D856b453cEA00d');
       // console.log(tokenContract);
    } else {
      console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      this.web3 = new Web3(new Web3.providers.HttpProvider(this.defaultNodeIP))
      this.isWeb3Available = false;

      // console.log(this.web3);
      // console.log(this.web3.eth);
      // console.log(this.web3.eth.accounts);
      this.web3Instance = new this.web3.eth.Contract(this.ABI, this.contractAddr);

   //   console.log(this.web3Instance);
      // console.log(this.     web3.eth.accounts.wallet.load('ether123#') );

      // this.web3Instance.methods.numCampaigns().call((err, res) => {
      //   console.log(err, res);
      //   this.noOfCampaigns = res;

      // });
      // this.web3Instance.methods.campaigns(1).call((err, res) => {
      //   console.log(err, res);
      //   this.campaigns = res;
      // });

    }

  }

  private get Web3(): any {
    return window['Web3'];
  }

  private initialize() {
    if (!this.web3 && !this.web3Instance) {
      this.initializeWeb3();
    }
  }

  public unlockAccount(unlockTime ?: number): Observable < any > {
    this.initialize();
    if (this.isWeb3Available) {
      return new Observable < any > (observer => {
        window['web3'].eth.getAccounts((error, accounts) => {
          if(error){
            this.handleCallback(error, null, observer)
          }
          else{
            if(accounts.length===0){
              this.handleCallback('Please create account in metamask', null, observer);
            }else{
              observer.next(accounts[0]);
              observer.complete();
            }
          }
        });
      });
    }else{
    return new Observable < any > (observer => {
      if (UtilService.isValidAddress(this.$accountAddress) && this.$accountPassword) {
        this.web3.eth.personal.unlockAccount(this.$accountAddress.trim(), this.$accountPassword.trim(),
          unlockTime > 100 ? unlockTime : Constants.UNLOCK_TIME, (err, res) => this.handleCallback(err, res, observer));
      } else {
        this.OnError('Please enter correct account address and password', observer);
      }
    });
  }
  }

  private OnError(err, observer?: Subscriber < any >) {
    if (observer) {
      observer.error(err);
    }else {
    return Observable.throw(err);
    }
  }


  balanceOf(address: string): Observable < any > {
    this.initialize();
    return new Observable < any > ((observer) => {
      if (this.isWeb3Available) {
        this.web3Instance.balanceOf(address, (err, res) => {
          if(err){
            this.handleCallback(err, res, observer)
          }else{
            observer.next(res.toNumber());
            observer.complete();
          }
        });
      } else {
        this.web3Instance.methods.balanceOf(address).call((err, res) => this.handleCallback(err, res, observer));
      }
    });
  }

  buyPrice(address: string): Observable < any > {
    this.initialize();
    return new Observable < any > ((observer) => {
      if (this.isWeb3Available) {
        this.web3Instance.buyPrice( (err, res) => {
          if(err){
            this.handleCallback(err, res, observer)
          }else{
            observer.next(res.toNumber());
            observer.complete();
          }
        });
      } else {
        this.web3Instance.methods.buyPrice().call((err, res) => this.handleCallback(err, res, observer));
      }
    });
  }

  sellPrice(address: string): Observable < any > {
    this.initialize();
    return new Observable < any > ((observer) => {
      if (this.isWeb3Available) {
        this.web3Instance.sellPrice( (err, res) => {
          if(err){
            this.handleCallback(err, res, observer)
          }else{
            observer.next(res.toNumber());
            observer.complete();
          }
        });
      } else {
        this.web3Instance.methods.sellPrice().call((err, res) => this.handleCallback(err, res, observer));
      }
    });
  }

  

  
  private handleCallback(err, res, observer: Subscriber < any > ) {
    console.log('err: ',err,' res ', res)
    if (observer) {
      if (err) {
        observer.error(err)
      } else {
        observer.next(res);
        observer.complete();
      }
    }else {
      Observable.throw(err);
    }
  }


  

  transfer( address: string, coins: number): Observable < any > {
    /**
     * 
     * @get transaction receipt
     */
    coins = coins * Constants.COIN_DECIMAL_PLACE;
    this.initialize();
    return new Observable < any > ((observer) => {
      if (this.isWeb3Available) {

        this.unlockAccount().subscribe(account => {
          console.log(account);
          this.web3Instance.transfer(address, coins, {
              from: account,
              gas: Constants.GAS_CONTRIBUTE
            },
            (err, res) => this.handleCallback(err, res, observer));
          }, err => this.OnError(err, observer));
      } else {
        this.unlockAccount().subscribe(res => {
          console.log(res);
          if (res) {
            console.log(this.web3Instance.methods);
            this.web3Instance.methods.contribute(address, coins).send({
                from: this.$accountAddress,
                gas: Constants.GAS_WITHDRAW
              }, (err, res1) => this.handleCallback(err, res1, observer));

          } else {
            this.OnError('Please enter correct account address and password', observer)
          }
        }, err => this.OnError(err, observer));
      }
    });
  }



  

  buy( ether: number): Observable < any > {
    /**
     * 
     * @get transaction receipt
     */
    ether = ether * Constants.ETHER_DECIMAL_PLACE;
    this.initialize();
    return new Observable < any > ((observer) => {
      if (this.isWeb3Available) {

        this.unlockAccount().subscribe(account => {
          console.log(account);
          this.web3Instance.buy( {
              from: account,
              gas: Constants.GAS_CONTRIBUTE,
              value: ether
            },
            (err, res) => this.handleCallback(err, res, observer));
          }, err => this.OnError(err, observer));
      } else {
        this.unlockAccount().subscribe(res => {
          console.log(res);
          if (res) {
            console.log(this.web3Instance.methods);
            this.web3Instance.methods.contribute().send({
                from: this.$accountAddress,
                gas: Constants.GAS_WITHDRAW,
                value: ether
              }, (err, res1) => this.handleCallback(err, res1, observer));

          } else {
            this.OnError('Please enter correct account address and password', observer)
          }
        }, err => this.OnError(err, observer));
      }
    });
  }




  sell(  coins: number): Observable < any > {
    /**
     * 
     * @get transaction receipt
     */
    coins = coins * Constants.COIN_DECIMAL_PLACE;
    this.initialize();
    return new Observable < any > ((observer) => {
      if (this.isWeb3Available) {

        this.unlockAccount().subscribe(account => {
          console.log(account);
          this.web3Instance.sell(coins, {
              from: account,
              gas: Constants.GAS_CONTRIBUTE
            },
            (err, res) => this.handleCallback(err, res, observer));
          }, err => this.OnError(err, observer));
      } else {
        this.unlockAccount().subscribe(res => {
          console.log(res);
          if (res) {
            console.log(this.web3Instance.methods);
            this.web3Instance.methods.sell( coins).send({
                from: this.$accountAddress,
                gas: Constants.GAS_WITHDRAW
              }, (err, res1) => this.handleCallback(err, res1, observer));

          } else {
            this.OnError('Please enter correct account address and password', observer)
          }
        }, err => this.OnError(err, observer));
      }
    });
  }


  addToSheet(giveaway: Giveaway):Observable<any> {
    let headers = new Headers({ });
      let request_data = new URLSearchParams();
      request_data.set('name', giveaway.name);
      request_data.set('email_id', giveaway.email_id);
      request_data.set('ether_address', giveaway.ether_address);
      request_data.set('no_of_coins', String(giveaway.no_of_coins));
      request_data.set('discount_code', giveaway.discount_code);
      request_data.set('referral_id', giveaway.referral_id);
      request_data.set('giveaway_id', giveaway.giveaway_id);
      let request_option = new RequestOptions({});
      request_option.params = request_data;
      return this.http.get(Constants.FORM_DATA_STORE, request_option).map(response => {
        const contentType = response.headers.get('Content-type');
       if (contentType === 'application/json') {
        return response.json();
       } else {
        return response.text();
       }
    })  .catch(this.handleError);



  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
         console.error(errMsg); // log to console instead
         return Observable.throw(errMsg);
  }

}
