import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit {

  name;
  emailId;
  message;
  isSuccess = false;

  respMsg;
  constructor(private tokenService: TokenService) { }

  ngOnInit() {
  }

  giveaway(){
    this.respMsg ="";

    if(this.validate()){

    
      this.tokenService.contactMe(this.name,this.emailId,this.message).subscribe(res=>{
        console.log(res)
this.respMsg ="Our team will contact you soon!!";
        if(res.success){
            this.isSuccess = true;
        }
      },err=>{
        console.log(err)
        this.respMsg ="Some error occurred please contact in sometime";

      });

    }
  }


  validate(): boolean {
    if (!this.name) {
      alert('Please enter your full name');
      return false;
    }
    if (!this.emailId) {
      alert('Please enter your email id');
      return false;
    }
    if (!this.message) {
      alert('Please enter some message');
      return false;
    }
    return true;
  }

}
