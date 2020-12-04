import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {Personne} from '../models/Personne';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  submitted = false;
  loading = false;
  error = '';
  result: any;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isuAth: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
// convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  initForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

  }

  onSubmit(): void{
    this.submitted = true;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.loading = true;
    const  admin = new Personne(
      null,
      null,
      null,
      null,
      null,
      email,
      password,
      null,
      null,
      null,
      null,
      'AD',

    );
    console.log(admin);
    this.authService.login(admin).subscribe(data => {
        if (data.body){
          this.snackBar.open('Succès de la connexion!', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }else {
          this.isuAth = false;
        }
        this.router.navigate(['dashboard']);
      },
      error => {
        this.error = "email ou mot de passe oublié";
        this.loading = false;
      });
  }

}
