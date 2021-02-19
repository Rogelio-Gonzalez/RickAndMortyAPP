import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyAIwV7Zjyh_XHvB_iNP4TCWRmxPNPRMqrA';
  userToken: string;
  constructor( private http: HttpClient, private route : Router ) {}
  logout(){
    this.route.navigateByUrl('login');
    //localStorage.removeItem('expira');
    localStorage.removeItem('expires');
    localStorage.removeItem('token');
  }
  login( user: User ) {
    const authData = {
      ...user,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url }/verifyPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }
  private saveToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expires', hoy.getTime().toString() );
  }
  isValidToken(): boolean {
    const expireToken = Number(localStorage.getItem('expires'));
    const expireDate = new Date();
    expireDate.setTime(expireToken);
    if ( expireDate > new Date() ) {
      return true;
    } else {
      return false;
    }
  }
}
