// Importing Module
import { NgModule } from '@angular/core';
// Inbuild modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { CreateUserComponent } from './components/dashboard/create-user/create-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './common/header/header.component';
import { UserListComponent } from './components/dashboard/user-list/user-list.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    DashboardComponent,
    HeaderComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
