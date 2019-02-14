import { Component, OnInit } from '@angular/core';
import {SucursalInterface} from '../../Models/Sucursal';
import {AuthService} from '../../servicios/auth.service';
import {SucursalService} from '../../servicios/sucursal.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-alimentador',
  templateUrl: './alimentador.component.html',
  styleUrls: ['./alimentador.component.css']
})
export class AlimentadorComponent implements OnInit {

  faTruckLoading = faTruckLoading;

  listadoSucursal: any;
  Sucursal: SucursalInterface = {

    Id: '',
    sucursal: '',
    Rol: ''

  };
  tipo:string;
  rows:any;
  constructor(private authService: AuthService,
    private sucursalService: SucursalService,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.listadoSucursal = this.sucursalService.getAllSucursal();
   }
   getData() {
    this.afs.collection('Sucursales').valueChanges().subscribe((Sucursal) => {
      this.rows = Sucursal;
    });
  }
  ngOnInit() {
    this.getData();
  }
  onGuardarSucursal({value}: {value: SucursalInterface}) {
   value.Rol = this.tipo;
   console.log(value);
    this.sucursalService.addSucursal(value);

  }
  onChange(value:string){
    this.tipo = value;
  }

}
