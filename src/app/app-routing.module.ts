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



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomePageComponent },
  {path: 'login', component: LoginComponent},
  {path: 'start', component: StartComponent, canActivate: [AuthGuard]},  
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard]},
  {path: 'control', component: ControlComponent, canActivate: [AuthGuard]},
  {path: 'sucursal', component: SucursalComponent, canActivate: [AuthGuard]},
  {path: 'reportes', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: 'salidas', component: ControlsalidaComponent, canActivate: [AuthGuard]},
  {path: '**', component: Page404Component},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
