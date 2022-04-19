import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CityHall } from 'src/app/shared/models/city-hall';
import { CityHallService } from 'src/app/shared/services/city-hall.service';

@Component({
  selector: 'app-edit-city-hall',
  templateUrl: './edit-city-hall.component.html',
  styleUrls: ['./edit-city-hall.component.scss']
})
export class EditCityHallComponent implements OnInit {

  cityHallForm: FormGroup = this.formBuilder.group({});

  public provinceList = [
    { value: 'AC', viewValue: 'Acre' },
    { value: 'AL', viewValue: 'Alagoas' },
    { value: 'AP', viewValue: 'Amapá' },
    { value: 'AM', viewValue: 'Amazonas' },
    { value: 'BA', viewValue: 'Bahia' },
    { value: 'CE', viewValue: 'Ceará' },
    { value: 'ES', viewValue: 'Espírito Santo' },
    { value: 'GO', viewValue: 'Goiás' },
    { value: 'MA', viewValue: 'Maranhão' },
    { value: 'MT', viewValue: 'Mato Grosso' },
    { value: 'MS', viewValue: 'Mato Grosso do Sul' },
    { value: 'MG', viewValue: 'Minas Gerais' },
    { value: 'PA', viewValue: 'Pará' },
    { value: 'PB', viewValue: 'Paraíba' },
    { value: 'PR', viewValue: 'Paraná' },
    { value: 'PE', viewValue: 'Pernambuco' },
    { value: 'PI', viewValue: 'Piauí' },
    { value: 'RJ', viewValue: 'Rio de Janeiro' },
    { value: 'RN', viewValue: 'Rio Grande do Norte' },
    { value: 'RS', viewValue: 'Rio Grande do Sul' },
    { value: 'RO', viewValue: 'Rondônia' },
    { value: 'RR', viewValue: 'Roraima' },
    { value: 'SC', viewValue: 'Santa Catarina' },
    { value: 'SP', viewValue: 'São Paulo' },
    { value: 'SE', viewValue: 'Sergipe' },
    { value: 'TO', viewValue: 'Tocantis' },
    { value: 'DF', viewValue: 'Distrito Federal' },
  ];

  constructor(public dialogRef: MatDialogRef<EditCityHallComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CityHall,
              private cityHallService: CityHallService,
              public formBuilder: FormBuilder) {

              }

  ngOnInit(): void {
    console.log(this.data)
    this.cityHallForm = this.formBuilder.group({
      cityHallCode: [this.data ? this.data.cityHallCode : ''],
      cityHallName: [this.data ? this.data.cityHallName : '', Validators.required],
      cityHallMayor: [this.data ? this.data.cityHallMayor : '', Validators.required],
      cityHallProvince: [this.data ? this.data.cityHallProvince : '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create(cityHall: CityHall): void {
    this.cityHallService.createCityHall(cityHall);
  }

  onSubmit(){
    if(this.cityHallForm.value.cityHallCode) {
      this.cityHallService.updateCityHall(this.cityHallForm.value);
    } else {
      this.cityHallService.createCityHall(this.cityHallForm.value);
      this.cityHallForm.reset();
    }

  }
}
