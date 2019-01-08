import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { StartComponent } from './components/start/start.component';
import { RegisterComponent } from './components/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { ProveedoresComponent } from './components/Proveedores/Proveedores.component';
import { AuthGuard } from './guards/auth.guard';
import { ControlComponent } from './components/control/control.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { ControlsalidaComponent } from './components/controlsalida/controlsalida.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AlimentadorComponent } from './components/alimentador/alimentador.component';
import { EntradasCTComponent } from './components/entradas-ct/entradas-ct.component';
import { SalidasCTComponent } from './components/salidas-ct/salidas-ct.component';
import { PedidosCTComponent } from './components/pedidos-ct/pedidos-ct.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AsignComponent } from './components/asign/asign.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ModalupdateComponent } from './components/modal/modalupdate/modalupdate.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  {path: 'start', component: StartComponent, canActivate: [AuthGuard]},  
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard]},
  {path: 'entradas', component: ControlComponent, canActivate: [AuthGuard]},
  {path: 'sucursal', component: SucursalComponent, canActivate: [AuthGuard]},
  {path: 'alimentador', component: AlimentadorComponent, canActivate: [AuthGuard]},
  {path: 'reportes', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: 'salidas', component: ControlsalidaComponent, canActivate: [AuthGuard]},
  {path: 'entradasCT', component: EntradasCTComponent, canActivate: [AuthGuard]},
  {path: 'salidasCT', component: SalidasCTComponent, canActivate: [AuthGuard]},
  {path: 'pedidosCT', component: PedidosCTComponent, canActivate: [AuthGuard]},
  {path: 'pedidos', component: PedidosComponent, canActivate: [AuthGuard]},
  {path: 'inventADMIN', component: AsignComponent, canActivate: [AuthGuard]},
  {path: 'registro', component: RegistroComponent, canActivate: [AuthGuard]},
  {path: 'modal', component: ModalupdateComponent, canActivate: [AuthGuard]},
  {path: '**', component: Page404Component},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
