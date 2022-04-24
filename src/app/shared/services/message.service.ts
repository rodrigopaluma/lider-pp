import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private afs: AngularFirestore) { }

  getMessages() {
    return this.afs.collection(`messages`).snapshotChanges();
  }

  getMessage(messageCode: string) {
    return this.afs.collection(`messages/${messageCode}`).snapshotChanges();
  }

  createMessage(message: Message) {
    message.messageCode = this.afs.createId();
    return this.afs.collection(`messages`).doc(message.messageCode).set(message);
  }

  updateMessage(message: Message, messageCode: string) {
    this.afs.collection(`messages/${messageCode}`).doc(message.messageCode).set(message);
  }

  deleteMessage(messageCode: string){
    this.afs.collection(`messages/${messageCode}`).doc(messageCode).delete();
  }
}
