import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Categorie} from '../../models/Categorie';
import {CategorieService} from '../../service/categorie.service';
import {MatDialog} from '@angular/material/dialog';
import {AddCategorieComponent} from '../add-categorie/add-categorie.component';
import {Router} from '@angular/router';
import {UpdateCategorieComponent} from '../update-categorie/update-categorie.component';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';



@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'update', 'delete'];
  dataSource: MatTableDataSource<Categorie>;
  categories: Categorie[];
  categorie: Categorie;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private categorieService: CategorieService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.categorieService.getAllCategorie().subscribe(data => {
      this.categories = data.body;
      this.categories.forEach(value => {
        let opp : Categorie = value;
        this.receptacle.push(opp);

      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Categorie>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategorieComponent, {
      width: '650px',
      data: this.categorie
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.categorie = result;
      this.receptacle.unshift(this.categorie);
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Categorie>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(UpdateCategorieComponent,{
      data: {
        categorie: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.categorie = result;
      // this.receptacle
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Categorie>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }
  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(res);
        this.categorieService.supprimerCategorie(id).subscribe(data => {
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: 'top',

          });
        });

      }
    });

  }

}
