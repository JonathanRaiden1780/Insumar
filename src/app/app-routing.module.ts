import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { StartComponent } from './components/start/start.component';
import { RegisterComponent } from './components/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { ProveedoresComponent } from './components/Proveedores/Proveedores.component';



const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'start', component: StartComponent},  
  {path: 'register', component: RegisterComponent},
  {path: 'Proveedores', component: ProveedoresComponent},
  {path: '**', component: Page404Component},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
