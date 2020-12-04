import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employe} from '../models/Employe';
import {EmployeService} from '../service/employe.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  employeForm: FormGroup;


  constructor(private fb: FormBuilder, private managerService: EmployeService) {
  }

  ngOnInit(): void {

    this.initForm();
  }

  initForm(): void {
    this.employeForm = this.fb.group({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      fonction: new FormControl(''),
      adresse: this.fb.group({
        boitePostal: [''],
        mail: [''],
        pays: [''],
        ville: [''],
        siteWeb: [''],
        telephone: ['', Validators.required]
      }),

    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.employeForm.controls[controlName].hasError(errorName);
  }
  public createEmploye = (employeFormValue) => {
    if (this.employeForm.valid) {
      this.onSubmit(employeFormValue);
    }
  }
  onSubmit(employeFormValue) {
    console.log(this.employeForm.value);
    let  employe : Employe = {
      nom: employeFormValue.nom,
      prenom: employeFormValue.prenom,
      email: employeFormValue.email,
      password: employeFormValue.password,
      fonction: employeFormValue.fonction,
      type: 'EMPLOYE',
    };


  }
}
