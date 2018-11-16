import { Injectable } from '@angular/core';

import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import {map} from 'rxjs/operators';

import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  constructor(
    public afAuth: AngularFireAuth
  ) { 
    this.user = afAuth.authState;
  }
  
   loginEmail(email:string,pass:string){
    return new Promise((resolve,reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,pass)
      .then( userData => resolve(userData),
      err => reject(err));
    });
  } 

  getAuth(){
    return this.afAuth.authState.pipe(map( auth => auth));
  }


  logout(){
    return this.afAuth.auth.signOut();
  }
}
