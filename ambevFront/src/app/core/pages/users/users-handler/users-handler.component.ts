import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { NgForm } from '@angular/forms';
import { Status } from '../../../shared/enum/status.enum';
import { Role } from '../../../shared/enum/role.enum';
import { User } from '../../../shared/interfaces/users.interface';
import { PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation } from '@po-ui/ng-components';
import Utils from '../../../shared/utils/utils';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users-handler',
  templateUrl: './users-handler.component.html',
  styleUrls: ['./users-handler.component.css'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class UsersHandlerComponent extends BaseComponente implements OnInit {
  usersService: UsersService = inject(UsersService);
  dynamicForm!: NgForm;
  user_id: string = '';
  fields: PoDynamicFormField[] = [
    {
      property: 'email',
      label: 'Email',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'email'
    },
    {
      property: 'username',
      label: 'Username',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'password',
      label: 'Password',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'password',
      secret: true
    },
    {
      property: 'firstname',
      label: 'First Name',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'lastname',
      label: 'Last Name',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'phone',
      label: 'Phone',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'zipcode',
      label: 'Zip Code',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'number',
      noAutocomplete: true,
      mask: '99999-999'
    },
    {
      property: 'street',
      label: 'Street',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'number',
      label: 'number',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'number'
    },
    {
      property: 'city',
      label: 'City',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'lat',
      label: 'Latitude',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text',
    },
    {
      property: 'long',
      label: 'Longitude',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text',
    },
    {
      property: 'status',
      label: 'Status',
      required: true,
      gridColumns: 6,
      showRequired: true,
      options: [
        {
          value: 'Active',
          label: 'Active'
        },
        {
          value: 'Inactive',
          label: 'Inactive'
        },
        {
          value: 'Suspended',
          label: 'Suspended'
        }
      ]
    },
    {
      property: 'role',
      label: 'Role',
      required: true,
      gridColumns: 6,
      showRequired: true,
      options: [
        {
          value: 'Admin',
          label: 'Admin'
        },
        {
          value: 'Customer',
          label: 'Customer'
        },
        {
          value: 'Manager',
          label: 'Manager'
        },
      ]
    }
  ]

  user_values: User = {
    id: '',
    email: '',
    username: '',
    password: '',
    name: {
      firstname: '',
      lastname: ''
    },
    address: {
      city: '',
      street: '',
      number: 1,
      zipcode: '',
      geolocation: {
        lat: '',
        long: ''
      }
    },
    phone: '',
    role: Role.Admin,
    status: Status.Active
  }

  ngOnInit() {
    this.user_id = this.route.snapshot.params['id'];

    if (this.user_id) {
      this.getUser();
    }
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  save() {
    if (!this.dynamicForm.form.valid) {
      this.notification.warning('Fill all fields required');
      this.dynamicForm.form.markAllAsTouched();
      return;
    }

    const user = this.mapToUser(this.dynamicForm.form.value)

    if (this.user_id) {
      this.updateUser(user);
      return;
    }

    this.createUser(user);
  }

  updateUser(user: User) {
    this.usersService.userUpdate(this.user_id, user).subscribe({
      next: () => {
        this.router.navigate(['/users-list'])
      },
    })
  }

  createUser(user: User) {
    this.usersService.userCreate(user).subscribe({
      next: () => {
        this.router.navigate(['/users-list'])
      },
    })
  }

  cancel() {
    this.router.navigate(['/users-list'])
  }

  getUser() {
    this.usersService.userListOne(this.user_id).subscribe({
      next: (user: User) => {
        this.dynamicForm.form.patchValue({
          email: user.email,
          username: user.username,
          password: user.password,
          firstname: user.name.firstname,
          lastname: user.name.lastname,
          phone: user.phone,
          zipcode: user.address.zipcode,
          street: user.address.street,
          number: user.address.number,
          city: user.address.city,
          lat: user.address.geolocation.lat,
          long: user.address.geolocation.long,
          status: user.status,
          role: user.role
        }, { emitEvent: false });
      }
    })
  }

  onChangeFields(changedValue: PoDynamicFormFieldChanged): PoDynamicFormValidation {
    const changeFields = {
      value: {},
      fields: []
    };

    if (changedValue.property == 'zipcode') {
      if (Utils.validateZipCode(changedValue.value.zipcode)) {
        this.loadAddress(changedValue.value.zipcode);
        return changeFields;
      }

      return changeFields;
    }

    return changeFields;
  }

  loadAddress(zip_code: string) {
    this.loading = true;
    this.http.get(`https://brasilapi.com.br/api/cep/v2/${zip_code}`).subscribe(
      (res: any) => {
        this.dynamicForm.form.patchValue({
          city: res.city,
          street: res.street,
          lat: res.location?.coordinates?.latitude,
          long: res.location?.coordinates?.longitude,
        }, { emitEvent: false });
        this.loading = false;
      },
      (err: any) => {
        this.notification.warning('invalid ZipCode');
        this.loading = false;
      }
    );
  }

  mapToUser(data: any): User {
    console.log(data)
    return {
      id: '',
      email: data.email || "",
      username: data.username || "",
      password: data.password || "",
      name: {
        firstname: data.firstname || "",
        lastname: data.lastname || ""
      },
      address: {
        city: data.city || "",
        street: data.street || "",
        number: data.number || 0,
        zipcode: data.zipcode || "",
        geolocation: {
          lat: data.lat || "",
          long: data.long || ""
        }
      },
      phone: data.phone || "",
      status: (data.status as Status) || Status.Inactive,
      role: (data.role as Role) || Role.Customer
    };
  }
}
