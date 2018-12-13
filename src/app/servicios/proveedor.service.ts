import { Injectable } from '@angular/core';
import {ProveedoresInterface} from '../Models/Proveedores';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

ProveedorCollection: AngularFirestoreCollection<ProveedoresInterface>;
ProveedorDoc: AngularFirestoreDocument<ProveedoresInterface>;
Proveedores: Observable<ProveedoresInterface[]>;
Proveedor: Observable<ProveedoresInterface>;

constructor(
  private afs: AngularFirestore) {
    this.ProveedorCollection = this.afs.collection('Proveedores', ref => ref);
   }

  deleteProveedor(Proveedor: ProveedoresInterface){
    this.ProveedorDoc = this.afs.doc('Proveedores/${Proveedor.id}');
    this.ProveedorDoc.delete();
  }
   updateProveedor(Proveedor: ProveedoresInterface){
      this.ProveedorDoc=this.afs.doc('Proveedores/${Proveedor.id}');
      this.ProveedorDoc.update(Proveedor);
    }

  addProveedor(Proveedor: ProveedoresInterface){
    //this.ProveedorCollection.add(Proveedor);
    this.ProveedorCollection.doc(Proveedor.Nombre).set(Proveedor);
  }
  getOneProveedor(idprov: string){
    this.ProveedorDoc = this.afs.doc<ProveedoresInterface>('Proveedores/${idprov}');
    this.Proveedor = this.ProveedorDoc.snapshotChanges().pipe(map(action =>{
      if(action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data() as ProveedoresInterface;
        data.idprov = action.payload.id;

      }
    }));
  }
  getAllProveedor():Observable<ProveedoresInterface[]>{
    this.Proveedores = this.ProveedorCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ProveedoresInterface;
        data.idprov = action.payload.doc.id;
        return data;
      });
    }));
    return this.Proveedores;
  }
  
}
