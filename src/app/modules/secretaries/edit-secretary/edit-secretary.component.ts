import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Secretary } from 'src/app/shared/models/secretary';
import { SecretaryService } from 'src/app/shared/services/secretary.service';

@Component({
  selector: 'app-edit-secretary',
  templateUrl: './edit-secretary.component.html',
  styleUrls: ['./edit-secretary.component.scss']
})
export class EditSecretaryComponent implements OnInit {

  secretaryForm: FormGroup = this.formBuilder.group({});

  cityHallCode: string = `${this.data.cityHallCode}`;

  constructor(public dialogRef: MatDialogRef<EditSecretaryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Secretary,
              private secretaryService: SecretaryService,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    // console.log(this.data)
  }

  createForm() {
    this.secretaryForm = this.formBuilder.group({
      secCode: [this.data ? this.data.secCode : ''],
      secName: [this.data ? this.data.secName : '', Validators.required],
      secAbreviation: [this.data ? this.data.secAbreviation : '', Validators.required],
      cityHallCode: [this.data ? this.data.cityHallCode : '']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create(secretary: Secretary, cityHallCode: string): void {
    this.secretaryService.createSecretary(secretary,cityHallCode);
  }

  onSubmit(){
    if(this.secretaryForm.value.secCode) {
      this.secretaryService.updateSecretary(this.secretaryForm.value, this.cityHallCode);
    } else {
      this.secretaryService.createSecretary(this.secretaryForm.value, this.cityHallCode);
      this.secretaryForm.reset();
    }
  }

}
