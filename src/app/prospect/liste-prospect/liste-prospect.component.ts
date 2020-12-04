import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Prospect} from '../../models/Prospect';
import {ProspectService} from '../../service/prospect.service';
import {MatDialog} from '@angular/material/dialog';
import {AddProspectComponent} from '../add-prospect/add-prospect.component';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-liste-prospect',
  templateUrl: './liste-prospect.component.html',
  styleUrls: ['./liste-prospect.component.scss']
})
export class ListeProspectComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'telephone', 'client', 'update', 'delete'];
  dataSource: MatTableDataSource<Prospect>;
  prospects: Prospect[];
  prospect: Prospect;
  receptacle: any = [];

  constructor(private prospectService: ProspectService,
              public dialog: MatDialog, private  localStorage: LocalStorage) {
  }
  ngOnInit(): void {
    this.prospectService.getAllProspect().subscribe(data => {
      this.prospects = data.body;
      console.log('prospect', this.prospects);
      this.prospects.forEach(value => {
        let opp : Prospect = value;

        this.receptacle.push(opp);
      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Prospect>(this.receptacle);
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
    const dialogRef = this.dialog.open(AddProspectComponent, {
      width: '650px',
      data: this.prospect
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.prospect = result;
    });
  }
  redirectToUpdate(id: any) {

  }
  redirectToDelete(id: any) {

  }
  prospectTClientUpdate(id: any) {
    console.log('id du prospect', id);
    this.prospectService.getPospectById(id).subscribe(data => {
      console.log(data.body);
      let prospect: Prospect = {
        titre: data.body.titre,
        nom: data.body.nom,
        prenom: data.body.prenom,
        email: data.body.email,
        password: data.body.password,
        fonction: data.body.fonction,
        adresse: data.body.adresse,
        type:'CL'
      };
      console.log(prospect);
      this.prospectService.ajoutProspect(prospect).subscribe(res => {
        console.log('opération reussi');
      });
      this.prospectService.supprimerProspectById(id).subscribe(res=> {
        console.log('supprimer reussi');
      });
    });




  }
}
