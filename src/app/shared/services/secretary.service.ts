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

  createSecretary(secretary: Secretary) {
    secretary.secCode = this.afs.createId();
    return this.afs.collection('secretaries').doc(secretary.secCode).set(secretary);
  }

  updateSecretary(secretary: Secretary) {
    this.afs.collection('secretaries').doc(secretary.secCode).set(secretary);
  }

  deleteSecretary(secCode: string){
    this.afs.collection('secretaries').doc(secCode).delete();
  }
}
