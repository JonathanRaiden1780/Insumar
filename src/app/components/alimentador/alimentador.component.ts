import { Component, OnInit } from '@angular/core';
import {SucursalInterface} from '../../Models/Sucursal';
import {AuthService} from '../../servicios/auth.service';
import {SucursalService} from '../../servicios/sucursal.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alimentador',
  templateUrl: './alimentador.component.html',
  styleUrls: ['./alimentador.component.css']
})
export class AlimentadorComponent implements OnInit {
  listadoSucursal: any;
  Sucursal: SucursalInterface = {
    
    idsucu: '',
    Sucursal: ''
    
  }
  constructor(private authService: AuthService,
    private sucursalService: SucursalService,
    private router: Router
  ) {
    this.listadoSucursal = this.sucursalService.getAllSucursal();
   }

  ngOnInit() {
  }
  onGuardarSucursal({value}: {value: SucursalInterface}){
    this.sucursalService.addSucursal(value);
    
  }
  faTruckLoading = faTruckLoading;
}
