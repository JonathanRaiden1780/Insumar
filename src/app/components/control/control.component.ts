import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../servicios/auth.service';
import { ControlService } from 'src/app/servicios/control.service';
import { ControlEntradaInterface } from 'src/app/Models/ControlEntrada';
import{ProductoService} from '../../servicios/producto.service'
import{ProveedorService} from '../../servicios/proveedor.service'
import {ProductosInterface} from '../../Models/Productos';
import {Router} from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  model: any = {};
  query: any;
  idProducto:string;
  listadoProductos: any;
  listadoProveedores: any;
  listadoControl: any;
  cantprod:number;
  cantprods:number;
  invent:number;
  cantprov:number;
  selecprod:string;
  

  Producto: ProductosInterface = {
    
    idprov:'',
    cantidad: 0
  }
controlentradas: ControlEntradaInterface = {
    
  id:'',
  cantidad: 0,
  producto: '',
  fecha: '',
  precio: '',
  proveedor: '',
  inventario: 0
}

  constructor(
    private authService: AuthService,
    public proveedores: ProveedorService,
    public productos: ProductoService,
    private controlService: ControlService,
    private router: Router,
    private afs: AngularFirestore

  ){
    
    this.listadoProveedores = this.proveedores.getAllProveedor();
    this.listadoProductos = this.productos.getAllProducto();
    this.listadoControl = this.controlService.getAllCoentrada();
    this.query = this.productos.getOneProducto(this.selecprod)
    const today = new Date();
    this.model.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    
    
  }


  ngOnInit() {
   this.model.tipo = 'entrada'; 
   this.cantprods = this.invent + this.cantprod;
  }
  getid(){
    
  }
  
  onGuardarEntrada({value}: {value: ControlEntradaInterface}){
    value.cantidad=this.cantprod;
    value.producto=this.selecprod;
    value.inventario=this.cantprods;
    this.controlService.addCoentrada(value);
  }
  stock({value}: {value: ProductosInterface}){
    value.Nombre = this.selecprod;
    value.idprov = this.selecprod;
    value.cantidad = this.cantprods;
    this.productos.updateProducto(value);
  }
}
