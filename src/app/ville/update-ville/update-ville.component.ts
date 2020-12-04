import {Component, Inject, OnInit} from '@angular/core';
import {Categorie} from '../../models/Categorie';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {CategorieService} from '../../service/categorie.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VilleService} from '../../service/ville.service';
import {Ville} from '../../models/Ville';

@Component({
  selector: 'app-update-ville',
  templateUrl: './update-ville.component.html',
  styleUrls: ['./update-ville.component.scss']
})
export class UpdateVilleComponent implements OnInit {
  ville: Ville;
  villeForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private villeService: VilleService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Categorie,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateVilleComponent>) { }

  ngOnInit(): void {
    this.villeService.getVilleById(this.data['ville'])
      .subscribe(res => {
        console.log(res.body);
        this.ville = res.body;
        this.villeForm = this.fb.group({
          id: this.ville.id,
          version: this.ville.version ,
          libelle: this.ville.libelle,
        });
      });
  }

  onSubmit() {
    let formValue = this.villeForm.value;

    this.ville = this.villeForm.value;
    this.villeService.modifVille(this.ville).subscribe(data => {
      if (data){
        this.ville = data.body;
        this.dialogRef.close(this.ville);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });

  }
}
