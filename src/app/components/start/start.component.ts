import { Component, OnInit } from '@angular/core';
import {ProductosInterface} from '../../Models/Productos';
import {AuthService} from '../../servicios/auth.service';
import {ProductoService} from '../../servicios/producto.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProveedorService} from '../../servicios/proveedor.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TitleCasePipe } from '@angular/common';
import { AngularFirestore } from 'angularfire2/firestore';
import { ControlService } from 'src/app/servicios/control.service';

@Component({
  selector: 'app-start',

  templateUrl: './start.component.html',

  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  //  iconos
  faTimes = faTimes;

  model: any = {};
  listadoProductos: any;
  listadotipo:any;

  rows:any;

  //variables
  codigo:string;
  producto:string;
  tipo:string
  tipos:any;
  categoria:string;


  constructor(
    private authService: AuthService,
    private productoService: ProductoService,
    private control: ControlService,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.listadoProductos = this.productoService.getAllProducto();
  

  }
  getData() {
    this.afs.collection('Productos').valueChanges().subscribe((Prod) => {
      this.rows = Prod;
    });
  }
  ngOnInit() {
    this.model.tipo = 'entrada';
    this.getData();
    //this.tipos= {};
  }
  onGuardarProducto({value}: {value: ProductosInterface}) {
   
    value.cantidad = 0;
    value.unidad = this.tipo;
    value.Nombre = this.producto;
    //value.categoria = this.categoria;
    console.log(value);
    this.productoService.addProducto(value);
 
  }
  DeleteProd(id: string){
    
    this.productoService.deleteProducto(id);

  }
  onChange(value:string){
    this.tipo = value;
  }
}
/*
  listadoProductos: Observable<any[]>;
  model: any = {};

  constructor(public productos: ProductoService) {
    this.listadoProductos = this.productos.mostrar();
  }

  ngOnInit() {
  }

  agregarProducto() {
    this.productos.agregar(this.model);
    this.model = {};
  }

  eliminarProducto(id) {
    this.productos.eliminar(id);
  }

  editarCantidadMinima(cantidad, id) {
    console.log(cantidad);
    console.log(id);
  }
  */
