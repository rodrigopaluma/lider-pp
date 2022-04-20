import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CityHall } from 'src/app/shared/models/city-hall';
import { Secretary } from 'src/app/shared/models/secretary';
import { CityHallService } from 'src/app/shared/services/city-hall.service';
import { HeaderService } from 'src/app/shared/services/header.service';
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
              @Inject(MAT_DIALOG_DATA) public data: CityHall,
              private cityHallService: CityHallService) {}

  ngOnInit() {

    const cityHallCode = this.cityHallService.getCityHalls().subscribe((res: any) => {
      this.prefeituras = res.map((e: any)=> {
        return {
          cityHallCode: e.payload.doc.id,
          ...e.payload.doc.data() as CityHall
        }
      })
    });
    this.afs.collection<Secretary>(`cityHalls/${cityHallCode}/secretaries`).valueChanges().subscribe((res: any) => {
      this.secretarias = res.map((e: any)=> {
        return {
          secCode: e.payload.doc.id,
          ...e.payload.doc.data() as Secretary
        }
      })
    });
    /* this.afs.collection<Secretary>(`cityHalls/${cityHallCode}/secretaries`).valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    }); */
  }

  ngAfterViewInit(): void {

    const cityHallCode = this.cityHallService.getCityHalls().subscribe((res: any) => {
      this.prefeituras = res.map((e: any)=> {
        return {
          cityHallCode: e.payload.doc.id,
          ...e.payload.doc.data() as CityHall
        }
      })
    });
    this.afs.collection<Secretary>(`cityHalls/${cityHallCode}/secretaries`).valueChanges().subscribe((res: any) => {
      this.secretarias = res.map((e: any)=> {
        return {
          secCode: e.payload.doc.id,
          ...e.payload.doc.data() as Secretary
        }
      })
    });
    /* this.afs.collection<Secretary>(`cityHalls/${cityHallCode}/secretaries`).valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    }); */
  }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackByUid(item: any) {
    return item.cityHallCode;
  }

  deleteSecretary(secCode: string) {
    this.secretaryService.deleteSecretary(secCode);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditSecretaryComponent);

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
