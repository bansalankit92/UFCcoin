import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/service/token.service';

@Component({
  selector: 'app-balance-of',
  templateUrl: './balance-of.component.html',
  styleUrls: ['./balance-of.component.css']
})
export class BalanceOfComponent implements OnInit {

  balance: number;
  accountAddress;

  constructor(private tokenService: TokenService) {

  }

  ngOnInit() {
  }
  
  search() {
     this.tokenService.balanceOf(this.accountAddress).subscribe(res=>{
      console.log(res);
      this.balance=res;
    }, err => {
      console.log('err in search', err);
    });
   }


}
