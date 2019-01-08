import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/servicios/control.service';
import { ControlEntradaInterface } from 'src/app/Models/ControlEntrada';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { UpdateInterface } from 'src/app/Models/update';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modalupdate',
  templateUrl: './modalupdate.component.html',
  styleUrls: ['./modalupdate.component.css']
})
export class ModalupdateComponent implements OnInit {
  invent:number;
  producto:string;
  fecha:string;
  cantidad:number;
  unidad:string;
  proveedor:string;
  precio:string;

  upd: any;

  public idup: ControlEntradaInterface;

  listadoControl:any;
  constructor(
    private controlService: ControlService,
    private afs: AngularFirestore
  ) { 
    this.upd = this.controlService.getAllUpdate();
    this.listadoControl = this.controlService.getAllCoentrada();
    this.afs.collection('Update').doc('QUERY').valueChanges().pipe(take(1)).subscribe(res => {this.arrass(res)} );
  }

  ngOnInit() {
    this.getAllUpdate()

    console.log('s');
    
  }

  getAllUpdate(){
    this.controlService.getAllUpdate();
  }
  arrass(x: UpdateInterface): UpdateInterface {
    this.idup = x;
    console.log(this.idup);
    this.producto = this.idup.producto;
    this.fecha = this.idup.fecha;
    this.cantidad = this.idup.cantidad;
    this.unidad = this.idup.pieza;
    this.proveedor = this.idup.proveedor;
    this.precio = this.idup.precio;

    return this.idup;
   }
   save(){
     console.log(this.idup.producto);
   }
}
