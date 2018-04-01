
import {AppComponent} from './app.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';


const appRoutes: Routes = [{
    path: '',
    component: DashboardComponent
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: '**', redirectTo: '/'

  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    useHash: true
  })],
  exports: [RouterModule],

})
export class AppRouting {}
