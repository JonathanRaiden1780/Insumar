import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
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
