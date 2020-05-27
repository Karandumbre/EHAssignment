import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './components/dashboard/create-user/create-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}, {
  path: 'dashboard',
  component: DashboardComponent,
  children: [{
    path: 'register', component: CreateUserComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
