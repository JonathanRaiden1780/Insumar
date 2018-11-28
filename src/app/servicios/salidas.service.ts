import { Injectable } from '@angular/core';
import {ControlSalidaInterface} from '../Models/ControlSalida';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalidasService {
  
  CosalidasCollection: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasDoc: AngularFirestoreDocument<ControlSalidaInterface>;
  Cosalidas: Observable<ControlSalidaInterface[]>;
  Cosalida: Observable<ControlSalidaInterface>;

  constructor() { }
}
