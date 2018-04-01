import { Component, OnInit } from '@angular/core';
import { Campaign } from 'app/model/Campaign';
import { TokenService } from 'app/service/token.service';
import { Constants } from 'app/model/constants';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  balance: number;
  accountAddress;

  constructor(private fundraiserService: TokenService) {

  }

  ngOnInit() {
    this.fundraiserService.balanceOf(Constants.ACCOUNT_ADDRESS).subscribe(res=>{
      console.log(res);
      this.balance = UtilService.getActualTokenValue(res);




    },err=>{
      console.log('eerr no of camp',err);
    });
  }

  search() {
    /* this.web3Instance.campaigns(1, (err, res) => {
       console.log(err, res);
       this.campaigns = res;
     });
     this.web3Instance.numCampaigns((err, res) => {
       console.log(err, res);
       this.noOfCampaigns = res;
     });*/
     this.fundraiserService.balanceOf(this.accountAddress).subscribe(res=>{
      console.log(res);
      this.balance=res;
    }, err => {
      console.log('err in search', err);
    });
   }

}
