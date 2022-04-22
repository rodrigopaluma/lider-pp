import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from 'src/app/shared/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnInit {

  pageTitle = 'Usuários';

  displayedColumns: string[] = ['userName', 'userEmail', 'userProfile', 'cityHallName', 'secName', 'actions'];
  dataSource = new MatTableDataSource<any>();

  usuarios: User[] = [];

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public hs: HeaderService,
              private afs: AngularFirestore,
              public dialog: MatDialog,
              private userService: UserService) {
              this.hs.pTitle = this.pageTitle;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      this.usuarios = res.map((e: any)=> {
        return {
          userCode: e.payload.doc.id,
          ...e.payload.doc.data() as User
        }
      })
    });
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.hs.pTitle = this.pageTitle = 'Usuários';
    }, 0);

    this.afs.collection<User>('users').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
  }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackByUid(item: any) {
    return item.userCode;
  }

  deleteUser(userCode: string) {
    this.userService.deleteUser(userCode);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openDialogEdit(city : User) {
    const dialogRef = this.dialog.open(EditUserComponent, {data: city});

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

}
