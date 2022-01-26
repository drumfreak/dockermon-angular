import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitylogsComponent } from './activitylogs.component';
import { PrimengStuffModule } from '../primeng-stuff/primeng-stuff.module';
import { ThemeModule } from '../theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivitylogsRoutes } from './activitylogs.routing';
import { ManageActivitylogsComponent } from './manage-activitylogs/manage-activitylogs.component';
import { ViewActivitylogsComponent } from './view-activitylogs/view-activitylogs.component';
import { EditActivitylogsComponent } from './manage-activitylogs/edit-activitylogs/edit-activitylogs.component';
import { ActivitylogsService } from './activitylogs.service';

@NgModule({
  imports: [CommonModule, PrimengStuffModule, ThemeModule, ReactiveFormsModule, FormsModule, ActivitylogsRoutes],
  declarations: [ActivitylogsComponent, ManageActivitylogsComponent, ViewActivitylogsComponent, EditActivitylogsComponent],
  providers: [ActivitylogsService],
})
export class ActivitylogsModule {}
