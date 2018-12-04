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

  constructor(
    private afs: AngularFirestore) {
      this.CosalidasCollection = this.afs.collection('Cosalidas', ref => ref);
     }

    deleteCosalida(Cosalida: ControlSalidaInterface){
      this.CosalidasDoc = this.afs.doc('Cosalidas/${Cosalida.id}');
      this.CosalidasDoc.delete();
    }
     updateCosalida(Cosalida: ControlSalidaInterface){
        this.CosalidasDoc=this.afs.doc('Cosalidas/${Cosalida.id}');
        this.CosalidasDoc.update(Cosalida);
      }

    addCosalida(Cosalida: ControlSalidaInterface){
      this.CosalidasCollection.add(Cosalida);
    }
    getOneCosalida(id: string){
      this.CosalidasDoc = this.afs.doc<ControlSalidaInterface>('Cosalidas/${id}');
      this.Cosalida = this.CosalidasDoc.snapshotChanges().pipe(map(action =>{
        if(action.payload.exists === false){
          return null;
        }else{
          const data = action.payload.data() as ControlSalidaInterface;
          data.id = action.payload.id;

        }
      }));
    }

    getAllCosalida():Observable<ControlSalidaInterface[]>{
      this.Cosalidas = this.CosalidasCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlSalidaInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
      return this.Cosalidas;
    };
  }

