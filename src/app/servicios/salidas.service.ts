import { Injectable, EventEmitter } from '@angular/core';
import {ControlSalidaInterface} from '../Models/ControlSalida';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map, combineLatest} from 'rxjs/operators';
import {Observable, concat} from 'rxjs';
import { ControlsalidaComponent } from '../components/controlsalida/controlsalida.component';




@Injectable({
  providedIn: 'root'
  
}) 
export class SalidasService {
  
  CosalidasCollection: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasCollectioncen: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasCollectioncoa: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasCollectionvig: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasCollectionpat: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasCollectioncor: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasCollectiontln: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasCollectiontla: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasCollectiontor: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasCollectionval: AngularFirestoreCollection<ControlSalidaInterface>;
  CosalidasDoc: AngularFirestoreDocument<ControlSalidaInterface>;
  Cosalidas: Observable<ControlSalidaInterface[]>;
  Cosalida: Observable<ControlSalidaInterface>;
  sucursaless:string;
  constructor(
    private afs: AngularFirestore
    ) {
      
      
      this.CosalidasCollectioncoa = this.afs.collection('Cosalidas').doc('Coacalco').collection('salidas', ref => ref);  
      this.CosalidasCollectioncen = this.afs.collection('Cosalidas').doc('Centenario').collection('salidas', ref => ref);
      this.CosalidasCollectionvig = this.afs.collection('Cosalidas').doc('La Viga').collection('salidas', ref => ref);
      this.CosalidasCollectionpat = this.afs.collection('Cosalidas').doc('Patriotismo').collection('salidas', ref => ref);
      this.CosalidasCollectioncor = this.afs.collection('Cosalidas').doc('Patriotismo Corporativo').collection('salidas', ref => ref);
      this.CosalidasCollectiontln = this.afs.collection('Cosalidas').doc('Tlalnepantla').collection('salidas', ref => ref);
      this.CosalidasCollectiontla = this.afs.collection('Cosalidas').doc('Tlalpan').collection('salidas', ref => ref);
      this.CosalidasCollectiontor = this.afs.collection('Cosalidas').doc('Torre de Control').collection('salidas', ref => ref);
      this.CosalidasCollectionval = this.afs.collection('Cosalidas').doc('Vallejo').collection('salidas', ref => ref);

     }
     llamarsu(x: string){
       this.sucursaless = x;
      console.log(this.sucursaless)
      this.CosalidasCollection = this.afs.collection('Cosalidas').doc(this.sucursaless).collection('salidas', ref => ref);
      
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
      this.CosalidasCollection.doc(Cosalida.id).set(Cosalida);
      console.log(this.sucursaless);
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
      this.Cosalidas = this.CosalidasCollectioncen.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlSalidaInterface;
          data.id = action.payload.doc.id;
          return data;
          
        });
      }));
      return this.Cosalidas;
      
    };
    getAllCosalidacoa():Observable<ControlSalidaInterface[]>{
      this.Cosalidas = this.CosalidasCollectioncoa.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlSalidaInterface;
          data.id = action.payload.doc.id;
          return data;
          
        });
      }));
      return this.Cosalidas;
    };
    getAllCosalidavig():Observable<ControlSalidaInterface[]>{
      this.Cosalidas = this.CosalidasCollectionvig.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlSalidaInterface;
          data.id = action.payload.doc.id;
          return data;
          
        });
      }));
      return this.Cosalidas;
    };
    getAllCosalidapat():Observable<ControlSalidaInterface[]>{
      this.Cosalidas = this.CosalidasCollectionpat.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlSalidaInterface;
          data.id = action.payload.doc.id;
          return data;
          
        });
      }));
      return this.Cosalidas;
      
    };
    getAllCosalidacor():Observable<ControlSalidaInterface[]>{
      this.Cosalidas = this.CosalidasCollectioncor.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlSalidaInterface;
          data.id = action.payload.doc.id;
          return data;
          
        });
      }));
      return this.Cosalidas;
      
    };
    getAllCosalidatln():Observable<ControlSalidaInterface[]>{
      this.Cosalidas = this.CosalidasCollectiontln.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlSalidaInterface;
          data.id = action.payload.doc.id;
          return data;
          
        });
      }));
      return this.Cosalidas;
      
    };
    getAllCosalidatla():Observable<ControlSalidaInterface[]>{
      this.Cosalidas = this.CosalidasCollectiontla.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlSalidaInterface;
          data.id = action.payload.doc.id;
          return data;
          
        });
      }));
      return this.Cosalidas;
      
    };
    getAllCosalidator():Observable<ControlSalidaInterface[]>{
      this.Cosalidas = this.CosalidasCollectiontor.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlSalidaInterface;
          data.id = action.payload.doc.id;
          return data;
          
        });
      }));
      return this.Cosalidas;
      
    };
    getAllCosalidaval():Observable<ControlSalidaInterface[]>{
      this.Cosalidas = this.CosalidasCollectionval.snapshotChanges()
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

