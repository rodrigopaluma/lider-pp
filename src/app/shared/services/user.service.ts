import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  getUsers() {
    return this.afs.collection('users').snapshotChanges();
  }

  createUser(user: User) {
    user.userCode = this.afs.createId();
    return this.afs.collection('users').doc(user.userCode).set(user);
  }

  updateUser(user: User) {
    this.afs.collection('users').doc(user.userCode).set(user);
  }

  deleteUser(userCode: string){
    this.afs.collection('users').doc(userCode).delete();
  }

}
