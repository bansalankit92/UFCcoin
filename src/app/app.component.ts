import { Component, OnInit } from '@angular/core';
import { Constants } from './model/constants'
import { default as Web3} from 'web3';
import { TokenService } from 'app/service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  

  constructor(private tokenService: TokenService) {

  }

  ngOnInit() {
  
  }




}
