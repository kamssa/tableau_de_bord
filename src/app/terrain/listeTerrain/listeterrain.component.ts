import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

import {Terrain} from '../../models/Terrain';
import {TerrainService} from '../../service/terrain.service';
import {AddTerrainComponent} from '../add-terrain/add-terrain.component';
import {UpdateTerrainComponent} from '../update-terrain/update-terrain.component';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Categorie} from '../../models/Categorie';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {ImageService} from '../../service/image.service';

@Component({
  selector: 'app-listeterrain',
  templateUrl: './listeterrain.component.html',
  styleUrls: ['./listeterrain.component.scss']
})
export class ListeterrainComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'image', 'categorie', 'update', 'supprimer'];
  dataSource: MatTableDataSource<Terrain>;
  terrains: Terrain[];
  terrain: Terrain;
  receptacle: any = [];
  url: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private terrainService: TerrainService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService,
              private imageService: ImageService) {
  }
  ngOnInit(): void {

    this.terrainService.getAllTerrain().subscribe(data => {
      this.terrains = data.body;
      console.log('Voir ce qui se passe', data.body);
      if (data.body){
        this.terrains.forEach(value => {
          let opp : Terrain = value;
          /*this.imageService.getImageByIdTerrain(opp.id).subscribe(resultat => {
            console.log('voir image', resultat);
            this.terrainService.downloadImage(resultat.body.imageId).subscribe(res => {
              console.log(res.url);
              opp.path = res.url;
            });

          });*/
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
    const dialogRef = this.dialog.open(AddTerrainComponent, {
      width: '650px',
      data: this.terrain
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.terrain = result;
      if (this.terrain.path){
        this.receptacle.unshift(this.terrain);
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Categorie>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateTerrainComponent,{
      data: {
        terrain: id
      }
    });
  }
  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.terrainService.supprimerTerrain(id).subscribe(data => {
          console.log(data);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',

          });
        });

      }
    });

  }

}
