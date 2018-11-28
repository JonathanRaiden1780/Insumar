import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../servicios/auth.service';
import { ControlService } from 'src/app/servicios/control.service';
import { ControlEntradaInterface } from 'src/app/Models/ControlEntrada';
import{ProductoService} from '../../servicios/producto.service'
import{ProveedorService} from '../../servicios/proveedor.service'
import {Router} from '@angular/router';
import { NgSelectOption, SelectControlValueAccessor } from '@angular/forms';
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  model: any = {};

  listadoProductos: any;
  listadoProveedores: any;
  listadoControl: any;
  selectprod:string;
  selectprov:string;

controlentradas: ControlEntradaInterface = {
    
  id:'',
  cantidad: '',
  producto: '',
  fecha: '',
  precio: '',
  proveedor: ''
  
}

  constructor(
    private authService: AuthService,
    public proveedores: ProveedorService,
    public productos: ProductoService,
    private controlService: ControlService,
    private router: Router
  ){
    
    this.listadoProveedores = this.proveedores.getAllProveedor();
    this.listadoProductos = this.productos.getAllProducto();
    this.listadoControl = this.controlService.getAllCoentrada();
    const today = new Date();
    this.model.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    
    
  }


  ngOnInit() {
   this.model.tipo = 'entrada'; 
  
  }

  
  onGuardarEntrada({value}: {value: ControlEntradaInterface}){
    this.controlService.addCoentrada(value);
    
    
  }
 
}
