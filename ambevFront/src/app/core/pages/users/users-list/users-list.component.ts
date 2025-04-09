import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {
  PoPageAction,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { User } from '../../../shared/interfaces/users.interface';
import { Role } from '../../../shared/enum/role.enum';
import { Status } from '../../../shared/enum/status.enum';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Utils from '../../../shared/utils/utils';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class UsersListComponent
  extends BaseComponente
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  usersService: UsersService = inject(UsersService);
  displayedColumns: string[] = [
    'id',
    'email',
    'username',
    'password',
    'full_name',
    'phone',
    'status',
    'role',
    'actions',
  ];

  items: User[] = [];

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(
    undefined
  );

  pageActions: PoPageAction[] = [
    {
      label: 'Create',
      action: () => this.redirectTo('/user-create'),
    },
  ];

  ngOnInit() {
    this._order = 'username asc, email desc';
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    this.usersService
      .userList({
        _page: this._currentPage,
        _size: this._size,
        _order: this._order,
      })
      .subscribe({
        next: (users: any) => {
          this._page = users.totalPages;
          this._totalItems = users.totalItems;
          this.dataSource.data = users.data;
        },
      });
  }

  edit(row: any) {
    this.redirectTo(`user-edit/${row.id}`);
  }

  view(row: any) {
    this.redirectTo(`user-info/${row.id}`);
  }

  delete(row: any) {
    this.usersService.deleteUser(row.id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id !== row.id
        );
      },
    });
  }

  sort(event: { active: string; direction: string }) {
    this._order = Utils.Sort(event, this._order);
    this.getUsers();
  }

  onPageChange(event: PageEvent) {
    if (
      this._currentPage === event.pageIndex + 1 &&
      this._size === event.pageSize
    ) {
      return;
    }

    this._currentPage = event.pageIndex + 1;
    this._size = event.pageSize;

    this.getUsers();
  }
}
