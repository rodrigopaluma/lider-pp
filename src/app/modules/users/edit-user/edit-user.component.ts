import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityHall } from 'src/app/shared/models/city-hall';
import { Secretary } from 'src/app/shared/models/secretary';

import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup = this.formBuilder.group({});

  prefeituras: CityHall[] = [];
  secretarias: Secretary[] = [];

  public profileList = [
    { value: 'ADMIN', viewValue: 'Administrador' },
    { value: 'SECRETARY', viewValue: 'Secretário' },
    { value: 'CITYHALL', viewValue: 'Prefeito' },
    { value: 'USER', viewValue: 'Usuário' }
  ];

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    public formBuilder: FormBuilder,
    private afs: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.getCityHalls();
    this.createForm();
    this.userForm?.get('cityHall')?.valueChanges.subscribe(value => {
      if(value) {
        this.afs.collection(`/cityHalls/${value.cityHallCode}/secretaries`).valueChanges().subscribe(values => {
          this.secretarias = values as Secretary[];
        })
      }
    })
  }

  createForm() {
    if(this.data && this.data.secCode) {
      this.afs.collection(`/cityHalls/${this.data.cityHallCode}/secretaries`).valueChanges().subscribe(values => {
        this.secretarias = values as Secretary[];
      })
    }
    this.userForm = this.formBuilder.group({
      userCode: [
        this.data ? this.data.userCode : ''
      ],
      userName: [
        this.data ? this.data.userName : '',
        Validators.required,
      ],
      userEmail: [
        this.data ? this.data.userEmail : '',
        Validators.required,
      ],
      userProfile: [
        this.data ? this.data.userProfile : '',
        Validators.required,
      ],
      cityHall: [
        this.data ? this.data.cityHallCode : ''
      ],
      sec: [
        this.data ? this.data.secCode : ''
      ]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create(user: User): void {
    this.userService.createUser(user);
  }

  getCityHalls() {
    this.afs.collection<CityHall>('cityHalls').valueChanges().subscribe(data => {
      this.prefeituras = data as CityHall[];
    });
  }

  onSubmit() {
    const values = {
      cityHallCode: this.userForm.value.cityHall.cityHallCode,
      cityHallName: this.userForm.value.cityHall.cityHallName,
      secCode: this.userForm.value.sec.secCode,
      secName: this.userForm.value.sec.secName,
      userCode: this.userForm.value.userCode,
      userEmail: this.userForm.value.userEmail,
      userName: this.userForm.value.userName,
      userProfile: this.userForm.value.userProfile
    }
    if (values.userCode) {
      this.userService.updateUser(values);
    } else {
      this.userService.createUser(values);
      this.userForm.reset();
    }
  }

  compareCity(a: any, b: any) {
    return a.cityHallCode === b;
  }

  compareSec(a: any, b: any) {
    return a.secCode === b;
  }
}
