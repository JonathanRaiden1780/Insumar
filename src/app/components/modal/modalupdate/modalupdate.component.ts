import { Component, OnInit, Input } from '@angular/core';
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
    this.afs.collection('Update').doc('QUERY').valueChanges().pipe(take(1)).subscribe(res => {this.nombre(res)} );
    this.afs.collection('Update').doc('QUERY').valueChanges().pipe(take(1)).subscribe(res => {this.numbers(res)} );
    
  }
  @Input() userUid: string;
  ngOnInit() {
    //this.getAllUpdate()
    console.log('s');
    //this.upd.getitem().subscribe(producto => this.list = producto as Array<string>);
  }

  getAllUpdate(){
    this.controlService.getAllUpdate();
  }
  nombre(x: UpdateInterface): string {
    this.producto = x.producto;
    return this.producto;
   }
   numbers(x: UpdateInterface): number {
    this.cantidad = x.cantidad;
    this.invent = x.cantidad;
    return this.cantidad, this.invent;
   }
   
   save(){
     console.log(this.idup.producto);
   }
}
