import {Component, Inject, OnInit} from '@angular/core';
import {Categorie} from '../../models/Categorie';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {CategorieService} from '../../service/categorie.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TerrainAcheter} from '../../models/TerrainAcheter';
import {TerrainAcheterService} from '../../service/terrain-acheter.service';
import {Produit} from '../../models/Produit';
import {TerrainService} from '../../service/terrain.service';
import {Terrain} from '../../models/Terrain';

@Component({
  selector: 'app-update-terrain-acheter',
  templateUrl: './update-terrain-acheter.component.html',
  styleUrls: ['./update-terrain-acheter.component.scss']
})
export class UpdateTerrainAcheterComponent implements OnInit {

  terrainAcheter: TerrainAcheter;
  terrains: Produit;
  checked = false;
  updateTerrainForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private terrainAcheterService: TerrainAcheterService,
               private terrainService: TerrainService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: TerrainAcheter,
               private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.terrainAcheterService.getTerrainAcheterById(this.data['terrainAcheter'])
      .subscribe(res => {
        console.log(res.body);
        this.terrains = res.body.terrains;
        this.updateTerrainForm = this.fb.group({
          id: this.terrains.id,
          version: this.terrains.version ,
          libelle: this.terrains.libelle,
          paye: ''
        });
      });
  }

  onSubmit() {
    let formValue = this.updateTerrainForm.value;

    this.terrains = this.updateTerrainForm.value;
    console.log(this.terrains);
    this.terrainService.modifTerrain(this.terrains).subscribe(data => {
      if (data){
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.updateTerrainForm.reset();
  }
}
