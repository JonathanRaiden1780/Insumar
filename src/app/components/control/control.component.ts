import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ControlService } from 'src/app/servicios/control.service';
import { ControlEntradaInterface } from 'src/app/Models/ControlEntrada';
import { ProductoService } from '../../servicios/producto.service';
import { ProveedorService } from '../../servicios/proveedor.service';
import { ProductosInterface } from '../../Models/Productos';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { inventarioInterface } from 'src/app/Models/inventario';
import { faDolly, faArchive, faEdit, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { stringify } from '@angular/core/src/util';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  faDolly = faDolly;
  faPlus = faPlus;
  faArchive = faArchive;
  faEdit = faEdit;
  faMinus = faMinus;

  select: boolean;

  constructor(

    private authService: AuthService,
    public proveedores: ProveedorService,
    public productos: ProductoService,
    private controlService: ControlService,
    private router: Router,
    private afs: AngularFirestore

  ) {

   
    this.listadoProductos = this.productos.getAllProducto();
   
    const today = new Date();
    this.model.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);


  }
  //variables 
idfacturas: string;
cantidades: number;
bandera:boolean;
codigo: string;
carrito: any = {
  idfactura: '',
  cantidad:0,
  codigo:'',
  producto:''

};
produc:string;
carritofinal= []; 
todolista:any;
contador:number;
//

  model: any = {};
  query: any;
  idProducto: string;
  listadoProductos: any;
  listadoProveedores: any;
  listadoControl: any;
  listadoPiezas: any;
  cantprod: number;
  cantprods: number;
  cantprodres: number;
  piezasu: string;
  invent: number;
  cantprov: number;

  selecprod: inventarioInterface = {
    nombreprod: '',
    inventprod: 0
  };
 /* Producto: ProductosInterface = {

    idprov: '',
    cantidad: 0
 };*/
  controlentradas: ControlEntradaInterface = {

  id: '',
  cantidad: 0,
  unidad: '',
  producto: '',
  fecha: '',
  factura: '',
  inventario: 0
  };
  nombre: string;
rows:any;
  public userUid: string = null;
  public isAdmin: any = null;
  idup: string;

  ngOnInit() {
    this.model.tipo = 'entrada';
//    this.getCurrentUser();
//this.carritofinal='';
this.contador=0;
this.bandera=true;
this.getData();

  }
  getData() {
    this.afs.collection('Coentradas').valueChanges().subscribe((Sucursal) => {
      this.rows = Sucursal;
    });
  }

 /* getAllCoentrada() {
    this.controlService.getAllCoentrada();

  }
*/
 /* eliminar(id: string, x: string) {
    const confirma = confirm('Esta seguro?');
    this.nombre = x;
    if (confirma) {
    console.log('eliminar registro ', id , x);
   this.controlService.deleteCoentrada( id );
  }
}*/

  onChange(value:number) {
    this.invent = this.query.cantidad;

    this.cantprods = sum(this.invent, value);


    console.log(this.query.cantidad );
    console.log(this.cantprods);


    function sum(a: number , b: number): number {

      return a + b;
    }

    // this.cantprods = this.selecprod.inventprod + this.cantprod;
  }

 onAgregar({value}: {value: ControlEntradaInterface}) {
  this.contador =this.carritofinal.length

   this.carrito.fecha = this.model.fecha;
   this.carrito.codigo= this.codigo;
   this.carrito.factura= this.idfacturas;
   this.carrito.cantidad = this.cantidades;
   this.carrito.producto = this.query.Nombre;
   this.carrito.numero= this.contador;
   
  // while(this.bandera=false){
    this.carritofinal.push(this.carrito);
   this.todolista=this.carritofinal;
   
 //  }
  this.carrito = {};
   this.contador++;
  console.log(this.carritofinal);
}
eliminar(num:number){
  
  this.carritofinal.splice(num,1);
  this.carritofinal.map(function(dato){
    if(dato.numero != 0 ){
      dato.numero = 0;
    }
    return dato;
  });
  
}

 onGuardarEntrada() {

    //this.onChange(this.todolista.cantidad);
    
    for(var i=0; i<=this.contador ; i++ ){
      this.carrito = this.carritofinal[i];
      this.controlService.addCoentrada(this.carrito);
      this.onChange(this.carrito.cantidad);
     // this.stock(p);
      this.carrito = {};
    }
    
    
  }
  /*
  getCurrentUser() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.email;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.admin).hasOwnProperty('admin');
          // this.isAdmin = true;
        });
      }
    });
  }
  updatestock(value: ProductosInterface) {
    value.Nombre = this.nombre;
    value.idprov = this.nombre;
    value.cantidad = this.cantprodres;
    value.inventario = this.cantprodres;
    this.productos.updateProducto(value);
  }
  
 stock(value: ProductosInterface) {
    value.Nombre = this.query.Nombre;
    value.idprov = this.query.Nombre;
    value.cantidad = this.cantprods;
    value.inventario = this.cantprods;
    this.productos.updateProducto(value);
  } 
  
  getforupdate(x: ControlEntradaInterface) {

    console.log(x);
    this.controlService.coentra = Object.assign({}, x);
    this.controlService.update(x);

  }
  getcantidad(x: number, y: number) {
    this.invent = y;
    this.cantidadregistrada = x;
    this.cantprodres = res(this.invent, this.cantidadregistrada);
    function res(a: number , b: number): number {

      return a - b;
    }

  }
  */
  Agrega( type: string ) {
    if ( type === 'producto') {
      this.select = true;
    }
    if ( type === 'sucursal') {
      this.select = false;
    }
  }


}
