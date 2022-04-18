import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

import {
  AngularFirestore,
  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { CityHall } from 'src/app/shared/models/city-hall';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-city-halls',
  templateUrl: './city-halls.component.html',
  styleUrls: ['./city-halls.component.scss'],
})
export class CityHallsComponent implements AfterViewInit {

  pageTitle = 'Prefeituras';

  // Carregamento de dados em lista
  //private itemsCollection: AngularFirestoreCollection<CityHall>;
  //items: Observable<CityHall[]>;

  displayedColumns: string[] = ['cityHallName', 'cityHallProvince', 'cityHallMayor', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public hs: HeaderService, private afs: AngularFirestore) {
    // Carregamento de dados em lista
    //this.itemsCollection = afs.collection<CityHall>('cityHalls');
    //this.items = this.itemsCollection.valueChanges();
    hs.pTitle = this.pageTitle;
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

}
