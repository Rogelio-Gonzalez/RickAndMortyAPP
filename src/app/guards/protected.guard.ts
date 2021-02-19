import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseLoginService } from '../services/firebase-login.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectedGuard implements CanActivate {
  constructor(private fire : FirebaseLoginService, private router : Router){}
  canActivate(): boolean {
      if (this.fire.isValidToken() ) {
        return true;
      } else {
        this.router.navigateByUrl('login');
        return false;
      }
  }

}
