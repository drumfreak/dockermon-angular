import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { ViewContainerComponent } from './containers/view-container/view-container.component';
import { ViewContainersComponent } from './containers/view-containers/view-containers.component';
import { DockerComponent } from './docker.component';

const routes: Routes = [
  {
    path: '',
    component: DockerComponent,
    data: { title: 'Docker Dashboard', roles: ['Admin'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'containers/:id',
    component: ViewContainerComponent,
    data: { title: 'Docker Container', roles: ['Admin'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'containers',
    component: ViewContainersComponent,
    data: { title: 'Docker Container', roles: ['Admin'] },
    canActivate: [AuthGuard],
  },
];

export const DockerRoutes = RouterModule.forChild(routes);
