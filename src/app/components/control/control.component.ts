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

import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { stringify } from '@angular/core/src/util';

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
  dtElements: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  getall = [];
  cantidadregistrada: number;
  
  model: any = {};
  query: any;
  idProducto:string;
  listadoProductos: any;
  listadoProveedores: any;
  listadoControl: any;
  listadoPiezas: any;
  cantprod:number;
  cantprods:number;
  cantprodres: number;
  piezasu:string;
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
  pieza:'',
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
    this.listadoPiezas = this.controlService.gettipo();
    const today = new Date();
    this.model.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    
    
  }
  nombre:string;

  ngOnInit(){
    this.model.tipo = 'entrada'; 
    this.getCurrentUser();

    this.getAllCoentrada()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      processing: true,
      scrollY: "100px",
      paging: true,
      search: true,
      scrollCollapse: true
    };
  }

  getAllCoentrada() {
    this.controlService.getAllCoentrada();

  }

  eliminar(id: string, x:string){
    const confirma = confirm('Esta seguro?')
    this.nombre = x;
    if(confirma){
    console.log('eliminar registro ',id , x)
   this.controlService.deleteCoentrada( id );
  }
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
    this.dtElements.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
    });
  }
  
  onGuardarEntrada({value}: {value: ControlEntradaInterface}){

    value.cantidad=this.cantprod;
    value.producto=this.query.Nombre;
    value.inventario=this.cantprods;
    value.pieza = this.piezasu;
    this.controlService.addCoentrada(value);
    this.stock(value);
  }
 
  public userUid: string = null;
  public isAdmin: any = null;
  getCurrentUser() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.email;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.admin).hasOwnProperty('admin');
          // this.isAdmin = true;
        })
      }
    })
  }
  updatestock(value: ProductosInterface){
    value.Nombre = this.nombre;
    value.idprov = this.nombre;
    value.cantidad = this.cantprodres;
    value.inventario = this.cantprodres;
    this.productos.updateProducto(value);
  }
  stock(value: ProductosInterface){
    value.Nombre = this.query.Nombre;
    value.idprov = this.query.Nombre;
    value.cantidad = this.cantprods;
    value.inventario = this.cantprods;
    this.productos.updateProducto(value);
  }
  idup:string;
  getforupdate(x : ControlEntradaInterface){
    
    console.log(x);
    this.controlService.coentra = Object.assign({},x);
    this.controlService.update(x);
      
  }
  getcantidad(x : number, y:number){ 
    this.invent = y;
    this.cantidadregistrada = x;
    this.cantprodres =res(this.invent, this.cantidadregistrada);
    function res(a:number , b:number):number{
      
      return a - b;
    }

  }


}
