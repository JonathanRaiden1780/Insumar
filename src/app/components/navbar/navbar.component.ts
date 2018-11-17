import { Component, OnInit } from '@angular/core';
import { faDolly } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../servicios/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogin: boolean;
  public  nombreUsusario: string;
  public  emailUser: string;
  constructor(
    public authService: AuthService,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe ( auth => {
      if(auth){
        this.isLogin=true;
        this.nombreUsusario = auth.displayName;
        this.emailUser=auth.email;
      }
      else{
        this.isLogin = false;
      }
    });    
  }

  onClickLogout(){
    this.authService.logout(),
    this.flashMensaje.show('Hasta luego',{
      cssClass: 'alert-success', timeout: 4000});
  }
  faDolly = faDolly;

}
