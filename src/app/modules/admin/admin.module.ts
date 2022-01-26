import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { PrimengStuffModule } from '../primeng-stuff/primeng-stuff.module';
import { ThemeModule } from '../theme/theme.module';
import { AdminRoutes } from './admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesModule } from './roles/roles.module';

@NgModule({
  imports: [CommonModule, PrimengStuffModule, ThemeModule, AdminRoutes, FormsModule, ReactiveFormsModule, RolesModule],
  declarations: [AdminComponent],
})
export class AdminModule {}
