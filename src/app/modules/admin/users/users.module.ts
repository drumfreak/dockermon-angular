import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { PrimengStuffModule } from '../../primeng-stuff/primeng-stuff.module';
import { ThemeModule } from '../../theme/theme.module';
import { UsersService } from './users.service';
import { MessageService } from 'primeng/api';
import { UsersRoutes } from './users.routing';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './manage-user/edit-user/edit-user.component';

@NgModule({
  imports: [CommonModule, PrimengStuffModule, ThemeModule, UsersRoutes, FormsModule, ReactiveFormsModule],
  declarations: [UsersComponent, ManageUserComponent, ViewUserComponent, EditUserComponent],
  providers: [UsersService, MessageService],
})
export class UsersModule {}
