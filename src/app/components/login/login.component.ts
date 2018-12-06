import { Component, OnInit } from '@angular/core';
import { faKey, faUser, faDolly, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../servicios/auth.service';
import {Router} from '@angular/router';

import {FormsModule} from '@angular/forms';

import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:string;
  public password:string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  faKey = faKey;
  faUser = faUser;
  faDolly = faDolly;
  faEnvelope = faEnvelope;

  onSubmitLogin(){
    this.authService.loginEmail(this.email,this.password)
    .then( (res) =>{
      this.flashMensaje.show('Isumar',
      {cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/home']);
    }).catch((err) => {
      this.flashMensaje.show(err.message,
      {cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['/login']);
    });
 }
}
