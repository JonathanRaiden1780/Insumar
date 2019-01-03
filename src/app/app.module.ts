import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MatFormFieldModule, MatIconModule, MatNativeDateModule, MatCheckboxModule, MatRadioModule, MatOptionModule, MatSelectModule } from '@angular/material';

import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ProveedorService } from './servicios/proveedor.service';
import { SucursalService } from './servicios/sucursal.service';
import { ControlService } from './servicios/control.service';
import { ControlsalidaComponent } from './components/controlsalida/controlsalida.component';
import { SalidasService } from './servicios/salidas.service';
import { ReportsComponent } from './components/reports/reports.component';
import { AlimentadorComponent } from './components/alimentador/alimentador.component';
import { EntradasCTComponent } from './components/entradas-ct/entradas-ct.component';
import { SalidasCTComponent } from './components/salidas-ct/salidas-ct.component';
import { PedidosCTComponent } from './components/pedidos-ct/pedidos-ct.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AsignComponent } from './components/asign/asign.component';


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
    AutorizacionComponent,
    ControlsalidaComponent,
    ReportsComponent,
    AlimentadorComponent,
    EntradasCTComponent,
    SalidasCTComponent,
    PedidosCTComponent,
    PedidosComponent,
    AsignComponent
  ],
  imports: [
    NgxDatatableModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatNativeDateModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    DataTablesModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService, ProductoService, 
    ProveedorService, SucursalService, ControlService, SalidasService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);