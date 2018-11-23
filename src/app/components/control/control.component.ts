import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { ControlService } from '../../servicios/control.service';
//import { ProveedoresService } from '../../servicios/control.service';
//import { ProductosService } from '../../servicios/control.service';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  listadoProveedores: any;
  listadoProductos: any;
  listadocontrol: any;
  seleccionadoEntrada = false;
  seleccionadoSalida = false;

  model: any = {};

  constructor(
    
    //public proveedores: ProveedoresService,
    //public productos: ProductosService,
    public control: ControlService) {
   
    //this.listadoProductos = this.productos.mostrar();
   // this.listadoProveedores = this.proveedores.mostrar();
    this.listadocontrol = this.control.mostrar();
    const today = new Date();
    this.model.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }

  ngOnInit() {
  }
  /*
  agregarEntrada() {
    this.model.producto = this.model.producto.payload.val();
    if (this.seleccionadoSalida) {
      this.model.persona = this.model.persona.payload.val();
    }
    if (this.seleccionadoEntrada) {
      this.model.proveedor = this.model.proveedor.payload.val();
    }
    debugger;
    this.kardex.agregar(this.model);
  }
*/
  seleccionarEntrada() {
    this.seleccionadoEntrada = true;
    this.seleccionadoSalida = false;
    this.model.tipo = 'entrada';
  }

  seleccionarSalida() {
    this.seleccionadoEntrada = false;
    this.seleccionadoSalida = true;
    this.model.tipo = 'salida';
  }

  eliminarEntrada(id) {
    this.control.eliminar(id);
  }


}
