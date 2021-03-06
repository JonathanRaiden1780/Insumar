import { Component, OnInit, ViewChildren } from '@angular/core';

import { ProductoService } from 'src/app/servicios/producto.service';
import { SalidasService } from 'src/app/servicios/salidas.service';
import { ControlService } from 'src/app/servicios/control.service';
import { GetSucursalService, Sucursalinfo } from 'src/app/servicios/get-sucursal.service';

import { faTruckLoading, faBoxOpen, faBoxes, faInbox, faBox, faWarehouse } from '@fortawesome/free-solid-svg-icons';

import { AngularFirestore } from 'angularfire2/firestore';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  //  Iconoes
  faTruckLoading = faTruckLoading;
  faAsignaciones = faBoxes;
  faIngresa = faInbox;
  faBox = faBox;
  faBoxOpen = faBoxOpen;
  faWarehouse = faWarehouse;

  // Variables
  rows1: any;
  rows2: any;
  rows3: any;
  columns: any;

  listadoProductos: any;
  listadoControlen: any;
  listadoControlsa: any;

  _sucursalData: Sucursalinfo[] = [];

  _sucursalNames: any[] = [];
  _sucursalId: string;
  _sucusalrequest: boolean;

  @ViewChildren(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();
  getall = [];

  constructor(
    private productos: ProductoService,
    private salidas: SalidasService,
    private _getSucursal: GetSucursalService,
    private entradas: ControlService,
    private afs: AngularFirestore
  ) {
    this.listadoControlen = entradas.getAllCoentrada();
    this.listadoControlsa = salidas.getAllCosalida();
    this.listadoProductos = productos.getAllProducto();
   }

  ngOnInit() {
    this.getData1();
    this.getData2();
    this.getData3();
    this.getSucursalData();
    console.log( this._sucursalData );
    this.getSucursalNames();
    console.log( this._sucursalNames);
  }

  getSucursalData() {
    this._sucursalData = this._getSucursal.getDataSucursal();
  }
  getSucursalNames() {
    this._sucursalNames = this._getSucursal._sucursalNames;
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
    });
  }

  getData2() {
    this.afs.collection('Cosalidas/Centenario/salidas').valueChanges().subscribe((salidas) => {
      this.rows2 = salidas;
    });
  }

  getData3() {
    this.afs.collection('Productos').valueChanges().subscribe((Productos) => {
      this.rows3 = Productos;
    });
  }
}
