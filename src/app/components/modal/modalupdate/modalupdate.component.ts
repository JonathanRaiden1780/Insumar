import { Component, OnInit, Input } from '@angular/core';
import { ControlService } from 'src/app/servicios/control.service';
import { ControlEntradaInterface } from 'src/app/Models/ControlEntrada';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { UpdateInterface } from 'src/app/Models/update';
import { NgForm } from '@angular/forms';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { ProductosInterface } from 'src/app/Models/Productos';
import { ProductoService } from 'src/app/servicios/producto.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-modalupdate',
  templateUrl: './modalupdate.component.html',
  styleUrls: ['./modalupdate.component.css']
})
export class ModalupdateComponent implements OnInit {
  invent:number;
  producto:string;
  id:string;
  fecha:string;
  cantidad:number;
  cantres:number;
  unidad:string;
  proveedor:string;
  precio:string;
  listadoProveedores: any;
  listadoPiezas: any;
  upd: any;
  cantprodres:number;
  cantprodsum:number;
  public idup: ControlEntradaInterface;

  listadoControl:any;
  constructor(
    private controlService: ControlService,
    private productos: ProductoService,
    public proveedores: ProveedorService,
    private afs: AngularFirestore
  ) { 
    this.upd = this.controlService.getAllUpdate();
    this.listadoControl = this.controlService.getAllCoentrada();
    this.listadoProveedores = this.proveedores.getAllProveedor();
    this.listadoPiezas = this.controlService.gettipo();

    
  }
  @Input() userUid: string;
  ngOnInit() {
    //this.getAllUpdate()
    
    console.log('s');
    //this.upd.getitem().subscribe(producto => this.list = producto as Array<string>);
  }
  click(){
  this.afs.collection('Update').doc('QUERY').valueChanges().pipe(take(1)).subscribe(res => {this.ids(res)} );
  this.afs.collection('Update').doc('QUERY').valueChanges().pipe(take(1)).subscribe(res => {this.cant(res)} );
  }
  getAllUpdate(){
    this.controlService.getAllUpdate();
  }
  cant(x: UpdateInterface): number {
    this.cantres = x.cantidad;
    
    return this.cantres;
    
   }
   ids(x: UpdateInterface): string {
    this.id = x.id;
    this.afs.collection('Coentradas').doc(this.id).valueChanges().pipe(take(1)).subscribe(res => {this.number(res)} );
    this.idup.id= this.id;
    console.log(this.id);
    return this.id;
    
   }
   number(x: ControlEntradaInterface): number {
    this.invent = x.inventario;

    this.cantprodres =res(this.invent, this.cantres);
    
    console.log(this.cantprodres , this.cantres);
    
    this.cantprodsum = suma(this.cantidad, this.cantprodres);

    

    console.log(this.cantprodsum);
    
    function suma(a:number , b:number):number{
      
      return a + b;
    }

    this.save();


    function res(a:number , b:number):number{
      
      return a - b;
    }
    
    return  this.cantprodsum;

   }
   
   getupdateentrada(x : ControlEntradaInterface){
    
    this.controlService.update(x);
      
  }
  getupdatestock(x : ProductosInterface){
        
    this.productos.updateProducto(x);
      
  }
   
   save(){

    //this.idup.cantidad=this.cantprodsum;
    
    this.idup.cantidad = this.cantprodsum;
    this.idup.proveedor = this.proveedor;
    this.idup.precio = this.precio;
    this.idup.pieza = this.unidad;

     console.log(this.idup);
   }
}
