import { Component, OnInit, Input } from '@angular/core';
import {Observable, concat} from 'rxjs';
import {AuthService} from '../../servicios/auth.service';
import {  SalidasService} from 'src/app/servicios/salidas.service';
import { ControlSalidaInterface } from 'src/app/Models/ControlSalida';
import{ProductoService} from '../../servicios/producto.service'
import {ProductosInterface} from '../../Models/Productos';
import {Router} from '@angular/router';
import { AngularFirestore, validateEventsArray, AngularFirestoreCollection } from 'angularfire2/firestore';
import { inventarioInterface } from 'src/app/Models/inventario';
import { SucursalService } from 'src/app/servicios/sucursal.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SucursalInterface } from 'src/app/Models/Sucursal';
import { faDolly, faArchive, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ControlService } from 'src/app/servicios/control.service';
import { take, map } from 'rxjs/operators';
import { RegistroInterface } from 'src/app/Models/registro';
import { query } from '@angular/animations';

@Component({
  selector: 'app-salidas-ct',
  templateUrl: './salidas-ct.component.html',
  styleUrls: ['./salidas-ct.component.css']
})
export class SalidasCTComponent implements OnInit {

  faTimes = faTimes;
  faEdit = faEdit;

  model: any = {};
  query: string;
  querys: any;
  idProducto:string;
  listado: any;
  listadolocal: any;
 fecha:string;
  cantprod:number;
  cantprods:number;
  invent:number;
  cantprov:number;
  sucursales:string;
  
  
controlsalidas: ControlSalidaInterface = {
    
  id:'',
  cantidad: 0,
  producto: '',
  fecha: '',
  sucursal:''
  
}

public isLogin: boolean;
public  nombreUsusario: string;
public  emailUser: string;
asigna:string;
 
  constructor(
    private authService: AuthService,
    public productos: ProductoService,
    private controlService: SalidasService,
   
    private router: Router,
    private afs: AngularFirestore,
    public flashMensaje: FlashMessagesService
    
  ){
    
  
    const today = new Date();
    this.model.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2); 
  }

rows;
columns;

  ngOnInit() {
   this.model.tipo = 'salida'; 
   this.authService.getAuth().subscribe ( auth => {
    if(auth){
      this.isLogin=true;
      this.nombreUsusario = auth.displayName;
      this.emailUser=auth.email;
      this.nombreusuaro(this.emailUser);
      
    }
    else{
      this.isLogin = false;
    }
  });    
}
sucursaless: any;
nombreusuaro(x:string){
  
  this.afs.collection('Registro').doc(x).valueChanges().pipe(take(1)).subscribe(res => {this.arrass(res)} );
  //this.AuthService.getUser(this.emailUsuario);
  
  
}
arrass(x: RegistroInterface): string {
  this.sucursaless= x.sucursal;
  
  this.getData();
  return this.sucursaless;
}
arrass2(x: ControlSalidaInterface): string {
  this.querys= x;
  
  console.log(this.querys)
  return this.querys;
}
Cosalidas: Observable<ControlSalidaInterface[]>;
CosalidasCollectionval: AngularFirestoreCollection<ControlSalidaInterface>;
CosalidasCollectionloc: AngularFirestoreCollection<ControlSalidaInterface>;
  getData() {
    this.CosalidasCollectionval = this.afs.collection('Cosalidas').doc(this.sucursaless).collection('salidas', ref => ref);
    this.CosalidasCollectionloc = this.afs.collection('Cosalidasl').doc(this.sucursaless).collection('salidas', ref => ref);
   this.listadolocal= this.getalllistadolocal();
    this.listado = this.getAllCosalidagen();
   
  }
  getAllCosalidagen():Observable<ControlSalidaInterface[]>{
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
  getalllistadolocal():Observable<ControlSalidaInterface[]>{
    this.Cosalidas = this.CosalidasCollectionloc.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ControlSalidaInterface;
        data.id = action.payload.doc.id;
        return data;
        
      });
    }));
    return this.Cosalidas;
    
  };
  eliminar(id: string, sucu: string){
    const confirma = confirm('Esta seguro?')
    if(confirma){
    console.log('eliminar registro ',id, sucu)
    this.controlService.deleteCosalida( id, sucu );
  }
}
act:any;
cantidadregistrada: number;
cantprodres: number;
getcantidad(x : number){
 // this.invent = this.query.cantidad;
  this.cantidadregistrada = x;
  this.cantprodres =res(this.invent, this.cantidadregistrada);
  function res(a:number , b:number):number{
    
    return a + b;
  }

}
  onChange(value){
    console.log(this.query );
    console.log(this.sucursaless);
   this.afs.collection('Cosalidas').doc(this.sucursaless).collection('salidas').doc(this.query).valueChanges().pipe(take(1)).subscribe(res => {this.arrass2(res)}  );
   this.invent = this.querys.cantidad;
   this.cantprods =sum(this.invent, this.cantprod);
    console.log(this.querys );
    console.log(this.cantprods);
    this.act.Nombre  = this.query;
    this.act.cantidad  = this.cantprods; 
    
    
    function sum(a:number , b:number):number{
      
      return a - b;
    }
    //this.cantprods = this.selecprod.inventprod + this.cantprod;
  }
  
  onGuardarSalida({value}: {value: ControlSalidaInterface}){
    
    this.controlService.llamarsu(this.sucursaless);
    if(this.cantprod > this.querys.cantidad)
    { 
      this.flashMensaje.show('No hay suficiente producto',{
      cssClass: 'alert-danger', timeout: 4000});
    } 
    else
    {
      this.flashMensaje.show('Salida registrada exitosamente',{
        cssClass: 'alert-success', timeout: 4000});
      value.cantidad=this.cantprod;
      value.producto=this.query;
      value.id = this.sucursaless;
      
      console.log(value)
      this.controlService.addcosalidalocal(value);
      this.controlService.updateCosalida(value);
    }
    
  }
 
 
  faDolly = faDolly;
  faArchive = faArchive;
}

