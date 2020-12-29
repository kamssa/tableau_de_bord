import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable} from 'rxjs';
import {Resultat} from '../models/resultat';
import {Terrain} from '../models/Terrain';
import {environment} from '../../environments/environment';
import {Image} from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getImageByIdTerrain(id: number): Observable<Resultat<Image>> {
    return this.http.get<Resultat<Image>>(`${environment.apiUrl}/cloudinary/image/${id}`);
  }

}
