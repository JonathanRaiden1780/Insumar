import { Component, OnInit } from '@angular/core';
import { faKey, faUser, faDolly } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../servicios/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

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
    public router: Router
  ) { }

  ngOnInit() {
  }

  faKey = faKey;
  faUser = faUser;
  faDolly = faDolly;

  onSubmitLogin(){
    this.authService.loginEmail(this.email,this.password)
    .then( (res) =>{
      this.router.navigate(['/register']);
    }).catch((err)=>{
      console.log(err);
    });
 }
}
