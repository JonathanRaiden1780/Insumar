import { Component, OnInit} from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { faDolly, faBoxes, faTruckLoading, faCheck, faShareSquare, faTimes, faBuilding, faWarehouse, faHandHolding } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/servicios/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  styleUrls: ['./asign.component.css']
})
export class AsignComponent implements OnInit {

  // Iconos
  faBuilding = faBuilding;
  faDolly = faDolly;
  faBoxes = faBoxes;
  faTruckLoading = faTruckLoading;
  faCheck = faCheck;
  faShareSquare = faShareSquare;
  faTimes = faTimes;
  faWarehouse = faWarehouse;
  faHandHolding = faHandHolding;

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService
    ) {
  }

  rows: any;
  columns: any;

  public isLogin: boolean;
  public  nombreUsusario: string;
  public  emailUser: string;
  sucursals: any;

  getSucursal( sucursal: string ) {

  }
  getSucursal2( sucursal2: string ) {

  }

  getData() {
    this.afs.collection('Productos').valueChanges().subscribe((Productos) => {
      this.rows = Productos;
    });
  }

  ngOnInit() {

    this.authService.getAuth().subscribe ( auth => {
      if (auth) {
        this.isLogin = true;
        this.nombreUsusario = auth.displayName;
        this.emailUser = auth.email;
        this.nombreusuaro(this.emailUser);

      } else {
        this.isLogin = false;
      }
    });
  }
  nombreusuaro(x: string) {

    this.afs.collection('Registro').doc(x).valueChanges().pipe(take(1)).subscribe(res => {this.arrass(res); } );
    // this.AuthService.getUser(this.emailUsuario);


  }
  arrass(x: RegistroInterface): string {
    this.sucursals = x.sucursal;
    this.getData();
    console.log(this.sucursals);
    return this.sucursals;
  }


}
