import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RolesRoutes } from './roles.routing';
import { RolesService } from './roles.service';

@NgModule({
  imports: [CommonModule],
  declarations: [RolesComponent],
  providers: [RolesService],
})
export class RolesModule {}
