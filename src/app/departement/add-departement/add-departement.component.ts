import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Categorie} from '../../models/Categorie';
import {CategorieService} from '../../service/categorie.service';
import {Location} from '@angular/common';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Departement} from '../../models/Departement';
import {DepartementService} from '../../service/departement.service';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.scss']
})
export class AddDepartementComponent implements OnInit {

  depForm: FormGroup;
  departement: Departement;
  depId: number;

  private dialogConfig;
  constructor(public fb: FormBuilder,
              private  departementService: DepartementService,
              private location: Location,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<AddDepartementComponent>,
              private  router: Router) { }

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
    this.depForm = this.fb.group({
      libelle: new FormControl('',[Validators.required] ),
      description: new FormControl(''),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.depForm.controls[controlName].hasError(errorName);
  }
  public createdep = (createDepFormValue) => {
    console.log('voir info', this.depForm.value);
    if (this.depForm.valid) {
      this.onSubmit(createDepFormValue);
    }
  }

  onSubmit(createDepFormValue): void{
    console.log('voir les valeurs assignés', createDepFormValue.value);
    let  dep : Departement = {
      libelle: createDepFormValue.libelle,
      description: createDepFormValue.description,
    };

    this.departementService.ajoutDepartement(dep).subscribe(data => {
        console.log('categorie', data.body);
        this.departement = data.body;
        this.dialogRef.close();
        this.router.navigate(['departement']);
      }, error => {
        this.location.back();

      }
    );
    // this.categorieForm.reset();
  }

}
