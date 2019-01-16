import { Component, OnInit, ViewChildren } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SalidasService } from 'src/app/servicios/salidas.service';
import { ControlService } from 'src/app/servicios/control.service';
import { faTruckLoading, faBoxOpen, faBoxes, faInbox, faBox } from '@fortawesome/free-solid-svg-icons';

import { AngularFirestore } from 'angularfire2/firestore';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  faTruckLoading = faTruckLoading;
  faAsignaciones = faBoxes;
  faIngresa = faInbox;
  faBox = faBox;

  rows1: any;
  rows2: any;
  rows3: any;
  columns: any;

  listadoProductos: any;
  listadoControlen: any;
  listadoControlsa: any;

  @ViewChildren(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();
  getall = [];

  constructor(
    private productos: ProductoService,
    private salidas: SalidasService,
    private entradas: ControlService,
    private afs: AngularFirestore
  ){
    this.listadoControlen = entradas.getAllCoentrada();
    this.listadoControlsa = salidas.getAllCosalida();
    this.listadoProductos = productos.getAllProducto();
   }

  ngOnInit() {
    this.getData1()
    this.getData2()
    this.getData3()

    this.getAllentrada()
    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      pageLength: 2,
      processing: true,
      scrollY: "100px",
      paging: true,
      search: true,
      scrollCollapse: true
    };
    this.getAllsalidas()
    this.dtOptions[1] = {
      pagingType: 'full_numbers',
      pageLength: 2,
      processing: true,
      scrollY: "100px",
      paging: true,
      search: true,
      scrollCollapse: true
    };
  }

  getAllentrada() {
    this.entradas.getAllCoentrada();
  }

  getAllsalidas() {
    this.salidas.getAllCosalida();
  }

  getData1() {
    this.afs.collection('Coentradas').valueChanges().subscribe((Coentradas) => {
      this.rows1 = Coentradas;
    })
  }
  
  getData2() {
    this.afs.collection('Cosalidas/Centenario/salidas').valueChanges().subscribe((salidas) => { //falla en la coleccion REVISAR
      this.rows2 = salidas;
    })
  }

  getData3() {
    this.afs.collection('Productos').valueChanges().subscribe((Productos) => { 
      this.rows3 = Productos;
    })
  }
}
