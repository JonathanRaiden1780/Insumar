import { Component, OnInit } from '@angular/core';
import { faKey, faUser, faDolly } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  faKey = faKey;
  faUser = faUser;
  faDolly = faDolly;

}
