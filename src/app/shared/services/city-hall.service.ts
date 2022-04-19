import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { CityHall } from 'src/app/shared/models/city-hall';

@Injectable({
  providedIn: 'root'
})
export class CityHallService {

  constructor(private afs: AngularFirestore) { }

  getCityHalls() {
    return this.afs.collection('cityHalls').snapshotChanges();
  }

  createCityHall(cityHall: CityHall) {
    cityHall.cityHallCode = this.afs.createId();
    return this.afs.collection('cityHalls').doc(cityHall.cityHallCode).set(cityHall);
  }

  updateCityHall(cityHall: CityHall) {
    this.afs.collection('cityHalls').doc(cityHall.cityHallCode).set(cityHall);
  }

  deleteCityHall(cityHallCode: string){
    this.afs.collection('cityHalls').doc(cityHallCode).delete();
  }

}
