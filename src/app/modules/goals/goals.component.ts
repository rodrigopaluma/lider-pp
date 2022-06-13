import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Activity } from 'src/app/shared/models/activity';
import { HeaderService } from 'src/app/shared/services/header.service';
import { EditGoalComponent } from './edit-goal/edit-goal.component';

const allGoals: Activity[] = [
  { activityCode: '99qbkXGsfwkMr3bhJl6C',
    activityName: 'Teste de Demanda 1',
    activityPriority: 'alta',
    activityState: 'em-andamento',
    activityResponsible: 'sUl4QOrhI2ZcnxodX0U2',
    activityAssigned: '1',
    activityEstimatedStart: '01/01/2020',
    activityEstimatedEnd: '01/01/2020',
    activityEstimatedValue: 10000,
    activityRealStart: '01/01/2020',
    activityRealEnd: '01/01/2020',
    activityRealValue: 100000,
    activityDocument: '1',
    cityHallCode: '3XVCiw9mDNm4AEQSb9hK',
    cityHallName: 'Ibitipoca',
    secCode: '3XVCiw9mDNm4AEQSb9hK1',
    secName: 'Secretaria de Educação',
    activityFollowUp: '1' },

  { activityCode: '99qbkXGsfwkMr3bhJl8C',
    activityName: 'Teste de Demanda 2',
    activityPriority: 'alta',
    activityState: 'atrasada',
    activityResponsible: 'sUl4QOrhI2ZcnxodX0U2',
    activityAssigned: '1',
    activityEstimatedStart: '01/01/2020',
    activityEstimatedEnd: '01/01/2020',
    activityEstimatedValue: 25000,
    activityRealStart: '01/01/2020',
    activityRealEnd: '01/01/2020',
    activityRealValue: 358000,
    activityDocument: '1',
    cityHallCode: '3XVCiw9mDNm4AEQSb9hK',
    cityHallName: 'Ibitipoca',
    secCode: '3XVCiw9mDNm4AEQSb9hK',
    secName: 'Secretaria de Educação',
    activityFollowUp: '1' }
];

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  pageTitle = 'Demandas';

  displayedColumns: string[] = ['activityName', 'activityPriority', 'activityState', 'startAndEnd', 'cityHallName', 'secName', 'activityEstimatedValue', 'actions'];
  dataSource = new MatTableDataSource<Activity>(allGoals);

  constructor(public hs: HeaderService,public dialog: MatDialog) {
    this.hs.pTitle = this.pageTitle;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Activity>(allGoals);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditGoalComponent);
  }

  openDialogEdit(activity: Activity) {

  }

  deleteActivity(activity: Activity) {

  }

}
