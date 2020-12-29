import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Categorie} from '../models/Categorie';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {Terrain} from '../models/Terrain';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
// observables sources
  private terrainCreerSource = new Subject<Resultat<Terrain>>();
  private terrainModifSource = new Subject<Resultat<Terrain>>();
  private terrainFiltreSource = new Subject<string>();
  private terrainSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  terrainCreer$ = this.terrainCreerSource.asObservable();
  terrainModif$ = this.terrainModifSource.asObservable();
  terrainFiltre$ = this.terrainFiltreSource.asObservable();
  terrainSupprime$ = this.terrainSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllTerrain(): Observable<Resultat<Terrain[]>> {
    return this.http.get<Resultat<Terrain[]>>(`${environment.apiUrl}/api/terrain`);
  }

  ajoutTerrain(terrain: Terrain): Observable<Resultat<Terrain>> {
    console.log('methode du service qui ajoute  terrain', terrain);
    return this.http.post<Resultat<Terrain>>(`${environment.apiUrl}/api/terrain`, terrain);
  }
  modifTerrain(terrain: Terrain): Observable<Resultat<Terrain>> {
    console.log('methode du service qui modifier terrain', terrain);
    return this.http.put<Resultat<Terrain>>(`${environment.apiUrl}/api/terrain`, terrain);
  }
  getTerrainById(id: Terrain): Observable<Resultat<Terrain>> {
    return this.http.get<Resultat<Terrain>>(`${environment.apiUrl}/api/terrain/${id}`);
  }
  supprimerTerrain(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/terrain/${id}`);

  }
  uploadImage(formData, id): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/upload/?id=${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  terrainCreer(res: Resultat<Terrain>) {
    console.log('categorie a ete  creer correctement essaie source');
    this.terrainCreerSource.next(res);
  }

  terrainModif(res: Resultat<Terrain>) {
    this.terrainModifSource.next(res);
  }

  filtreTerrain(text: string) {
    this.terrainFiltreSource.next(text);
  }

  terrainSupprime(res: Resultat<boolean>) {
    this.terrainSupprimeSource.next(res);
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
