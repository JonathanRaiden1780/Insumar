import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ControlService } from 'src/app/servicios/control.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatDate } from '@angular/common';
 

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  listadoProductos: any;
  public downloadPDF(){
    let doc = new jsPDF();

    let specialElementHandlers ={
      '#editor': function(element, renderer){
        return true;
      }
    };
    let content = this.content.nativeElement;
    
    doc.fromHTML(content.innerHTML, 15,15, {
      'width': 300,
      'elementHandlers': specialElementHandlers,
      'height': 400
    });
    
    
    doc.save('Reporte' + formatDate(new Date(),'dd/MM/yyyy hh:mm:ss a','en') + '.pdf');
  }
  constructor(
    private authService: AuthService,
    public productos: ControlService
    
  ) {
    this.listadoProductos = productos.getAllCoentrada();
   }

  ngOnInit() {
  }

}
