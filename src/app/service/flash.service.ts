import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Categorie} from '../models/Categorie';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {MessageService} from './message.service';
import {Terrain} from '../models/Terrain';
import {environment} from '../../environments/environment';
import {FlashTerrain} from '../models/FlashTerrain';

@Injectable({
  providedIn: 'root'
})
export class FlashService {
// observables sources
  private terrainCreerSource = new Subject<Resultat<FlashTerrain>>();
  private terrainModifSource = new Subject<Resultat<FlashTerrain>>();
  private terrainFiltreSource = new Subject<string>();
  private terrainSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  terrainCreer$ = this.terrainCreerSource.asObservable();
  terrainModif$ = this.terrainModifSource.asObservable();
  terrainFiltre$ = this.terrainFiltreSource.asObservable();
  terrainSupprime$ = this.terrainSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllFlashTerrain(): Observable<Resultat<FlashTerrain[]>> {
    return this.http.get<Resultat<FlashTerrain[]>>(`${environment.apiUrl}/api/flashTerrain`);
  }

  ajoutFlashTerrain(flashTerrain: FlashTerrain): Observable<Resultat<FlashTerrain>> {
    console.log('methode du service qui ajoute  flash terrain', flashTerrain);
    return this.http.post<Resultat<FlashTerrain>>(`${environment.apiUrl}/api/flashTerrain`, flashTerrain);
  }
  modifFlashTerrain(flashTerrain: FlashTerrain): Observable<Resultat<FlashTerrain>> {
    console.log('methode du service qui modifier flash terrain', flashTerrain);
    return this.http.put<Resultat<FlashTerrain>>(`${environment.apiUrl}/api/flashTerrain`, flashTerrain);
  }
  getFlashTerrainById(id: FlashTerrain): Observable<Resultat<FlashTerrain>> {
    return this.http.get<Resultat<FlashTerrain>>(`${environment.apiUrl}/api/flashTerrain/${id}`);
  }
  supprimerFlashTerrain(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/flashTerrain/${id}`);

  }
  uploadImage(formData, id): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/uploadf/?id=${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  terrainCreer(res: Resultat<FlashTerrain>) {
    console.log('categorie a ete  creer correctement essaie source');
    this.terrainCreerSource.next(res);
  }

  terrainModif(res: Resultat<FlashTerrain>) {
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
