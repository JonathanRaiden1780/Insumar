import { Component, OnInit } from '@angular/core';
import {SucursalInterface} from '../../Models/Sucursal';
import {AuthService} from '../../servicios/auth.service';
import {SucursalService} from '../../servicios/sucursal.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  
  Sucursal: SucursalInterface = {
    
    idsucu: '',
    Sucursal: ''
    
  }
  constructor(private authService: AuthService,
    private sucursalService: SucursalService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onGuardarSucursal({value}: {value: SucursalInterface}){
    this.sucursalService.addSucursal(value);
    this.router.navigate(['/']);
  }
}
