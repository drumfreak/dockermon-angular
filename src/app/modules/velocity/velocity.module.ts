import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VelocityComponent } from './velocity.component';
import { PrimengStuffModule } from '../primeng-stuff/primeng-stuff.module';
import { ThemeModule } from '../theme/theme.module';
import { AppNavigationModule } from '../app-navigation/app-navigation.module';
import { VelocityChartBarComponent } from './charts/velocity-chart-bar/velocity-chart-bar.component';
import { VelocityChartDonutComponent } from './charts/velocity-chart-donut/velocity-chart-donut.component';
import { VelocityService } from './velocity.service';
import { VelocityIndividualComponent } from './velocity-individual/velocity-individual.component';

@NgModule({
  imports: [CommonModule, AppNavigationModule, PrimengStuffModule, ThemeModule],
  declarations: [VelocityComponent, VelocityChartBarComponent, VelocityChartDonutComponent, VelocityIndividualComponent],
  exports: [VelocityComponent, VelocityChartBarComponent, VelocityChartDonutComponent, VelocityIndividualComponent],
  providers: [VelocityService],
})
export class VelocityModule {}
