import { Component, inject, OnInit } from '@angular/core';
import { PoMenuItem, PoToolbarAction } from '@po-ui/ng-components';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  auth: AuthService = inject(AuthService);

  profileActions: Array<PoToolbarAction> = [
    { icon: 'an an-sign-out', label: 'Exit', type: 'danger', separator: true, action: () => this.logout() }
  ];

  items: PoMenuItem[] = [
    {
      label: 'Users',
      link: '/users-list'
    },
    {
      label: 'Products',
      subItems: [
        {
          label: 'Products List',
          link: '/products-list'
        },
        {
          label: 'Products Categories',
          link: '/product-categories'
        }
      ]
    },
    {
      label: 'Carts',
      link: '/carts-list'
    },
    {
      label: 'Sales',
      link: '/sales-list'
    },
  ]
  
  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
