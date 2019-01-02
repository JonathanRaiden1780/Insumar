import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  faEdit = faEdit;
  faCheck = faCheck;
  faTimes = faTimes;
  options: FormGroup;

  constructor( fb: FormBuilder ) { 
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
  }

}
