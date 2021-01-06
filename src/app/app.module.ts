import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from './components/components.module';
import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';
import {MaterialModule} from './material/material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {JwtInterceptor} from './helper/jwt.interceptor';
import {ErrorInterceptor} from './helper/error.interceptor';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddTerrainComponent } from './terrain/add-terrain/add-terrain.component';
import { ListeterrainComponent } from './terrain/listeTerrain/listeterrain.component';
import { UpdateCategorieComponent } from './categorie/update-categorie/update-categorie.component';
import { UpdateTerrainComponent } from './terrain/update-terrain/update-terrain.component';
import { UpdateEmployeComponent } from './employe/update-employe/update-employe.component';
import { PubliciteComponent } from './publicite/publicite/publicite.component';
import { FlashTerrainComponent } from './flashTerrain/flash-terrain/flash-terrain.component';
import { ListeFlashTerrainComponent } from './flashTerrain/liste-flash-terrain/liste-flash-terrain.component';
import { AddFlashTerrainComponent } from './flashTerrain/add-flash-terrain/add-flash-terrain.component';
import { UpdateFlasTerrainComponent } from './flashTerrain/update-flas-terrain/update-flas-terrain.component';
import { DemandeComponent } from './demande/demande/demande.component';
import { AddVilleComponent } from './ville/add-ville/add-ville.component';
import { ListeVilleComponent } from './ville/liste-ville/liste-ville.component';
import { UpdateVilleComponent } from './ville/update-ville/update-ville.component';
import { AdminComponent } from './service/admin/admin.component';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { ListeDepartementComponent } from './departement/liste-departement/liste-departement.component';
import { UpdateDepartementComponent } from './departement/update-departement/update-departement.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddDemandeComponent } from './demande/add-demande/add-demande.component';
import { ListeDemandeComponent } from './demande/liste-demande/liste-demande.component';
import { UpdateDemandeComponent } from './demande/update-demande/update-demande.component';
import { ListeTerrainGeoComponent } from './terrainGeo/liste-terrain-geo/liste-terrain-geo.component';
import { AddTerrainGeoComponent } from './terrainGeo/add-terrain-geo/add-terrain-geo.component';
import { UpdateTerrainGeoComponent } from './terrainGeo/update-terrain-geo/update-terrain-geo.component';
import { AddTerrainAcheterComponent } from './terrainAcheter/add-terrain-acheter/add-terrain-acheter.component';
import { ListeTerrainAcheterComponent } from './terrainAcheter/liste-terrain-acheter/liste-terrain-acheter.component';
import { UpdateTerrainAcheterComponent } from './terrainAcheter/update-terrain-acheter/update-terrain-acheter.component';
import { ListeProspectComponent } from './prospect/liste-prospect/liste-prospect.component';
import { ListeMembreComponent } from './membre/liste-membre/liste-membre.component';
import { AddProspectComponent } from './prospect/add-prospect/add-prospect.component';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import { MatConfirmDialogComponent } from './service/shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { AddImmobilierComponent } from './immobilier/add-immobilier/add-immobilier.component';
import { RoleComponent } from './role/role/role.component';
import { PubportailComponent } from './pubportail/pubportail/pubportail.component';
import { AddpubportailComponent } from './pubportail/addpubportail/addpubportail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddMaisonComponent } from './maison/add-maison/add-maison.component';
import { ListMaisonComponent } from './maison/list-maison/list-maison.component';
import { UpdateMaisonComponent } from './maison/update-maison/update-maison.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTerrainComponent,
    ListeterrainComponent,
    UpdateCategorieComponent,
    UpdateTerrainComponent,
    UpdateEmployeComponent,
    PubliciteComponent,
    FlashTerrainComponent,
    ListeFlashTerrainComponent,
    AddFlashTerrainComponent,
    UpdateFlasTerrainComponent,
    DemandeComponent,
    AddVilleComponent,
    ListeVilleComponent,
    UpdateVilleComponent,
    AdminComponent,
    AddDepartementComponent,
    ListeDepartementComponent,
    UpdateDepartementComponent,
    ListClientComponent,
    AddDemandeComponent,
    ListeDemandeComponent,
    UpdateDemandeComponent,
    ListeTerrainGeoComponent,
    AddTerrainGeoComponent,
    UpdateTerrainGeoComponent,
    AddTerrainAcheterComponent,
    ListeTerrainAcheterComponent,
    UpdateTerrainAcheterComponent,
    ListeProspectComponent,
    ListeMembreComponent,
    AddProspectComponent,
    MatConfirmDialogComponent,
    AddImmobilierComponent,
    RoleComponent,
    PubportailComponent,
    AddpubportailComponent,
    AddMaisonComponent,
    ListMaisonComponent,
    UpdateMaisonComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AdminLayoutModule,
    MaterialModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
