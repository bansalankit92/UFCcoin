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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DisplayComponent,
    TeamComponent,
    SignInComponent,
    BalanceOfComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting
  ],
  providers: [TokenService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
