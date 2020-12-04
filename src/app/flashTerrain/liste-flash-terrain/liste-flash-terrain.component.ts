import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FlashTerrain} from '../../models/FlashTerrain';
import {FlashService} from '../../service/flash.service';
import {AddFlashTerrainComponent} from '../add-flash-terrain/add-flash-terrain.component';
import {UpdateFlasTerrainComponent} from '../update-flas-terrain/update-flas-terrain.component';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';

@Component({
  selector: 'app-liste-flash-terrain',
  templateUrl: './liste-flash-terrain.component.html',
  styleUrls: ['./liste-flash-terrain.component.scss']
})
export class ListeFlashTerrainComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'image', 'categorie', 'update', 'delete'];
  dataSource: MatTableDataSource<FlashTerrain>;
  flashTerrains: FlashTerrain[];
  flashTerrain: FlashTerrain;
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private flashService: FlashService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {
    this.flashService.getAllFlashTerrain().subscribe(data => {
      this.flashTerrains = data.body;
      console.log('Voir ce qui se passe', data.body);
      if(data.body){
        this.flashTerrains.forEach(value => {
          let opp : FlashTerrain = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<FlashTerrain>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddFlashTerrainComponent, {
      width: '650px',
      data: this.flashTerrain
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.flashTerrain = result;
      this.router.navigate(['terrain']);

    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateFlasTerrainComponent,{
      data: {
        terrain: id
      }
    });
  }
  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(res);
        this.flashService.supprimerFlashTerrain(id).subscribe(data => {
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',

          });
        });

      }
    });

  }


}
