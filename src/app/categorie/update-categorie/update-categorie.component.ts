import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Categorie} from '../../models/Categorie';
import {CategorieService} from '../../service/categorie.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.scss']
})
export class UpdateCategorieComponent implements OnInit {
 categorie: Categorie;
  catForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private categorieService: CategorieService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Categorie,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateCategorieComponent>) { }

  ngOnInit(): void {
    this.categorieService.getCategorieById(this.data['categorie'])
      .subscribe(res => {
        console.log(res.body);
        this.categorie = res.body;
        this.catForm = this.fb.group({
          id: this.categorie.id,
          version: this.categorie.version ,
          nom: this.categorie.nom,
          description: this.categorie.description
        });
      });
  }

  onSubmit() {
    let formValue = this.catForm.value;

    this.categorie = this.catForm.value;
    this.categorieService.modifCategorie(this.categorie).subscribe(data => {
      if (data){
        this.categorie = data.body;
        this.dialogRef.close(this.categorie);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
    });
    this.catForm.reset();
  }
}
