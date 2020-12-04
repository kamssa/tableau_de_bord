import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Categorie} from '../models/Categorie';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
// observables sources
  categories: Categorie[];
  private categorieCreerSource = new Subject<Resultat<Categorie>>();
  private categorieModifSource = new Subject<Resultat<Categorie>>();
  private categorieFiltreSource = new Subject<string>();
  private categorieSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.categorieCreerSource.asObservable();
  travauxModif$ = this.categorieModifSource.asObservable();
  travauxFiltre$ = this.categorieFiltreSource.asObservable();
  travauxSupprime$ = this.categorieSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllCategorie(): Observable<Resultat<Categorie[]>> {
    return this.http.get<Resultat<Categorie[]>>(`${environment.apiUrl}/api/categorie`);
  }

  ajoutCategorie(categorie: Categorie): Observable<Resultat<Categorie>> {
    console.log('methode du service qui ajoute  categorie', categorie);
    return this.http.post<Resultat<Categorie>>(`${environment.apiUrl}/api/categorie`, categorie);
  }
  modifCategorie(categorie: Categorie): Observable<Resultat<Categorie>> {
    console.log('methode du service qui modifier categorie', categorie);
    return this.http.put<Resultat<Categorie>>(`${environment.apiUrl}/api/categorie`, categorie);
  }
  getCategorieById(id: number): Observable<Resultat<Categorie>> {
    return this.http.get<Resultat<Categorie>>(`${environment.apiUrl}/api/categorie/${id}`);
  }
  getCategorieByNom(nom: string): Observable<Resultat<Categorie>> {
    return this.http.get<Resultat<Categorie>>(`${environment.apiUrl}/api/getCategorieByNom/${nom}`);
  }
  supprimerCategorie(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/categorie/${id}`);

  }

  categorieCreer(res: Resultat<Categorie>) {
    console.log('categorie a ete  creer correctement essaie source');
    this.categorieCreerSource.next(res);
  }

  categorieModif(res: Resultat<Categorie>) {
    this.categorieModifSource.next(res);
  }

  filtrecategorie(text: string) {
    this.categorieFiltreSource.next(text);
  }

  categorieSupprime(res: Resultat<boolean>) {
    this.categorieSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('categorieService: ' + message);

  }

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
