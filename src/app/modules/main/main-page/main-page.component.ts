import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ISendPush, IUserData } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from 'src/app/shared/services/api/users.service';
import { ModalPushComponent } from 'src/app/modules/main/main-page/components/modal-push/modal-push.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements AfterViewInit, OnInit {
  public displayedColumns: string[] = [
    'First name',
    'Last name',
    'Phone',
    'Email',
  ];
  public dataSource!: MatTableDataSource<IUserData>;
  public users!: IUserData[];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usersService: UsersService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((data) => {
      this.users = data.passes.map((item: any) => ({
        id: item.user_id,
        firstName: item.first_name,
        lastName: item.last_name,
        phone: item.phone,
        email: item.email,
      }));
      this.dataSource = new MatTableDataSource(this.users);
      console.log(this.users);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public rowClick(user: IUserData): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    this.dialog.open(ModalPushComponent, dialogConfig);

    const dialogRef = this.dialog.open(ModalPushComponent, dialogConfig);
    const date = new Date('2023-07-29T14:07:46.081Z');
    dialogRef.afterClosed().subscribe((data: ISendPush) => {
      const pushMessage = {
        ...data,
        user_id: `${user.id}`,
        date_start: date.toJSON(),
        push_message: data.push_message,
      };
      this.usersService
        .sendPushMessage(pushMessage)
        .subscribe((data) => console.log(data));

      console.log(pushMessage);
    });
  }
}
