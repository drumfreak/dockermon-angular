import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Footer, MenuItem, MegaMenuItem } from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.css'],
})
export class AppNavigationComponent implements OnInit {
  items: MenuItem[] = [];
  itemsOld: MenuItem[] = [];
  activeItem: MenuItem = {};
  @Input() activeMenuItem: any;
  themeMode = true;

  constructor(private app: AppComponent, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('themeMode')) {
      this.themeMode = localStorage.getItem('themeMode') === 'light' ? true : false;
    }
    // menu model: https://primefaces.org/primeng/showcase/#/menumodel
    this.items = [
      {
        label: 'Home',
        icon: 'fa fa-fw fa-home',
        routerLink: ['/'],
      },
      {
        label: 'Projects',
        icon: 'fa fa-fw fa-briefcase',
        // routerLink: ['/projects'],
        items: [
          {
            label: 'View Projects',
            icon: 'fa fa-fw fa-briefcase',
            routerLink: ['/projects'],
          },
          {
            label: 'Add Projects',
            icon: 'fa fa-fw fa-plus',
            routerLink: ['/projects/add'],
          },
          {
            label: 'View Stages',
            icon: 'fa fa-fw fa-briefcase',
            routerLink: ['/stages'],
          },
          {
            label: 'Add Stages',
            icon: 'fa fa-fw fa-plus',
            routerLink: ['/stages/add'],
          },
        ],
      },
      {
        label: 'Teams',
        icon: 'fa fa-fw fa-users',
        // routerLink: ['/teams'],
        items: [
          {
            label: 'View Teams',
            icon: 'fa fa-fw fa-users',
            routerLink: ['/teams'],
          },
          {
            label: 'Add Team',
            icon: 'fa fa-fw fa-user-plus',
            routerLink: ['/teams/add'],
          },
        ],
      },
      {
        label: 'Developers',
        icon: 'fa fa-fw fa-user-astronaut',
        // routerLink: ['/developers'],
        items: [
          {
            label: 'View Developers',
            icon: 'fa fa-fw fa-users',
            routerLink: ['/developers'],
          },
          {
            label: 'Add Developer',
            icon: 'fa fa-fw fa-user-plus',
            routerLink: ['/developers/add'],
          },
        ],
      },

      {
        label: 'Sprints',
        icon: 'fa fa-fw fa-chart-pie',
        items: [
          {
            label: 'View Sprints',
            icon: 'fa fa-fw fa-chart-bar',
            routerLink: ['/sprints'],
          },
          {
            label: 'Add Sprint',
            icon: 'fa fa-fw fa-plus',
            routerLink: ['/sprints/add'],
          },
        ],
      },
      {
        label: 'Stories',
        icon: 'fa fa-fw fa-book',
        items: [
          {
            label: 'View Stories',
            icon: 'fa fa-fw fa-book',
            routerLink: ['/stories'],
          },
          {
            label: 'Add Story',
            icon: 'fa fa-fw fa-plus',
            routerLink: ['/stories/add'],
          },
        ],
      },
    ];

    if (this.app.user && this.app.user.role) {
      if (this.app.user.role.name == 'Admin') {
        this.items.push({
          label: 'Admin',
          icon: 'fa fa-fw fa-hammer',
          items: [
            {
              icon: 'fa fa-fw fa-users',
              label: 'View Users',
              routerLink: ['/admin/users'],
            },
            {
              icon: 'fa fa-fw fa-user-plus',
              label: 'Add User',
              routerLink: ['/admin/users/add'],
            },
            {
              icon: 'fa fa-fw fa-building',
              label: 'View Companies',
              routerLink: ['/admin/companies'],
            },
            {
              icon: 'fa fa-fw fa-user-plus',
              label: 'Add Company',
              routerLink: ['/admin/companies/add'],
            },
          ],
        });
      }

      this.items.push({
        label: 'Account',
        icon: 'fa fa-fw fa-user',
        items: [
          {
            icon: 'fa fa-fw fa-user',
            label: 'Logout',
            routerLink: ['/auth/logout'],
          },
        ],
      });

      this.items.push({
        label: 'Logs',
        icon: 'fa fa-fw fa-file',
        routerLink: ['/logs'],
      });
    }
  }
  search() {
    this.router.navigate(['/search']);
  }
  changeThemeMode() {
    const mode = this.themeMode ? 'light' : 'dark';
    // this.app.changeThemeMode(mode);
  }
}
