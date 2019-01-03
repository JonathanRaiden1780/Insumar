import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ControlService } from 'src/app/servicios/control.service';
import { ControlEntradaInterface } from 'src/app/Models/ControlEntrada';
import { ProductoService } from '../../servicios/producto.service'
import{ ProveedorService } from '../../servicios/proveedor.service'
import { ProductosInterface } from '../../Models/Productos';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { inventarioInterface } from 'src/app/Models/inventario';
import { faDolly, faArchive, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';


import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import {map} from 'rxjs/operators';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit, OnDestroy, AfterViewInit{

  faDolly = faDolly;
  faArchive = faArchive;
  faEdit = faEdit;
  faTimes = faTimes;

  @ViewChildren(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  getall = [];

  
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

  selecprod: inventarioInterface = {
    nombreprod: '',
    inventprod: 0
  }
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

    const today = new Date();
    this.model.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    
    
  }

  ngOnInit(){
    this.model.tipo = 'entrada'; 

    this.getAllCoentrada()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      processing: true,
      scrollY: "100px",
      paging: true,
      search: true,
      scrollCollapse: true,
      

    };
  }

  getAllCoentrada() {
    this.controlService.getAllCoentrada();
  }

  onChange(value){
    this.invent = this.query.cantidad;
    
    this.cantprods =sum(this.invent, this.cantprod);
    console.log(this.query.cantidad );
    console.log(this.cantprods);
    
    
    function sum(a:number , b:number):number{
      
      return a + b;
    }
    //this.cantprods = this.selecprod.inventprod + this.cantprod;
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
    });
  }
  
  onGuardarEntrada({value}: {value: ControlEntradaInterface}){

    value.cantidad=this.cantprod;
    value.producto=this.query.Nombre;
    value.inventario=this.cantprods
    
    this.controlService.addCoentrada(value);
  }
  stock({value}: {value: ProductosInterface}){
    value.Nombre = this.query.Nombre;
    value.idprov = this.query.Nombre;
    value.cantidad = this.cantprods;
    this.productos.updateProducto(value);
  }

}
