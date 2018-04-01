import { Component, OnInit } from '@angular/core';
import { Constants } from 'app/model/constants';
import { TokenService } from 'app/service/token.service';

@Component({
  selector: 'app-buy-token',
  templateUrl: './buy-token.component.html',
  styleUrls: ['./buy-token.component.css']
})
export class BuyTokenComponent implements OnInit {

  transactionId;
  accountAddress;
  noOfCoins;
  etherscanUrl;

  constructor(private tokenService: TokenService) {

  }
  ngOnInit() {
  }

  buy() {
    this.tokenService.buy( this.noOfCoins).subscribe(res => {
     console.log(res);
     this.transactionId = res;
     this.etherscanUrl  = Constants.ETHERSCAN_URL + res;
   }, err => {
     alert('Error occurred while transfering coins. Check Faqs for more details');
     console.log('err in transfer', err);
   });
  }


}
