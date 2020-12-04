import {Routes} from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {ListCategorieComponent} from '../../categorie/list-categorie/list-categorie.component';
import {ListEmployeComponent} from '../../employe/list-employe/list-employe.component';
import {ListeterrainComponent} from '../../terrain/listeTerrain/listeterrain.component';
import {ListeFlashTerrainComponent} from '../../flashTerrain/liste-flash-terrain/liste-flash-terrain.component';
import {ListeVilleComponent} from '../../ville/liste-ville/liste-ville.component';
import {ListeDepartementComponent} from '../../departement/liste-departement/liste-departement.component';
import {ListeDemandeComponent} from '../../demande/liste-demande/liste-demande.component';
import {ListeTerrainAcheterComponent} from '../../terrainAcheter/liste-terrain-acheter/liste-terrain-acheter.component';
import {ListeProspectComponent} from '../../prospect/liste-prospect/liste-prospect.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'categorie',   component: ListCategorieComponent },
    { path: 'terrain',   component: ListeterrainComponent},
    { path: 'employe',   component: ListEmployeComponent },
    { path: 'flashTerrain',   component: ListeFlashTerrainComponent },
    { path: 'ville',   component: ListeVilleComponent },
    { path: 'departement',   component: ListeDepartementComponent },
    { path: 'demande',   component: ListeDemandeComponent },
    { path: 'terrainAcheter',   component: ListeTerrainAcheterComponent },
    { path: 'prospect',   component: ListeProspectComponent },
];
