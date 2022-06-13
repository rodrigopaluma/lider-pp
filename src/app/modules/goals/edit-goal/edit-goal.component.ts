import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from 'src/app/shared/models/activity';
import { CityHall } from 'src/app/shared/models/city-hall';
import { Secretary } from 'src/app/shared/models/secretary';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss']
})
export class EditGoalComponent implements OnInit {

  activityForm: FormGroup = this.formBuilder.group({});

  prefeituras: CityHall[] = [];
  secretarias: Secretary[] = [];

  public priorityList = [
    { value: 'alta', viewValue: 'Alta' },
    { value: 'media', viewValue: 'Média' },
    { value: 'baixa', viewValue: 'Baixa' }
  ];

  public stateList = [
    { value: 'em-andamento', viewValue: 'Em Andamento' },
    { value: 'concluida', viewValue: 'Concluída' },
    { value: 'cancelada', viewValue: 'Cancelada' },
    { value: 'pendente', viewValue: 'Pendente' },
    { value: 'atrasada', viewValue: 'Atrasada' }
  ];

  public usersList = [
    { value: '1', viewValue: 'Usuário 1' },
    { value: '2', viewValue: 'Usuário 2' },
    { value: '3', viewValue: 'Usuário 3' },
    { value: '4', viewValue: 'Usuário 4' },
  ];

  constructor(public formBuilder: FormBuilder,public dialogRef: MatDialogRef<EditGoalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Activity,private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.getCityHalls();
    this.createForm();
  }

  getCityHalls() {
    this.afs.collection<CityHall>('cityHalls').valueChanges().subscribe(data => {
      this.prefeituras = data as CityHall[];
    });
  }

  createForm() {
    this.activityForm = this.formBuilder.group({
      activityName: [
        this.data ? this.data.activityName : '',
        Validators.required
      ],
      activityPriority: [
        this.data ? this.data.activityPriority : '',
        Validators.required
      ],
      activityResponsible: [
        this.data ? this.data.activityResponsible : '',
        Validators.required
      ],
      activityAssigned: [
        this.data ? this.data.activityAssigned : '',
        Validators.required
      ],
      activityEstimatedStart: [
        this.data ? this.data.activityEstimatedStart : '',
        Validators.required
      ],
      activityEstimatedEnd: [
        this.data ? this.data.activityEstimatedEnd : '',
        Validators.required
      ],
      activityRealStart: [
        this.data ? this.data.activityRealStart : ''
      ],
      activityRealEnd: [
        this.data ? this.data.activityRealEnd : ''
      ],
      activityEstimatedValue: [
        this.data ? this.data.activityEstimatedValue : '',
        Validators.required
      ],
      activityRealValue: [
        this.data ? this.data.activityRealValue : ''
      ],
      cityHallName: [
        this.data ? this.data.cityHallName : '',
        Validators.required
      ],
      secName: [
        this.data ? this.data.secName : '',
        Validators.required
      ]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const values: any = {
      cityHallCode: this.activityForm.value.cityHall.cityHallCode,
      cityHallName: this.activityForm.value.cityHall.cityHallName,
      secCode: this.activityForm.value.sec.secCode,
      secName: this.activityForm.value.sec.secName,
    }
  }

  compareCity(a: any, b: any) {
    return a.cityHallCode === b;
  }

  compareSec(a: any, b: any) {
    return a.secCode === b;
  }

}
