import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Terrain} from '../../models/Terrain';
import {TerrainService} from '../../service/terrain.service';

@Component({
  selector: 'app-update-terrain',
  templateUrl: './update-terrain.component.html',
  styleUrls: ['./update-terrain.component.scss']
})
export class UpdateTerrainComponent implements OnInit {
  terrain: Terrain;
  tForm: FormGroup;
  terrains: Terrain[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private terrainService: TerrainService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Terrain,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateTerrainComponent>) { }

  ngOnInit(): void {
    this.terrainService.getTerrainById(this.data['terrain'])
      .subscribe(res => {
        console.log(res.body);
        this.terrain = res.body;
        this.tForm = this.fb.group({
          id: this.terrain.id,
          version: this.terrain.version,
          libelle: this.terrain.libelle,
          description: this.terrain.description,
          type: this.terrain.type,
          categorie: this.terrain.categorie,
          ville: this.terrain.ville
        });
      });
  }

  onSubmit() {
    let formValue = this.tForm.value;
    this.terrain = this.tForm.value;
    this.terrainService.modifTerrain(this.terrain).subscribe(data => {
      if (data){
        this.terrain = data.body;
        this.dialogRef.close(this.terrain);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.tForm.reset();
  }
}
