import { Component, OnInit } from '@angular/core';
import {ProductosInterface} from '../../Models/Productos';
import {AuthService} from '../../servicios/auth.service';
import {ProductoService} from '../../servicios/producto.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  Producto: ProductosInterface = {
    cantidad: '',
    descripcion: '',
    idprod: '',
    categoria: '',
    proveedor: ''
  }

  constructor(
    private authService: AuthService,
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onGuardarProducto({value}: {value: ProductosInterface}){
    this.productoService.addProducto(value);
    this.router.navigate(['/']);
  }

}
