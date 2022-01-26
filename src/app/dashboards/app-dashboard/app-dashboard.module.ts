import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDashboardComponent } from './app-dashboard.component';
import { PrimengStuffModule } from '../../../app/modules/primeng-stuff/primeng-stuff.module';
import { ThemeModule } from '../../../app/modules/theme/theme.module';

@NgModule({
  imports: [CommonModule, PrimengStuffModule, ThemeModule],
  declarations: [AppDashboardComponent],
})
export class AppDashboardModule {}
