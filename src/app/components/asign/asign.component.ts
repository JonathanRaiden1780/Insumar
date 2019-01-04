import { Component, OnInit, ViewChildren} from '@angular/core';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ProductoService } from '../../servicios/producto.service'
import { faBoxes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  styleUrls: ['./asign.component.css']
})
export class AsignComponent implements OnInit {

  faBoxes = faBoxes;

  listadoProductos: any;

  @ViewChildren(DataTableDirective)
  dtElements: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  getall = [];

  constructor(public productos: ProductoService) { 
    this.listadoProductos = this.productos.getAllProducto();
  }

  ngOnInit(){
    this.getAllProducto()
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

  getAllProducto() {
    this.productos.getAllProducto();
  }
  
}
