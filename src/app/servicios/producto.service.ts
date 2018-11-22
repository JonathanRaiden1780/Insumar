import { Injectable } from '@angular/core';
import {ProductosInterface} from '../Models/Productos';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
ProductosCollection: AngularFirestoreCollection<ProductosInterface>;
ProductosDoc: AngularFirestoreDocument<ProductosInterface>;
Productos: Observable<ProductosInterface[]>;
Producto: Observable<ProductosInterface>;
  constructor(
    private afs: AngularFirestore) {
      this.ProductosCollection = this.afs.collection('Productos', ref => ref);
     }

    deleteProducto(Producto: ProductosInterface){
      this.ProductosDoc = this.afs.doc('Productos/${Producto.id}');
      this.ProductosDoc.delete();
    }
     updateProducto(Producto: ProductosInterface){
        this.ProductosDoc=this.afs.doc('Productos/${Producto.id}');
        this.ProductosDoc.update(Producto);
      }

    addProducto(Producto: ProductosInterface){
      this.ProductosCollection.add(Producto);
    }
    getOneProducto(idprodu: string){
      this.ProductosDoc = this.afs.doc<ProductosInterface>('Productos/${idprodu}');
      this.Producto = this.ProductosDoc.snapshotChanges().pipe(map(action =>{
        if(action.payload.exists === false){
          return null;
        }else{
          const data = action.payload.data() as ProductosInterface;
          data.idprod = action.payload.id;

        }
      }));
    }
    getAllProducto():Observable<ProductosInterface[]>{
      this.Productos = this.ProductosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProductosInterface;
          data.idprod = action.payload.doc.id;
          return data;
        });
      }));
      return this.Productos;
    }
}
