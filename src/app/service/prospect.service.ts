import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {environment} from "../../environments/environment";
import {Prospect} from "../models/Prospect";


@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  private clientCreerSource = new Subject<Resultat<Prospect>>();
  private clientModifSource = new Subject<Resultat<Prospect>>();
  private clientFiltreSource = new Subject<string>();
  private clientSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  clientCreer$ = this.clientCreerSource.asObservable();
  clientModif$ = this.clientModifSource.asObservable();
  clientFiltre$ = this.clientFiltreSource.asObservable();
  clientSupprime$ = this.clientSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllProspect(): Observable<Resultat<Prospect[]>> {
    return this.http.get<Resultat<Prospect[]>>(`${environment.apiUrl}/api/auth/prospect`);
  }

  ajoutProspect(prospect: Prospect): Observable<Resultat<Prospect>> {
    console.log('methode du service qui ajoute un prospect', prospect);
    return this.http.post<Resultat<Prospect>>(`${environment.apiUrl}/api/auth/prospect`, prospect);
  }
  getPospectById(id: number): Observable<Resultat<Prospect>> {
    return this.http.get<Resultat<Prospect>>(`${environment.apiUrl}/api/auth/prospect/${id}`);
  }
  supprimerProspectById(id: number): Observable<Resultat<boolean>> {
    return this.http.delete<Resultat<boolean>>(`${environment.apiUrl}/api/auth/prospect/${id}`);
  }

  clientCreer(res: Resultat<Prospect>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.clientCreerSource.next(res);
  }

  employeModif(res: Resultat<Prospect>) {
    this.clientModifSource.next(res);
  }

  filtreEmploye(text: string) {
    this.clientFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('clientService: ' + message);

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
