import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../models/Categorie';
import {CategorieService} from '../../service/categorie.service';
import {Terrain} from '../../models/Terrain';
import {TerrainService} from '../../service/terrain.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {VilleService} from '../../service/ville.service';
import {Ville} from '../../models/Ville';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-terrain',
  templateUrl: './add-terrain.component.html',
  styleUrls: ['./add-terrain.component.scss']
})
export class AddTerrainComponent implements OnInit, AfterViewInit {
  terrainForm: FormGroup;
  editMode: boolean;
  terrainId: number;
  selectedFile: File = null;
  file: any;
  progress = 0;
  selectedFiles: FileList;
  currentFile: File;
  fileInfos: Observable<any>;
  message = '';
  categories: Categorie[];
  categorie: Categorie;
  villes: Ville[];
  ville: Ville;
  terrain: Terrain;
  selected: string;
  constructor(private  fb: FormBuilder, private terrainService: TerrainService,
              private categorieService: CategorieService,
              private villeService: VilleService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AddTerrainComponent>,
              private  router: Router, private _snackBar: MatSnackBar) {

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
ngAfterViewInit(): void {
    if (this.categorie && this.ville){
      this.terrainForm = this.fb.group({
        libelle: ['', Validators.required],
        description: ['', Validators.required],
        prix: ['', Validators.required],
        categorie: this.fb.group({
          id: this.categorie.id,
          version: this.categorie.version,
          nom: '',
          description: this.categorie.description
        }),
        ville: this.fb.group({
          id: this.ville.id,
          version: this.ville.version,
          libelle: ''
        })
      });
    }

}

  initForm(): void{
   if (this.ville && this.categorie){

   }
    this.terrainForm = this.fb.group({
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
     let formValue = this.terrainForm.value;
     let terrain: Terrain = {
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
       type: 'TE'
     };

      console.log('Voir les infos du terrain ', terrain);
      this.terrainService.ajoutTerrain(terrain).subscribe(data => {
      console.log('terrain doc enregistre avec succes', data);
      this.terrainId = data.body.id;
      this.terrain = data.body;
      console.log(this.terrainId);
      if (this.terrainId) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        const formData = new FormData();
        formData.append('image_terrain', this.currentFile);
        console.log('formdata', formData);
        this.terrainService.uploadImage(formData, this.terrainId).subscribe(
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
