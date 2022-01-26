import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { AuthGuard } from './auth.guard';
import { AppDashboardComponent } from './dashboards/app-dashboard/app-dashboard.component';
import { ForgotPasswordComponent } from './modules/app-pages/forgot-password/forgot-password.component';
import { LoginComponent } from './modules/app-pages/login/login.component';
import { LogoutComponent } from './modules/app-pages/logout/logout.component';
import { ResetPasswordComponent } from './modules/app-pages/reset-password/reset-password.component';
import { DockerComponent } from './modules/docker/docker.component';

const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    children: [
      {
        path: '',
        component: DockerComponent,
        canActivate: [AuthGuard],
        data: { title: 'Welcome', roles: ['Admin'] },
      },
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'docker',
        loadChildren: () => import('./modules/docker/docker.module').then((m) => m.DockerModule),
      },
      {
        path: 'search',
        loadChildren: () => import('./modules/search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'logs',
        loadChildren: () => import('./modules/activitylogs/activitylogs.module').then((m) => m.ActivitylogsModule),
      },
    ],
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/logout',
    component: LogoutComponent,
  },
  {
    path: 'auth/forgot',
    component: ForgotPasswordComponent,
  },
  {
    path: 'auth/reset',
    component: ResetPasswordComponent,
  },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: [],
  declarations: [],
})
export class AppRoutingModule {}
