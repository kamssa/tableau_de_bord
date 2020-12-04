import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TerrainAcheter} from '../../models/TerrainAcheter';
import {TerrainAcheterService} from '../../service/terrain-acheter.service';
import {AddTerrainAcheterComponent} from '../add-terrain-acheter/add-terrain-acheter.component';
import {UpdateTerrainAcheterComponent} from '../update-terrain-acheter/update-terrain-acheter.component';

@Component({
  selector: 'app-liste-terrain-acheter',
  templateUrl: './liste-terrain-acheter.component.html',
  styleUrls: ['./liste-terrain-acheter.component.scss']
})
export class ListeTerrainAcheterComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'numero', 'image', 'categorie', 'nomComplet', 'telephone', 'update', 'supprimer'];
  dataSource: MatTableDataSource<TerrainAcheter>;
  terrainAcheters: TerrainAcheter[];
  terrainAcheter: TerrainAcheter;
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private terrainAcheterService: TerrainAcheterService,
              public dialog: MatDialog, private router: Router) {
  }
  ngOnInit(): void {
    this.terrainAcheterService.getAllTerrainAcheter().subscribe(data => {
      this.terrainAcheters = data.body;
      console.log('Voir ce qui se passe', data.body);
      if(data.body){
        this.terrainAcheters.forEach(value => {
          let opp : TerrainAcheter = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<TerrainAcheter>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTerrainAcheterComponent, {
      width: '650px',
      data: this.terrainAcheter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.terrainAcheter = result;
      this.router.navigate(['terrainAcheter']);

    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateTerrainAcheterComponent,{
      data: {
        terrainAcheter: id
      }
    });
  }
  redirectToDelete(id: any) {
    if (confirm("Voulez vous vraiment supprimer le terrain acheté ?")) {
      this.terrainAcheterService.supprimerTerrainAcheter(id).subscribe(data => {
        this.router.navigate(['terrainAcheter']);
      });
    }
  }

}
