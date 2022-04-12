export interface Activity {
  id?: number;
  activityName?: string;
  activityPriority?: string;
  activityState?: string;
  activityResponsible?: string;
  activityAssigned?: string;
  activityEstimatedStart?: string;
  activityEstimatedEnd?: string;
  activityEstimatedValue?: number;
  activityRealStart?: string;
  activityRealEnd?: string;
  activityRealValue?: number;
  activityDocument?: string;

  cityHallCode?: string;
  secCode?: string;
  activityFollowUp?: string;
}
