import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { VelocityIndividualComponent } from './velocity-individual/velocity-individual.component';
import { VelocityTeamComponent } from './velocity-team/velocity-team.component';
import { VelocityComponent } from './velocity.component';

const routes: Routes = [
  {
    path: '',
    component: VelocityComponent,
    data: { title: 'Team Velocity', roles: ['Admin', 'TeamLead'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'team',
    component: VelocityTeamComponent,
    data: { title: 'Team Velocity', roles: ['Admin', 'TeamLead'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'individual',
    component: VelocityIndividualComponent,
    data: { title: 'Individual Velocity', roles: ['Admin', 'TeamLead'] },
    canActivate: [AuthGuard],
  },
];

export const VelocityRoutes = RouterModule.forChild(routes);
