import { Component, OnInit } from '@angular/core';
import { faDolly } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../servicios/auth.service';

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
    public authService: AuthService
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
    this.authService.logout();
  }
  faDolly = faDolly;

}
