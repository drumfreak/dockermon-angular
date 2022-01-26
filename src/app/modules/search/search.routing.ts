import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { SearchComponent } from './search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    data: { title: 'Search', roles: ['Admin', 'TeamLead'] },
    canActivate: [AuthGuard],
  },
];

export const SearchRoutes = RouterModule.forChild(routes);
