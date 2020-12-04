import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Categorie} from '../../models/Categorie';
import {CategorieService} from '../../service/categorie.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FlashService} from '../../service/flash.service';
import {FlashTerrain} from '../../models/FlashTerrain';
import {Ville} from '../../models/Ville';
import {VilleService} from '../../service/ville.service';


@Component({
  selector: 'app-add-flash-terrain',
  templateUrl: './add-flash-terrain.component.html',
  styleUrls: ['./add-flash-terrain.component.scss']
})
export class AddFlashTerrainComponent implements OnInit {
  flashTerrainForm: FormGroup;
  editMode: boolean;
  flahTerrainId: number;
  selectedFile: File = null;
  file: any;
  progress = 0;
  selectedFiles: FileList;
  currentFile: File;
  fileInfos: Observable<any>;
  message = '';
  categories: Categorie[];
  villes: Ville[];
  categorie: Categorie;
  ville: Ville;

  constructor(private  fb: FormBuilder, private flashService: FlashService,
              private categorieService: CategorieService,
              private villeService: VilleService) {
  }
  ngOnInit(): void{
    this.categorieService.getAllCategorie().subscribe(data => {
      console.log(data);
      this.categories = data.body;
    });
    this.villeService.getAllVille().subscribe(data => {
      console.log(data);
      this.villes = data.body;
    });
    this.initForm();
  }

  initForm(): void{
    this.flashTerrainForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      categorie: this.fb.group({
        id: '',
        version: '',
        nom: '',
        description: ''
      }),
      ville: this.fb.group({
        id: '',
        version: '',
        libelle: ''
      })
    });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  onFileSelected(event) {
    this.selectedFile = (event.target.files[0] as File);
    console.log('Voir le ichier selectionne', this.selectedFile);
  }
  onSubmit(): void {
    let formValue = this.flashTerrainForm.value;
    let flashTerrain: FlashTerrain = {
      libelle : formValue.libelle,
      description: formValue.description,
      prix: formValue.prix,
      path: this.selectedFiles.item(0).name,
      categorie: {
        id: this.categorie.id,
        version: this.categorie.version,
        nom: formValue.categorie.nom,
        description: this.categorie.description},
        ville: {
        id: this.ville.id,
        version: this.ville.version,
        libelle: formValue.ville.libelle
      },
      type: 'FT'
    };
    console.log('Voir les infos du terrain ', flashTerrain);
    this.flashService.ajoutFlashTerrain(flashTerrain).subscribe(data => {
      console.log('terrain doc enregistre avec succes', data);
      this.flahTerrainId = data.body.id;
      console.log(this.flahTerrainId);
      if (this.flahTerrainId) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        const formData = new FormData();
        formData.append('image_flash', this.currentFile);
        console.log('formdata', formData);
        this.flashService.uploadImage(formData, this.flahTerrainId).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          err => {
            this.progress = 0;
            this.message = 'Le fichier ne peut etre archivé !';
            this.currentFile = undefined;
          });
        this.selectedFiles = undefined;
      }

    }, err => {
      console.log('échec operation');
    });

  }

  annuler() {

  }


  greetVille(event) {

    console.log('Voir le select', event.value);
    this.villeService.getVilleByLibelle(event.value).subscribe(data => {
      this.ville = data.body;
      console.log('valeur de retour de ville', this.ville);
    });

  }
  greetCat(event){
    console.log(event.value);
    this.categorieService.getCategorieByNom(event.value).subscribe(data => {
      this.categorie = data.body;
      console.log('Valeur de retour de categorie', this.categorie);

    });
  }
}
