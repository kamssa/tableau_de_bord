import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Terrain} from '../../models/Terrain';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TerrainService} from '../../service/terrain.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AddDemandeComponent} from '../add-demande/add-demande.component';
import {UpdateDemandeComponent} from '../update-demande/update-demande.component';
import {DemandeService} from '../../service/demande.service';
import {Demande} from '../../models/Demande';

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.scss']
})
export class ListeDemandeComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'numero', 'image', 'categorie', 'nomComplet', 'telephone', 'update', 'supprimer'];
  dataSource: MatTableDataSource<Terrain>;
  demandes: Demande[];
  demande: Demande;
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private demandeService: DemandeService,
              public dialog: MatDialog, private router: Router) {
  }
  ngOnInit(): void {
    this.demandeService.getAllDemande().subscribe(data => {
      this.demandes = data.body;
      console.log('Voir ce qui se passe', data.body);
      if(data.body){
        this.demandes.forEach(value => {
          let opp : Demande = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Terrain>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDemandeComponent, {
      width: '650px',
      data: this.demande
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.demande = result;
      this.router.navigate(['terrain']);

    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateDemandeComponent,{
      data: {
        terrain: id
      }
    });
  }
  redirectToDelete(id: any) {
    if (confirm("Voulez vous vraiment supprimer la demande ?")) {
      this.demandeService.supprimerDemande(id).subscribe(data => {
        this.router.navigate(['terrain']);
      });
    }
  }

}
