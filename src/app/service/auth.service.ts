import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Resultat} from '../models/resultat';
import {Employe} from '../models/Employe';
import {Personne} from '../models/Personne';
import {LocalStorage} from '@ngx-pwa/local-storage';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private helper: JwtHelperService) {

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  ajoutEmploye(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui ajoute un employe', employe);
    return this.http.post<Resultat<Employe>>(`${environment.apiUrl}/api/auth/signupEmpl`, employe);
  }
  login(personne: Personne) {
    return this.http.post<Resultat<any>>(`${environment.apiUrl}/api/auth/signin`, personne)
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(res.body.body.accessToken));
        this.currentUserSubject.next(res.body.body.accessToken);
        console.log(res.body.body.accessToken);
        return res;
      }));
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }



}
