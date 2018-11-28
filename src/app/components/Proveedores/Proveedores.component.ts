import { Component, OnInit } from '@angular/core';
import {ProveedoresInterface} from '../../Models/Proveedores';
import {AuthService} from '../../servicios/auth.service';
import {ProveedorService} from '../../servicios/proveedor.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-Proveedor',
  templateUrl: './Proveedores.component.html',
  styleUrls: ['./Proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  
  Proveedor: ProveedoresInterface = {
    
    idprov: '',
    Nombre: ''
    
  }

  constructor(
    private authService: AuthService,
    private proveedorService: ProveedorService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onGuardarProveedor({value}: {value: ProveedoresInterface}){
    this.proveedorService.addProveedor(value);
    

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