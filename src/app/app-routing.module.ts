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



const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'start', component: StartComponent, canActivate: [AuthGuard]},  
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'Proveedores', component: ProveedoresComponent, canActivate: [AuthGuard]},
  {path: 'Control', component: ControlComponent, canActivate: [AuthGuard]},
  {path: '**', component: Page404Component},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
