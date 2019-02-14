import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../servicios/auth.service';
import {  SalidasService} from 'src/app/servicios/salidas.service';
import { ControlSalidaInterface } from 'src/app/Models/ControlSalida';
import{ProductoService} from '../../servicios/producto.service'

import {ProductosInterface} from '../../Models/Productos';
import {Router} from '@angular/router';
import { AngularFirestore, validateEventsArray } from 'angularfire2/firestore';
import { inventarioInterface } from 'src/app/Models/inventario';
import { SucursalService } from 'src/app/servicios/sucursal.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SucursalInterface } from 'src/app/Models/Sucursal';
import { faDolly, faArchive, faWarehouse, faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  model: any = {};
  query: any;
  idProducto:string;
  listadoProductos: any;
  listadoSucursal: any;
  listadoControl: any;
  cantprod:number;
  cantprods:number;
  invent:number;
  cantprov:number;

  
  selecprod: inventarioInterface = {
    nombreprod: '',
    inventprod: 0
  }

  Producto: ProductosInterface = {
    
    idprov:'',
    cantidad: 0
  }
controlsalidas: ControlSalidaInterface = {
    
  id:'',
  cantidad: 0,
  producto: '',
  fecha: '',
  sucursal:''
  
}
 
  constructor(
    private authService: AuthService,
    public sucursal: SucursalService,
    public productos: ProductoService,
    private controlService: SalidasService,
    private router: Router,
    private afs: AngularFirestore,
    public flashMensaje: FlashMessagesService

  ){
    
    this.listadoSucursal = this.sucursal.getAllSucursal();
    this.listadoProductos = this.productos.getAllProducto();
    this.listadoControl = this.controlService.getAllCosalida();
    
    const today = new Date();
    this.model.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2); 
  }


  ngOnInit() {
   this.model.tipo = 'salida'; 
   
   
  }
  onChange(value){
    this.invent = this.query.cantidad;
    
    this.cantprods =sum(this.invent, this.cantprod);
    console.log(this.query.cantidad );
    console.log(this.cantprods);
    
    
    function sum(a:number , b:number):number{
      
      return a - b;
    }
    //this.cantprods = this.selecprod.inventprod + this.cantprod;
  }
  
  onGuardarSalida({value}: {value: ControlSalidaInterface}){
    
    if(this.cantprod > this.query.cantidad)
    { 
      this.flashMensaje.show('No hay suficiente producto',{
      cssClass: 'alert-danger', timeout: 4000});
    } 
    else
    {
      this.flashMensaje.show('Salida registrada exitosamente',{
        cssClass: 'alert-success', timeout: 4000});
      value.cantidad=this.cantprod;
      value.producto=this.query.Nombre;
      this.controlService.addCosalida(value);
    }
    
  }
  stock({value}: {value: ProductosInterface}){
  
    if(this.cantprod <= this.query.cantidad)
    { 
        value.Nombre = this.query.Nombre;
        value.idprov = this.query.Nombre;
        value.cantidad = this.cantprods;
        this.productos.updateProducto(value);
        
    }
  }
  sucursals({value}: {value: SucursalInterface}){
  
    if(this.cantprod <= this.query.cantidad)
    { 
        value.Id = this.controlsalidas.sucursal;
        value.sucursal = this.controlsalidas.sucursal;
        this.sucursal.updateSucursal(value);
      
    }
  }
  faDolly = faDolly;
  faArchive = faArchive;
  faBuilding = faBuilding;
  faWarehouse = faWarehouse;
}


