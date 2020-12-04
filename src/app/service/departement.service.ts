import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Departement} from '../models/Departement';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private departementCreerSource = new Subject<Resultat<Departement>>();
  private departementModifSource = new Subject<Resultat<Departement>>();
  private departementFiltreSource = new Subject<string>();
  private departementSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  departementCreer$ = this.departementCreerSource.asObservable();
  departementModif$ = this.departementModifSource.asObservable();
  departementFiltre$ = this.departementFiltreSource.asObservable();
  departementSupprime$ = this.departementSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllDepartement(): Observable<Resultat<Departement[]>> {
    return this.http.get<Resultat<Departement[]>>(`${environment.apiUrl}/api/departement`);
  }
  ajoutDepartement(departement: Departement): Observable<Resultat<Departement>> {
    console.log('methode du service qui ajoute un departement', departement);
    return this.http.post<Resultat<Departement>>(`${environment.apiUrl}/api/departement`, departement);
  }
  updateDepartement(departement: Departement): Observable<Resultat<Departement>> {
    console.log('methode du service qui met à jour un departement', departement);
    return this.http.put<Resultat<Departement>>(`${environment.apiUrl}/api/departement`, departement);
  }
  getDepatementById(id: number): Observable<Resultat<Departement>> {
    return this.http.get<Resultat<Departement>>(`${environment.apiUrl}/api/departement/${id}`);
  }
  supprimerDepatementById(id: number): Observable<Resultat<boolean>> {
    return this.http.delete<Resultat<boolean>>(`${environment.apiUrl}/api/departement/${id}`);
  }

  departermentCreer(res: Resultat<Departement>) {
    console.log('depatement a ete  creer correctement essaie source');
    this.departementCreerSource.next(res);
  }

  departermentModif(res: Resultat<Departement>) {
    this.departementModifSource.next(res);
  }

  filtredeparterment(text: string) {
    this.departementFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('personneService: ' + message);

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
