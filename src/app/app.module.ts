import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from 'app/component/dashboard/dashboard.component';
import { DisplayComponent } from 'app/component/display/display.component';
import { TeamComponent } from './component/team/team.component';
import { AppRouting } from 'app/app.routing';
import { UtilService } from 'app/service/util.service';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { TokenService } from 'app/service/token.service';
import { BalanceOfComponent } from './component/balance-of/balance-of.component';
import { TransferComponent } from './component/transfer/transfer.component';
import { BuyTokenComponent } from './component/buy-token/buy-token.component';
import { SellTokenComponent } from './component/sell-token/sell-token.component';
import { GiveawayComponent } from './component/giveaway/giveaway.component';
import { HttpModule } from '@angular/http';
import { InvestorComponent } from './component/investor/investor.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DisplayComponent,
    TeamComponent,
    SignInComponent,
    BalanceOfComponent,
    TransferComponent,
    BuyTokenComponent,
    SellTokenComponent,
    GiveawayComponent,
    InvestorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    HttpModule
  ],
  providers: [TokenService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
