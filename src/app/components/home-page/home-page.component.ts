import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SalidasService } from 'src/app/servicios/salidas.service';
import { ControlService } from 'src/app/servicios/control.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  listadoProductos: any;
  listadoControlen: any;
  listadoControlsa: any;

  constructor(
    private productos: ProductoService,
    private salidas: SalidasService,
    private entradas: ControlService
  ){
    this.listadoControlen = entradas.getAllCoentrada();
    this.listadoControlsa = salidas.getAllCosalida();
    this.listadoProductos = productos.getAllProducto();
   }

  ngOnInit() {
  }

}
