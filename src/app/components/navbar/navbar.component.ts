import { Component, OnInit } from '@angular/core';
import { faDolly, faSignInAlt, faSignOutAlt, faPeopleCarry, faHome, faBox, faBoxOpen, faChartArea, faWarehouse, faTruckLoading, faBoxes } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../servicios/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages'
import { AngularFirestore } from 'angularfire2/firestore';

import { take } from 'rxjs/operators';
import { RegistroInterface } from 'src/app/Models/registro';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  faDolly = faDolly;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faPeopleCarry = faPeopleCarry;
  faHome = faHome;
  faBox = faBox;
  faBoxOpen= faBoxOpen;
  faChartArea = faChartArea;
  faWarehouse = faWarehouse;
  faTruckLoading = faTruckLoading;
  faBoxes = faBoxes;


  public isLogin: boolean;
  public  nombreUsusario: string;
  public  emailUser: string;
  constructor(
    public authService: AuthService,
    private afs: AngularFirestore,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe ( auth => {
      if(auth){
        this.isLogin=true;
        this.nombreUsusario = auth.displayName;
        this.emailUser=auth.email;
        this.nombreusuaro(this.emailUser);
      }
      else{
        this.isLogin = false;
      }
    });    
  }
  nomUsuario: any;
  nombreusuaro(x:string){
    
    this.afs.collection('Registro').doc(x).valueChanges().pipe(take(1)).subscribe(res => {this.arrass(res)} );
    //this.AuthService.getUser(this.emailUsuario);
    
  }
  arrass(x: RegistroInterface): string {
    
     this.nomUsuario= x.nombre;
    
   // console.log(x.nombre);
    //console.log(this.nomUsuario);
    
  
   return this.nomUsuario;
  
  }
  

  onClickLogout(){
    this.authService.logout(),
    this.flashMensaje.show('Hasta luego',{
      cssClass: 'alert-success', timeout: 4000});
  }


}
