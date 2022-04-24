import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'src/app/shared/models/message';
import { HeaderService } from 'src/app/shared/services/header.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { EditMessageComponent } from './edit-message/edit-message.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements AfterViewInit, OnInit {

  pageTitle = 'Mensagens';

  displayedColumns: string[] = ['messageTitleMessage', 'messageIssuer', 'messageReceiver', 'messageReceivingDate', 'actions'];
  dataSource = new MatTableDataSource<any>();

  mensagens: Message[] = [];

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public hs: HeaderService,
              private afs: AngularFirestore,
              public dialog: MatDialog,
              private messageService: MessageService) {
            hs.pTitle = this.pageTitle;
  }

  ngOnInit(): void {

    this.messageService.getMessages().subscribe((res: any) => {
      this.mensagens = res.map((e: any)=> {
        return {
          messageCode: e.payload.doc.id,
          ...e.payload.doc.data() as Message
        }
      })
    });
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.hs.pTitle = this.pageTitle = 'Mensagens';
    }, 0);

    this.afs.collection<Message>('messages').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackByUid(item: any) {
    return item.cityHallCode;
  }

  deleteMessage(messageCode: string) {
    this.messageService.deleteMessage(messageCode);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditMessageComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openDialogEdit(message : Message) {
    const dialogRef = this.dialog.open(EditMessageComponent, {data: message});

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

}
