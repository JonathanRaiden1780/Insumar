import { Injectable } from '@angular/core';
import {SucursalInterface} from '../Models/Sucursal';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  SucursalCollection: AngularFirestoreCollection<SucursalInterface>;
  SucursalDoc: AngularFirestoreDocument<SucursalInterface>;
  Sucursales: Observable<SucursalInterface[]>;
  Sucursal: Observable<SucursalInterface>;
  
  constructor(
    private afs: AngularFirestore) {
      this.SucursalCollection = this.afs.collection('Sucursales', ref => ref);
     }
  
    deleteSucursal(Sucursal: string){
      this.SucursalDoc = this.afs.doc('Sucursales/' + Sucursal);
      this.SucursalDoc.delete();
    }
     updateSucursal(Sucursal: SucursalInterface){
        this.SucursalDoc=this.afs.doc('Sucursales/' + Sucursal.id);
        this.SucursalDoc.update(Sucursal);
      }
  
    addSucursal(Sucursal: SucursalInterface){
      //this.SucursalCollection.add(Sucursal);
      this.SucursalCollection.doc(Sucursal.sucursal).set(Sucursal);
    }
    getOneSucursal(idsucu: string){
      this.SucursalDoc = this.afs.doc<SucursalInterface>('Sucursales/${idsucu}');
      this.Sucursal = this.SucursalDoc.snapshotChanges().pipe(map(action =>{
        if(action.payload.exists === false){
          return null;
        }else{
          const data = action.payload.data() as SucursalInterface;
          data.id = action.payload.id;
  
        }
      }));
    }
    getAllSucursal():Observable<SucursalInterface[]>{
      this.Sucursales = this.SucursalCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as SucursalInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
      return this.Sucursales;
    }
    
  }
  