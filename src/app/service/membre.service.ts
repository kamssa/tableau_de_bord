import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Employe} from '../models/Employe';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {Membre} from '../models/Membre';

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private employeCreerSource = new Subject<Resultat<Membre>>();
  private employeModifSource = new Subject<Resultat<Membre>>();
  private employeFiltreSource = new Subject<string>();
  private employeSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  employeCreer$ = this.employeCreerSource.asObservable();
  employeModif$ = this.employeModifSource.asObservable();
  employeFiltre$ = this.employeFiltreSource.asObservable();
  employeSupprime$ = this.employeSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllMembre(): Observable<Resultat<Membre[]>> {
    return this.http.get<Resultat<Membre[]>>(`${environment.apiUrl}/api/membre`);
  }

  ajoutEmploye(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui ajoute un employe', employe);
    return this.http.post<Resultat<Employe>>(`${environment.apiUrl}/api/employe`, employe);
  }
  getMembreById(id: Membre): Observable<Resultat<Membre>> {
    return this.http.get<Resultat<Membre>>(`${environment.apiUrl}/api/membre/${id}`);
  }
  supprimerMembre(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/membre/${id}`);

  }
  employeCreer(res: Resultat<Employe>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.employeCreerSource.next(res);
  }

  employeModif(res: Resultat<Employe>) {
    this.employeModifSource.next(res);
  }

  filtreEmploye(text: string) {
    this.employeFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('EmployeService: ' + message);

  }
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  // recuper les erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
