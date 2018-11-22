import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { StartComponent } from './components/start/start.component';
import { Page404Component } from './components/page404/page404.component';
import { ProveedoresComponent } from './components/Proveedores/Proveedores.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthService } from './servicios/auth.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';


import { environment} from '../environments/environment'
import { AuthGuard } from './guards/auth.guard';
import { CommonModule } from '@angular/common';

import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';
import { from } from 'rxjs';

import { SucursalComponent } from './components/sucursal/sucursal.component';
import { ControlComponent } from './components/control/control.component';
import { AutorizacionComponent } from './components/autorizacion/autorizacion.component';
import { ProductoService } from './servicios/producto.service';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    StartComponent,
    Page404Component,
    ProveedoresComponent,
    SucursalComponent,
    ControlComponent,
    AutorizacionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FlashMessagesModule
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService, ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
