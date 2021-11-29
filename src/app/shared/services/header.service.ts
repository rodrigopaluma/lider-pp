import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  pTitle = '';
  pSubtitle = '';
  leftSideBar = true;
  rightSideBar = false;

  private rightSideBarEvent = new Subject<boolean>()
  private leftSideBarEvent = new Subject<boolean>()

  rightSideBarEmitEvent(event: boolean) {
    this.rightSideBar = event;
    this.rightSideBarEvent.next(event)
  }
  hearRightSideBar() {
    return this.rightSideBarEvent.asObservable()
  }

  leftSideBarEmitEvent(event: boolean) {
    this.leftSideBar = event;
    this.leftSideBarEvent.next(event)
  }
  hearLeftSideBar() {
    return this.leftSideBarEvent.asObservable()
  }
}
