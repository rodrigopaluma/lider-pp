import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Secretary } from '../models/secretary';

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {

  constructor(private afs: AngularFirestore) { }

  getSecretaries(cityHallCode: string) {
    return this.afs.collection(`cityHalls/${cityHallCode}/secretaries`).snapshotChanges();
  }

  createSecretary(secretary: Secretary, cityHallCode: string) {
    secretary.secCode = this.afs.createId();
    return this.afs.collection(`cityHalls/${cityHallCode}/secretaries`).doc(secretary.secCode).set(secretary);
  }

  updateSecretary(secretary: Secretary, cityHallCode: string) {
    this.afs.collection(`cityHalls/${cityHallCode}/secretaries`).doc(secretary.secCode).set(secretary);
  }

  deleteSecretary(secCode: string, cityHallCode: string){
    this.afs.collection(`cityHalls/${cityHallCode}/secretaries`).doc(secCode).delete();
  }
}
