import { Component, OnInit } from '@angular/core';
import {ProductosInterface} from '../../Models/Productos';
import {AuthService} from '../../servicios/auth.service';
import {ProductoService} from '../../servicios/producto.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import{ProveedorService} from '../../servicios/proveedor.service'
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  model: any = {};
  listadoProveedores: any;
  Producto: ProductosInterface = {
    
    Nombre: '',
    categoria: '',
    cantidad:0    
  }

  constructor(
    private authService: AuthService,
    private productoService: ProductoService,
    public proveedores: ProveedorService,
    private router: Router
  ) { 
    this.listadoProveedores = this.proveedores.getAllProveedor();
  }

  ngOnInit() {
    this.model.tipo = 'entrada'; 
  }
  onGuardarProducto({value}: {value: ProductosInterface}){
    value.cantidad=0;
    value.idprov = value.Nombre;
    
    this.productoService.addProducto(value);
    
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