import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../auth.guard';
import { EditUserComponent } from './manage-user/edit-user/edit-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: { title: 'Admin', roles: ['Admin'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: ManageUserComponent,
    data: { title: 'Add User', roles: ['Admin'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'view/:id',
    component: ViewUserComponent,
    data: { title: 'View User', roles: ['Admin'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditUserComponent,
    data: { title: 'Edit User', roles: ['Admin'] },
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'delete/:id',
  //   component: ManageUserComponent,
  //   data: { title: 'Edit User', roles: ['Admin'] },
  //   canActivate: [AuthGuard],
  // }
];

export const UsersRoutes = RouterModule.forChild(routes);
