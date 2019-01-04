import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { faDolly } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-entradas-ct',
  templateUrl: './entradas-ct.component.html',
  styleUrls: ['./entradas-ct.component.css']
})
export class EntradasCTComponent implements OnInit {

  faDolly = faDolly;
  rows;
  columns;
  
  constructor(private afs: AngularFirestore) { 
  }

  getData() {
    this.afs.collection('Productos').valueChanges().subscribe((Productos) => {
      this.rows = Productos;
    })
  }

  ngOnInit() {
    this.getData()
  }

}
