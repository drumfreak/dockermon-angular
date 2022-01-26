import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { title: 'Admin', roles: ['Admin'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
  }
];

export const AdminRoutes = RouterModule.forChild(routes);
