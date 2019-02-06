import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { faDolly, faBoxes, faShareAltSquare, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/servicios/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-entradas-ct',
  templateUrl: './entradas-ct.component.html',
  styleUrls: ['./entradas-ct.component.css']
})
export class EntradasCTComponent implements OnInit {

  // Iconos
  faDolly = faDolly;
  faBoxes = faBoxes;
  faRequest = faShareAltSquare;
  faCheck = faCheck;
  faTimes = faTimes;

  // Variables

  show: boolean;
  show2: boolean;

  rows: any;
  columns: any;

  public isLogin: boolean;
  public  nombreUsusario: string;
  public  emailUser: string;
  sucursals: any;

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService
    ) {}

  getData() {
    this.afs.collection('Cosalidas/' + this.sucursals + '/salidas').valueChanges().subscribe((Productos) => {
      this.rows = Productos;
    });
  }

  ngOnInit() {
    this.getAuth();
    this.getData();
  }

 getAuth() {
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
    this.afs.collection('Registro').doc(x).valueChanges().pipe(take(1)).subscribe(res => {
      this.arrass(res);
    });
  }
  arrass(x: RegistroInterface): string {
    this.sucursals = x.sucursal;
    console.log(this.sucursals);
    return this.sucursals;
  }
}
