import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, tap, take} from 'rxjs/operators';

import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.afAuth.authState
    .pipe(take(1))
    .pipe(map(authState => !! authState))
    .pipe(tap( authenticated => {
      if (!authenticated) {
        this.router.navigate(['/login']);
      }
    }));
  }
}
