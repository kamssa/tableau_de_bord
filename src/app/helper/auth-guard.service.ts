import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements  CanActivate {
  authenticationState = new BehaviorSubject(false);
  personne: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private helper: JwtHelperService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const urlcurrent = String(state.url);

    if (this.checkToken() === true) {
      if (urlcurrent === '/login') {
        this.router.navigate(['dashbooard']);
      }
      return true;
    } else {
      if (urlcurrent === '/login') {
        return true;
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
  checkToken(): any {

    if (localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');

      let decode = this.helper.decodeToken(token);
      let expirationDate = this.helper.getTokenExpirationDate(token);
      let isExpireToken = this.helper.isTokenExpired(token);

      if (!isExpireToken) {
        this.personne = decode;
        console.log(' Dans la garde', this.personne.sub);
        this.authenticationState.next(true);
        return true;
      } else {
     //   localStorage.remove('currentUser');
        localStorage.clear();
        return false;
      }
    }else{
      console.log('access denied . security guards');
      return false;
    }

  }
  isAuthenticated(){
    return this.authenticationState.value;
  }


}
