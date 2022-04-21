import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { CityHall } from 'src/app/shared/models/city-hall';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditCityHallComponent } from './edit-city-hall/edit-city-hall.component';
import { CityHallService } from 'src/app/shared/services/city-hall.service';
import { SecretariesComponent } from '../secretaries/secretaries.component';

@Component({
  selector: 'app-city-halls',
  templateUrl: './city-halls.component.html',
  styleUrls: ['./city-halls.component.scss'],
})
export class CityHallsComponent implements AfterViewInit, OnInit {

  pageTitle = 'Prefeituras';

  displayedColumns: string[] = ['cityHallName', 'cityHallProvince', 'cityHallMayor', 'actions'];
  dataSource = new MatTableDataSource<any>();

  prefeituras: CityHall[] = [];

  @ViewChild(MatSort)
  sort!: MatSort;

  existSecretary: boolean = false;

  constructor(public hs: HeaderService,
              private afs: AngularFirestore,
              public dialog: MatDialog,
              private cityHallService: CityHallService) {
            hs.pTitle = this.pageTitle;
  }

  ngOnInit() {
    this.cityHallService.getCityHalls().subscribe((res: any) => {
      this.prefeituras = res.map((e: any)=> {
        return {
          cityHallCode: e.payload.doc.id,
          ...e.payload.doc.data() as CityHall
        }
      })
    });
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.hs.pTitle = this.pageTitle = 'Prefeituras';
    }, 0);

    this.afs.collection<CityHall>('cityHalls').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
  }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackByUid(item: any) {
    return item.cityHallCode;
  }

  deleteCityHall(cityHallCode: string) {
    this.cityHallService.deleteCityHall(cityHallCode);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditCityHallComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openDialogEdit(city : CityHall) {
    const dialogRef = this.dialog.open(EditCityHallComponent, {data: city});

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  viewSecretaries(city : CityHall) {
    const dialogRef = this.dialog.open(SecretariesComponent, {
      data: city,
      width: '60%'
    });
  }

}
