import { Component, OnInit, Input } from '@angular/core';
import {Observable, concat} from 'rxjs';
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
import { faDolly, faArchive, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ControlService } from 'src/app/servicios/control.service';

@Component({
  selector: 'app-controlsalida',
  templateUrl: './controlsalida.component.html',
  styleUrls: ['./controlsalida.component.css']
  
})
export class ControlsalidaComponent implements OnInit {
  
  faTimes = faTimes;
  faEdit = faEdit;

  model: any = {};
  query: any;
  idProducto:string;
  listadoProductos: any;
  listadoSucursal: any;
  listadoControl: any;
  listadoControl1: any;
  listadoControl2: any;
  listadoControl3: any;
  listadoControl4: any;
  listadoControl5: any;
  listadoControl6: any;
  listadoControl7: any;
  listadoControl8: any;
  listadoControlgen: any;
  cantprod:number;
  cantprods:number;
  invent:number;
  cantprov:number;
  sucursales:string;
  act:ProductosInterface  = {
    idprov:'',
    Nombre: '',
    cantidad: 0,
  
  }
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
    private controleService: ControlService,
    private router: Router,
    private afs: AngularFirestore,
    public flashMensaje: FlashMessagesService

  ){
    
    this.listadoSucursal = this.sucursal.getAllSucursal();
    this.listadoControlgen = this.controlService.getAllCosalidagen();
    this.listadoProductos = this.productos.getAllProducto();
    this.listadoControl = this.controlService.getAllCosalida();
    this.listadoControl1 = this.controlService.getAllCosalidavig();
    this.listadoControl2 = this.controlService.getAllCosalidapat();
    this.listadoControl3 = this.controlService.getAllCosalidacor();
    this.listadoControl4 = this.controlService.getAllCosalidatln();
    this.listadoControl5 = this.controlService.getAllCosalidatla();
    this.listadoControl6 = this.controlService.getAllCosalidator();
    this.listadoControl7 = this.controlService.getAllCosalidaval();
    this.listadoControl8 = this.controlService.getAllCosalidacoa();
    
    const today = new Date();
    this.model.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2); 
  }


  ngOnInit() {
   this.model.tipo = 'salida'; 
   
   
  }
  eliminar(id: string, sucu: string){
    const confirma = confirm('Esta seguro?')
    if(confirma){
    console.log('eliminar registro ',id, sucu)
    this.controlService.deleteCosalida( id, sucu );
  }
}
cantidadregistrada: number;
cantprodres: number;
getcantidad(x : number){
  this.invent = this.query.cantidad;
  this.cantidadregistrada = x;
  this.cantprodres =res(this.invent, this.cantidadregistrada);
  function res(a:number , b:number):number{
    
    return a + b;
  }

}
  onChange(value){
    this.invent = this.query.cantidad;
    
    this.cantprods =sum(this.invent, this.cantprod);
    console.log(this.query.cantidad );
    console.log(this.cantprods);
    //this.act.idprov  = this.query.Nombre;
    console.log(this.query.idprov , this.query.Nombre)
    this.act.Nombre  = this.query.Nombre;
    this.act.cantidad  = this.cantprods; 
    
    function sum(a:number , b:number):number{
      
      return a - b;
    }
    //this.cantprods = this.selecprod.inventprod + this.cantprod;
  }
  
  onGuardarSalida({value}: {value: ControlSalidaInterface}){

    
    this.stock(this.act);

    this.controlService.llamarsu(this.sucursales);
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
      value.id = this.query.Nombre;
      value.sucursal = this.sucursales;
      this.controlService.addCosalida(value);
    }

    
  }
  stock( value: ProductosInterface){
  
    value.idprov = this.query.Nombre;
        this.productos.updateProducto(value);
        
   
  }
  /*sucursals({value}: {value: SucursalInterface}){
  
    if(this.cantprod <= this.query.cantidad)
    { 
      //  value.idsucu = this.controlsalidas.sucursal;
     //   value.Sucursal = this.controlsalidas.sucursal;
     //   this.sucursal.updateSucursal(value);
      // creo ya no sirve el metodo desde que se guarda en la ccoleccion de subcoleccion
    }
  }*/
  updatestock({value}: {value: ProductosInterface}){
    value.Nombre = this.query.Nombre;
    value.idprov = this.query.Nombre;
    value.cantidad = this.cantprodres;
    
    this.productos.updateProducto(value);
  }
  faDolly = faDolly;
  faArchive = faArchive;
}
