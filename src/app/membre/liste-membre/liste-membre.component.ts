import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Categorie} from '../../models/Categorie';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Admin} from '../../models/Admin';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CategorieService} from '../../service/categorie.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AdminService} from '../../service/admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AddCategorieComponent} from '../../categorie/add-categorie/add-categorie.component';
import {UpdateCategorieComponent} from '../../categorie/update-categorie/update-categorie.component';
import {MembreService} from '../../service/membre.service';
import {Membre} from '../../models/Membre';

@Component({
  selector: 'app-liste-membre',
  templateUrl: './liste-membre.component.html',
  styleUrls: ['./liste-membre.component.scss']
})
export class ListeMembreComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'email', 'telephone', 'update', 'delete'];
  dataSource: MatTableDataSource<Categorie>;
  membres: Categorie[];
  membre: Categorie;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private membreService: MembreService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.membreService.getAllMembre().subscribe(data => {
      this.membres = data.body;
      this.membres.forEach(value => {
        let opp : Membre = value;
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
      data: this.membre
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.membre = result;
      this.receptacle.unshift(this.membre);
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
        membre: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.membre = result;
      // this.receptacle
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Categorie>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }
  redirectToDelete(id: any) {

    if(localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      console.log(' Dans la navbar', decoded);
      this.adminService.getAdminById(decoded.sub).subscribe(res => {
        console.log('admin', res.body);
        this.admin = res.body;
        this.roles = res.body.roles;
        console.log(this.roles);
        this.roles.forEach(val => {
          this.ROLE_ADMIN = val;
          console.log(this.ROLE_ADMIN);
        });
      });

    }

    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(res);
        this.membreService.supprimerMembre(id).subscribe(data => {
          console.log(data);
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
