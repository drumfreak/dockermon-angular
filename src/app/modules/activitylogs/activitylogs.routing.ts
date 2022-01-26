import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { ActivitylogsComponent } from './activitylogs.component';
import { EditActivitylogsComponent } from './manage-activitylogs/edit-activitylogs/edit-activitylogs.component';
import { ManageActivitylogsComponent } from './manage-activitylogs/manage-activitylogs.component';
import { ViewActivitylogsComponent } from './view-activitylogs/view-activitylogs.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitylogsComponent,
    data: { title: 'Stages', roles: ['Admin', 'TeamLead'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: ManageActivitylogsComponent,
    data: { title: 'Add Stage', roles: ['Admin', 'TeamLead'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'view/:id',
    component: ViewActivitylogsComponent,
    data: { title: 'View Sprint', roles: ['Admin', 'TeamLead'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditActivitylogsComponent,
    data: { title: 'Edit Sprint', roles: ['Admin', 'TeamLead'] },
    canActivate: [AuthGuard],
  },
];
export const ActivitylogsRoutes = RouterModule.forChild(routes);
