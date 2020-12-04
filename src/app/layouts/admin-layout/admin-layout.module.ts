import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutComponent} from './admin-layout.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ConnexionComponent} from '../../connexion/connexion.component';
import {CategorieComponent} from '../../categorie/categorie/categorie.component';
import {ListCategorieComponent} from '../../categorie/list-categorie/list-categorie.component';
import {AddCategorieComponent} from '../../categorie/add-categorie/add-categorie.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {AddEmployeComponent} from '../../employe/add-employe/add-employe.component';
import {ListEmployeComponent} from '../../employe/list-employe/list-employe.component';
import {SuccessDialogComponent} from '../../service/shared/dialogs/success-dialog/success-dialog.component';
import {ErrorDialogComponent} from '../../service/shared/dialogs/error-dialog/error-dialog.component';
import {MaterialModule} from '../../material/material.module';
import {ComponentsModule} from '../../components/components.module';





@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    ConnexionComponent,
    CategorieComponent,
    ListCategorieComponent,
    AddCategorieComponent,
    UserProfileComponent,
    AddEmployeComponent,
    ListEmployeComponent,
    SuccessDialogComponent,
    ErrorDialogComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule


  ]
})
export class AdminLayoutModule { }
