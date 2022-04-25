import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from 'src/app/shared/models/message';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss']
})
export class EditMessageComponent implements OnInit {

  messageForm: FormGroup = this.formBuilder.group({});

  messageCode: string = `${this.data.messageCode}`;

  constructor(public dialogRef: MatDialogRef<EditMessageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Message,
              private messageService: MessageService,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.messageForm = this.formBuilder.group({
      messageCode: [this.data ? this.data.messageCode : ''],
      messageTitleMessage: [this.data ? this.data.messageTitleMessage : '', Validators.required],
      messageDescription: [this.data ? this.data.messageDescription : '', Validators.required],
      //messageIssuer: [this.data ? this.data.messageIssuer : '', Validators.required],
      //messageReceived: [this.data ? this.data.messageReceived : '', Validators.required],
      messageReceiver: [this.data ? this.data.messageReceiver : '', Validators.required],
      //messageReceivingDate: [this.data ? this.data.messageReceivingDate : '']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create(message: Message): void {
    this.messageService.createMessage(message);
  }

  onSubmit(){
    if(this.messageForm.value.messageCode) {
      this.messageService.updateMessage(this.messageForm.value, this.messageCode);
    } else {
      this.messageService.createMessage(this.messageForm.value);
      this.messageForm.reset();
    }
  }

}
