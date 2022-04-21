import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CityHall } from 'src/app/shared/models/city-hall';
import { Secretary } from 'src/app/shared/models/secretary';
import { SecretaryService } from 'src/app/shared/services/secretary.service';
import { EditSecretaryComponent } from './edit-secretary/edit-secretary.component';

@Component({
  selector: 'app-secretaries',
  templateUrl: './secretaries.component.html',
  styleUrls: ['./secretaries.component.scss']
})
export class SecretariesComponent implements OnInit {

  displayedColumns: string[] = ['secName', 'secAbreviation', 'actions'];
  dataSource = new MatTableDataSource<any>();

  secretarias: Secretary[] = [];
  prefeituras: CityHall[] = [];

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private afs: AngularFirestore,
              public dialog: MatDialog,
              private secretaryService: SecretaryService,
              @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {
    this.afs.collection(`/cityHalls/${this.data}/secretaries`).valueChanges().subscribe(values => {
      // console.log(values)
      this.secretarias = values as Secretary[];
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackByUid(item: any) {
    return item.cityHallCode;
  }

  deleteSecretary(secCode: string, cityHallCode: string) {
    this.secretaryService.deleteSecretary(secCode, cityHallCode);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditSecretaryComponent, {data: {
      cityHallCode: this.data
    }});

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openDialogEdit(secretary : Secretary) {
    const dialogRef = this.dialog.open(EditSecretaryComponent, {data: secretary});

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

}
