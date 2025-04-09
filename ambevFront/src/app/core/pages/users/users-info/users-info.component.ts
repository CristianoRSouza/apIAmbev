import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PoDynamicViewField, PoPageAction } from '@po-ui/ng-components';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../shared/interfaces/users.interface';

@Component({
  selector: 'app-users-info',
  imports: [SharedModule],
  templateUrl: './users-info.component.html',
  styleUrl: './users-info.component.css',
})
export class UsersInfoComponent extends BaseComponente implements OnInit {
  usersService: UsersService = inject(UsersService);
  fields: PoDynamicViewField[] = [
    {
      property: 'id',
      label: 'ID',
    },
    {
      property: 'email',
      label: 'Email',
    },
    {
      property: 'username',
      label: 'Username',
    },
    {
      property: 'password',
      label: 'Password',
    },
    {
      property: 'full_name',
      label: 'Name',
    },
    {
      property: 'city',
      label: 'City',
    },
    {
      property: 'street',
      label: 'Street',
    },
    {
      property: 'number',
      label: 'Number',
    },
    {
      property: 'zipcode',
      label: 'Zipcode',
    },
    {
      property: 'phone',
      label: 'Phone',
    },
    {
      property: 'status',
      label: 'Status',
    },
    {
      property: 'role',
      label: 'Role',
    },
  ];

  user_info = {};

  pageActions: PoPageAction[] = [
    {
      label: 'Voltar',
      action: () => this.redirectTo('', true),
    },
  ];
  user_id: string = '';

  ngOnInit(): void {
    this.user_id = this.route.snapshot.params['id'];
    this.getUser();
  }

  getUser() {
    this.usersService.userListOne(this.user_id).subscribe((user: User) => {
      this.user_info = {
        ...user,
        ...user.address,
        full_name: `${user.name.firstname} ${user.name.lastname}`,
      };
    });
  }
}
