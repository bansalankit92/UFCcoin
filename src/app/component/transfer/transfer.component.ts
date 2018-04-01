import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/service/token.service';
import { Constants } from 'app/model/constants';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  transactionId;
  accountAddress;
  noOfCoins;
  etherscanUrl;

  constructor(private tokenService: TokenService) {

  }
  ngOnInit() {
  }

  transfer() {
    this.tokenService.transfer(this.accountAddress, this.noOfCoins).subscribe(res => {
     console.log(res);
     this.transactionId = res;
     this.etherscanUrl  = Constants.ETHERSCAN_URL + res;
   }, err => {
     alert('Error occurred while transfering coins. Check Faqs for more details');
     console.log('err in transfer', err);
   });
  }

  
}
