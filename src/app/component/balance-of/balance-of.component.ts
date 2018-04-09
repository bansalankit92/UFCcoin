import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/service/token.service';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-balance-of',
  templateUrl: './balance-of.component.html',
  styleUrls: ['./balance-of.component.css']
})
export class BalanceOfComponent implements OnInit {

  balance: number;
  accountAddress;
message;
  constructor(private tokenService: TokenService) {

  }

  ngOnInit() {
  }
  
  search() {
    if(UtilService.isValidAddress(this.accountAddress)){
      this.message = '';
     this.tokenService.balanceOf(this.accountAddress).subscribe(res=>{
      console.log(res);
      this.balance=res;
      if(this.balance>0){
        alert('You have ' + this.balance/1000000000000000000 + ' UFC coins :)');
      }else{
          alert('You have 0 UFC coins :( Please get UFC coins');

        }
    }, err => {
      console.log('err in search', err);
      this.balance=0;
      alert('Some error occurred. You might have not installed Metamask');
    });
   }else{
this.message='Please enter correct Ethereum address';
   }
  }

}
