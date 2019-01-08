import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalupdate',
  templateUrl: './modalupdate.component.html',
  styleUrls: ['./modalupdate.component.css']
})
export class ModalupdateComponent implements OnInit {
  invent:number;
  query: any;
  idup:string;
  constructor() { }

  ngOnInit() {
    console.log(this.idup);
  }
  
}
