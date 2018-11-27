import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../servicios/auth.service';
import { ControlService } from 'src/app/servicios/control.service';
import { ControlEntradaInterface } from 'src/app/Models/ControlEntrada';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  model: any = {};


controlentradas: ControlEntradaInterface = {
    
  cantidad: '',
  producto: '',
  fecha: '',
  precio: '',
  proveedor: ''
  
}

  constructor(
    private authService: AuthService,
    private controlService: ControlService
    
  ){

    const today = new Date();
    this.model.fecha = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  }


  ngOnInit() {
    
  }

  
  onGuardarEntrada({value}: {value: ControlEntradaInterface}){
    this.controlService.addCoentrada(value);
  }
}
