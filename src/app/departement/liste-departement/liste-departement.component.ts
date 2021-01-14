import {Component, OnInit, ViewChild} from '@angular/core';
import {UpdateDepartementComponent} from '../update-departement/update-departement.component';
import {AddDepartementComponent} from '../add-departement/add-departement.component';
import {Departement} from '../../models/Departement';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DepartementService} from '../../service/departement.service';

@Component({
  selector: 'app-liste-departement',
  templateUrl: './liste-departement.component.html',
  styleUrls: ['./liste-departement.component.scss']
})
export class ListeDepartementComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'update', 'delete'];
  dataSource: MatTableDataSource<Departement>;
  departements: Departement[];
  departement: Departement;
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private departementService: DepartementService,
              public dialog: MatDialog, private router: Router) {
  }
  ngOnInit(): void {
    this.departementService.getAllDepartement().subscribe(data => {
      this.departements = data.body;
      this.departements.forEach(value => {
        let opp : Departement = value;

        this.receptacle.push(opp);
      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Departement>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDepartementComponent, {
      width: '650px',
      data: this.departement
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.departement = result;
      this.router.navigate(['departement']);

    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateDepartementComponent,{
      data: {
        departement: id
      }
    });
  }
  redirectToDelete(id: any) {
    if (confirm("Voulez vous vraiment supprimer le departement ?")) {
      this.departementService.supprimerDepatementById(id).subscribe(data => {
        this.router.navigate(['departemnt']);
      });
    }
  }

}
