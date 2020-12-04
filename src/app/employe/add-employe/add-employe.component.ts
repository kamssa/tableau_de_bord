import { Component, OnInit } from '@angular/core';
import {SuccessDialogComponent} from '../../service/shared/dialogs/success-dialog/success-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DepartementService} from '../../service/departement.service';
import {MatDialog} from '@angular/material/dialog';
import {Departement} from '../../models/Departement';
import {Employe} from '../../models/Employe';
import {AuthService} from '../../service/auth.service';
import {EmployeService} from '../../service/employe.service';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent implements OnInit {
  employeForm: FormGroup;
  departements: Departement[];
  departement: Departement;
  private dialogConfig;
  titre: string;
  titres = [
    {libelle: 'Mlle', name: 'Mlle'},
    {libelle: 'Mme', name: 'Mme'},
    {libelle: 'Mr', name: 'Mr'}
  ];
  constructor(private fb: FormBuilder,
              private employeService: EmployeService, private router: Router,
              private departementService: DepartementService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.departementService.getAllDepartement().subscribe(data => {
      console.log(data);
      this.departements = data.body;
      console.log(this.departements);
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
    this.initForm();
  }

  initForm(): void {
    this.employeForm = this.fb.group({
      titre: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      fonction: new FormControl(''),
      departement: this.fb.group(  {
        libelle: ['', Validators.required],
      })
    });
  }
  onSubmit(employeFormValue) {
    console.log(this.employeForm.value);
    let  employe : Employe = {
      titre: this.titre,
      nom: employeFormValue.nom,
      prenom: employeFormValue.prenom,
      email: employeFormValue.email,
      password: employeFormValue.password,
      fonction: employeFormValue.fonction,
      departement: {
        id: this.departement.id,
        version: this.departement.version,
        libelle: this.departement.libelle
      },
      type: 'EM'
    };
    this.employeService.ajoutEmploye(employe).subscribe(result => {
      console.log('reussi', result.body);
      this.router.navigate(['employe']);
    });

  }

  greetDep(event) {
    console.log(event.value);
    this.departementService.getDepatementById(event.value).subscribe(data => {
      this.departement = data.body;
      console.log('Valeur de retour de departement', this.departement);

    });
  }

  greetTitre(event) {
    console.log(event.value);
    this.titre = event.value;
  }
}
