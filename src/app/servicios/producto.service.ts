import { Injectable } from '@angular/core';
import {ProductosInterface} from '../Models/Productos';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
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
      this.ProductosCollection = this.afs.collection('Productos', ref => ref );
      
     }

    deleteProducto(Producto: ProductosInterface){
      this.ProductosDoc = this.afs.doc('Productos/' + Producto.idprov);
      this.ProductosDoc.delete();
    }
     updateProducto(Producto: ProductosInterface){
        this.ProductosDoc=this.afs.doc('Productos/' + Producto.idprov);
        this.ProductosDoc.update(Producto);
      }

    addProducto(Producto: ProductosInterface){
      this.ProductosCollection.doc(Producto.Nombre).set(Producto);
      //this.ProductosCollection.add(Producto);
    }
   
    getOneProducto(idprov: string){
      this.ProductosDoc = this.afs.doc<ProductosInterface>('Productos/${idprov}');
      this.Producto = this.ProductosDoc.snapshotChanges().pipe(map(action =>{
        if(action.payload.exists === false){
          return null;
        }else{
          const data = action.payload.data() as ProductosInterface;
          data.idprov = action.payload.id;

        }
      }));
    }
    
    getAllProducto():Observable<ProductosInterface[]>{
      this.Productos = this.ProductosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProductosInterface;
          data.idprov = action.payload.doc.id;
          return data;
        });
      }));
      return this.Productos;
    }
  }
/*
  productos: any;

  constructor(public firebase: AngularFireDatabase) {
    this.productos = this.firebase.list('productos');
  }

  agregar(producto) {
    this.productos.push(producto);
  }

  mostrar() {
    return this.productos.snapshotChanges();
  }

  eliminar(id) {
    this.productos.remove(id);
  }
}
*/
