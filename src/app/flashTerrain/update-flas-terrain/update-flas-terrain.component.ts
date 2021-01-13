import {Component, Inject, OnInit} from '@angular/core';
import {Terrain} from '../../models/Terrain';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {TerrainService} from '../../service/terrain.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FlashTerrain} from '../../models/FlashTerrain';
import {FlashService} from '../../service/flash.service';

@Component({
  selector: 'app-update-flas-terrain',
  templateUrl: './update-flas-terrain.component.html',
  styleUrls: ['./update-flas-terrain.component.scss']
})
export class UpdateFlasTerrainComponent implements OnInit {
  flashTerrain: FlashTerrain;
  flashForm: FormGroup;
  flashTerrains: FlashTerrain[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private flashService: FlashService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: FlashTerrain,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateFlasTerrainComponent>) { }

  ngOnInit(): void {
    this.flashService.getFlashTerrainById(this.data['flashTerrain'])
      .subscribe(res => {
        console.log(res.body);
        this.flashTerrain = res.body;
        this.flashForm = this.fb.group({
          id: this.flashTerrain.id,
          version: this.flashTerrain.version,
          libelle: this.flashTerrain.libelle,
          prix: this.flashTerrain.prix,
          prixParMettreCarre: this.flashTerrain.prixParMettreCarre,
          superficie: this.flashTerrain.superficie,
          description: this.flashTerrain.description,
          type: this.flashTerrain.type,
          categorie: this.flashTerrain.categorie,
          ville: this.flashTerrain.ville,
          path: this.flashTerrain.path
        });
      });
  }

  onSubmit() {
    let formValue = this.flashForm.value;
    this.flashTerrain = this.flashForm.value;
    this.flashService.modifFlashTerrain(this.flashTerrain).subscribe(data => {
      if (data){
        this.flashTerrain = data.body;
        this.dialogRef.close(this.flashTerrain);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.flashForm.reset();
  }

}
