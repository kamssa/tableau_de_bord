import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../models/Categorie';
import {CategorieService} from '../../service/categorie.service';
import {Location} from '@angular/common';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TerrainAcheter} from '../../models/TerrainAcheter';
import {TerrainAcheterService} from '../../service/terrain-acheter.service';
import {TerrainService} from '../../service/terrain.service';
import {MembreService} from '../../service/membre.service';
import {Terrains} from '../../models/Terrains';
import {Personne} from '../../models/Personne';
import {Membre} from '../../models/Membre';
import {ClientService} from '../../service/client.service';

@Component({
  selector: 'app-add-terrain-acheter',
  templateUrl: './add-terrain-acheter.component.html',
  styleUrls: ['./add-terrain-acheter.component.scss']
})
export class AddTerrainAcheterComponent implements OnInit {

  achatForm: FormGroup;
  terrainAcheter: TerrainAcheter;
  terrainAchatId: number;
  terrains: Terrains[];
  terrain: Terrains;
  personnes: Personne[];
  personne: Personne;

  private dialogConfig;
  constructor(public fb: FormBuilder,
              private  terrainAcheterService: TerrainAcheterService,
              private terrainService: TerrainService,
              private clientService: ClientService,
              private location: Location,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<AddTerrainAcheterComponent>,
              private  router: Router) { }

  ngOnInit(): void {
    this.terrainService.getAllTerrain().subscribe(data => {
    this.terrains = data.body;
    });
    this.clientService.getAllClient().subscribe(data => {
      console.log(data.body);
      this.personnes = data.body;
    });
    this.initForm();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }
  initForm() {
    this.achatForm = this.fb.group({

      terrains: this.fb.group({
        libelle: ''
      }),
      personne: this.fb.group({
        nomComplet: '',

      })

    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.achatForm.controls[controlName].hasError(errorName);
  }
  public createAchat = (createAchatFormValue) => {
    console.log('voir info', this.achatForm.value);
    if (this.achatForm.valid) {
      this.onSubmit(createAchatFormValue);
    }
  }

  onSubmit(createAchatFormValue): void{
    console.log('voir les valeurs assignés', createAchatFormValue.value);
    let  terrainAcheter : TerrainAcheter = {
      terrains: this.terrain,
      personne: this.personne
    };

    this.terrainAcheterService.ajoutTerrainAcheter(terrainAcheter).subscribe(data => {
        console.log('categorie', data.body);
        this.terrainAcheter = data.body;
        this.dialogRef.close();
        this.router.navigate(['terrainAcheter']);
      }, error => {
        this.location.back();

      }
    );
    // this.categorieForm.reset();
  }

  greetTerrains(event) {
    console.log(event.value);
    this.terrainService.getTerrainById(event.value).subscribe(data => {
      this.terrain = data.body;
      console.log('Valeur de retour de terrain', this.terrain);

    });
  }

  greetPersonne(event) {
    console.log(event.value);
    this.clientService.getMembreById(event.value).subscribe(data => {
      this.personne = data.body;
      console.log('Valeur de retour de terrain', this.personne);

    });
  }
}
