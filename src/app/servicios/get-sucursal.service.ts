import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetSucursalService {

  // Variables
    private _sucursalInfo: Sucursalinfo[] = [
      {
        idsucursal: 'PAT001',
        sucursalname: 'Patriotismo',
        pedido: true
      },
      {
        idsucursal: 'PAT002',
        sucursalname: 'Patriotismo Coorporativo',
        pedido: false
      },
      {
        idsucursal: 'PAT003',
        sucursalname: 'Patriotismo Taller',
        pedido: true
      },
      {
        idsucursal: 'PAT004',
        sucursalname: 'Patriotismo Sarto',
        pedido: false
      }
    ];

    _sucursalNames: any[] = [];

  constructor(
    private afs: AngularFirestore
  ) {
    console.log('getSucursal inicializado');
    this._alimentarSucursales();
  }

  _alimentarSucursales() {

  }
  getDataSucursal() {
    return this._sucursalInfo;
  }
  getIdSucursal() {
    return this._sucursalInfo[0].idsucursal;
  }
  getStatusPedido() {
    return this._sucursalInfo[0].pedido;
  }
}

export interface Sucursalinfo {
  idsucursal: string;
  sucursalname: string;
  pedido: boolean;
}
