import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityHall } from 'src/app/shared/models/city-hall';

@Component({
  selector: 'app-edit-city-hall',
  templateUrl: './edit-city-hall.component.html',
  styleUrls: ['./edit-city-hall.component.scss']
})
export class EditCityHallComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditCityHallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CityHall) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
