import { Injectable } from '@angular/core';
import {ControlEntradaInterface} from '../Models/ControlEntrada';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { TipoInterface } from '../Models/tipo';
import { UpdateInterface } from '../Models/update';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  
CoentradasCollection: AngularFirestoreCollection<ControlEntradaInterface>;
CoentradasDoc: AngularFirestoreDocument<ControlEntradaInterface>;
Coentradas: Observable<ControlEntradaInterface[]>;
Coentrada: Observable<ControlEntradaInterface>;
PiezaCollection: AngularFirestoreCollection<TipoInterface>;
PiezaDoc: AngularFirestoreDocument<TipoInterface>;
Piezas: Observable<TipoInterface[]>;
Pieza: Observable<TipoInterface>;
UpdateCollection: AngularFirestoreCollection<UpdateInterface>;
UpdateDoc: AngularFirestoreDocument<UpdateInterface>;
Updates: Observable<UpdateInterface[]>;
Update: Observable<UpdateInterface>;
 

public coentra: ControlEntradaInterface ;

  constructor(private afs: AngularFirestore) {
      this.CoentradasCollection = this.afs.collection('Coentradas', ref => ref);
      this.PiezaCollection = this.afs.collection('Pieza', ref => ref);
      this.UpdateCollection = this.afs.collection('Update', ref => ref);

     }

    deleteCoentrada(Coentrada: string){
      this.CoentradasDoc = this.afs.doc('Coentradas/'  + Coentrada);
      
      this.CoentradasDoc.delete();
    }
     updateCoentrada(Coentrada: ControlEntradaInterface){
        this.CoentradasDoc=this.afs.doc('Coentradas/${Coentrada.id}');
        this.CoentradasDoc.update(Coentrada);
      }

    addCoentrada(Coentrada: ControlEntradaInterface){
      this.CoentradasCollection.add(Coentrada);
    }
    getOneCoentrada(id: string){
      this.CoentradasDoc = this.afs.doc<ControlEntradaInterface>('Coentradas/${id}');
      this.Coentrada = this.CoentradasDoc.snapshotChanges().pipe(map(action =>{
        if(action.payload.exists === false){
          return null;
        }else{
          const data = action.payload.data() as ControlEntradaInterface;
          data.id = action.payload.id;

        }
      }));
    }
    update(Update: UpdateInterface){
      this.UpdateDoc=this.afs.doc('Update/QUERY');
      this.UpdateDoc.update(Update);
    }
    getAllUpdate(){
      this.Updates = this.UpdateCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UpdateInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
     // return this.Updates;
    }
    refresh(): void {
      window.location.reload();
  }
    getAllCoentrada():Observable<ControlEntradaInterface[]>{
      this.Coentradas = this.CoentradasCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlEntradaInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
      return this.Coentradas;
    }
    gettipo():Observable<TipoInterface[]>{
      this.Piezas = this.PiezaCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as TipoInterface;
          //data.id = action.payload.doc.id;
          return data;
        });
      }));
      return this.Piezas;
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

  control: any;

  constructor(public firebase: AngularFireDatabase) {
    this.control = this.firebase.list('control');
   }
   agregar(control){
     this.control.push(control);  
   }
   mostrar() {
    return this.control.snapshotChanges();
  } 

  eliminar(id) {
    this.control.remove(id);
  }

  contar() {
    return this.control.valueChanges();
  }
}
*/

