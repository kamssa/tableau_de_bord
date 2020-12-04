import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Employe} from '../../models/Employe';
import {EmployeService} from '../../service/employe.service';
import {MatDialog} from '@angular/material/dialog';
import {AddEmployeComponent} from '../add-employe/add-employe.component';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'service', 'update', 'delete'];
  dataSource: MatTableDataSource<Employe>;
  employes: Employe[];
  employe: Employe;
  receptacle: any = [];

  constructor(private employeService: EmployeService,
              public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.employeService.getAllEmploye().subscribe(data => {
      this.employes = data.body;
      console.log('employes', this.employes);
      this.employes.forEach(value => {
        let opp : Employe = value;

        this.receptacle.push(opp);
      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Employe>(this.receptacle);
    });
  }

  removeColumn() {

  }

  shuffle() {
    console.log('');
  }

  applyFilter($event: KeyboardEvent) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeComponent, {
      width: '650px',
      data: this.employe
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.employe = result;
    });
  }
  redirectToUpdate(id: any) {

  }
  redirectToDelete(id: any) {

  }

}
