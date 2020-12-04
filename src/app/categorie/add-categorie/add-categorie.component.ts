import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../models/Categorie';
import {CategorieService} from '../../service/categorie.service';
import {Location} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core';
import {MyErrorStateMatcher} from '../../helper/MyErrorStateMatcher';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  categorieForm: FormGroup;
  categorie: Categorie;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;
  matcher = new MyErrorStateMatcher();
  nom = new FormControl('',
  [Validators.required] );
  description = new FormControl('');
  error = '';

  constructor(public fb: FormBuilder,
              private  categorieService: CategorieService,
              private location: Location,
              public dialogRef: MatDialogRef<AddCategorieComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) { }

  ngOnInit(): void {
    this.initForm();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }

  initForm() {
    this.categorieForm = this.fb.group({
      nom: new FormControl('',[Validators.required] ),
      description: new FormControl(''),
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.categorieForm.controls;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.categorieForm.controls[controlName].hasError(errorName);
  }
  public createCategorie = (createCategorieFormValue) => {
    console.log('voir info', this.categorieForm.value);
    if (this.categorieForm.valid) {
      this.onSubmit(createCategorieFormValue);
    }
  }

  onSubmit(createCategorieFormValue): void{
    console.log('voir les valeurs assignés', createCategorieFormValue.value);
    let  categorie : Categorie = {
      nom: createCategorieFormValue.nom,
      description: createCategorieFormValue.description,
    };
    this.categorieService.ajoutCategorie(categorie).subscribe(data => {
      this.categorie = data.body;
      console.log(data);
      if (data.status === 0){
        this.dialogRef.close(this.categorie);
        this._snackBar.open('Succès de l\'opération!', '', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }else {
        this.error = data.messages[0];
        console.log( data.messages);
      }

      }, error => {
        this.error = error;
        console.log(this.error);

    }
    );
    this.router.navigate(['categorie']);
  }
}
