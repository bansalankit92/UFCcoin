import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/service/token.service';
import { UtilService } from 'app/service/util.service';
import { Constants } from 'app/model/constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  accountAddress = Constants.ACCOUNT_ADDRESS;
  accountPassword = Constants.ACCOUNT_PASSWORD;


  constructor(private tokenService: TokenService) {

  }
  ngOnInit() {
    this.unLockAccount()
  }

  unLockAccount(){
    if (UtilService.isValidAddress(this.accountAddress) && this.accountPassword) {
    }
  }

}
