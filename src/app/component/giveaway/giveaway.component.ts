import { Component, OnInit } from '@angular/core';
import { Giveaway } from '../../model/giveaway';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-giveaway',
  templateUrl: './giveaway.component.html',
  styleUrls: ['./giveaway.component.css']
})
export class GiveawayComponent implements OnInit {

 
  giveawayToken: Giveaway = new Giveaway();
  isSuccess = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
  }

  giveaway(){
    // @TODO validate
    console.log(this.giveawayToken);
    if(this.validate(this.giveawayToken)){

    }
    // this.tokenService.addToSheet(this.giveawayToken).subscribe(res=>{
    //   console.log(res)
    //   if(res.success){
    //       this.isSuccess = true;
    //   }
    // });
  }

  select(id){
    this.giveawayToken.giveaway_id = id
    switch(this.giveawayToken.giveaway_id){
      case '1' : this.giveawayToken.no_of_coins = 250; break;
      case '2' : this.giveawayToken.no_of_coins = 650; break;
      case '3' : this.giveawayToken.no_of_coins = 1175; break;
    }
  }

  validate(giveaway1: Giveaway): boolean {
    if (!giveaway1.email_id) {
      alert('Please enter your mail id');
      return false;
    }
    if (!giveaway1.ether_address) {
      alert('Please enter your Ethereum Account public address');
      return false;
    }
    if(!giveaway1.discount_code){
      giveaway1.discount_code = 'NA';
      return false;
    }
    if(!giveaway1.referral_id){
      giveaway1.referral_id = 'NA';
      return false;
    }
    if(!giveaway1.giveaway_id){
      giveaway1.giveaway_id = '1';

      return false;
    }
    if(!giveaway1.no_of_coins){
      giveaway1.no_of_coins = 100;
      return false;
    }

    return true;
  }

}
