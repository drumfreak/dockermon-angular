import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockerComponent } from './docker.component';
import { AppNavigationModule } from '../app-navigation/app-navigation.module';
import { PrimengStuffModule } from '../primeng-stuff/primeng-stuff.module';
import { ThemeModule } from '../theme/theme.module';
import { DockerService } from './docker.service';
import { DockerCpuLineChartComponent } from './charts/docker-cpu-line-chart/docker-cpu-line-chart.component';
import { DockerProcessesBarChartComponent } from './charts/docker-processes-bar-chart/docker-processes-bar-chart.component';
import { DockerMemoryLineChartComponent } from './charts/docker-memory-line-chart/docker-memory-line-chart.component';
import { DockerNetworkLineChartComponent } from './charts/docker-network-line-chart/docker-network-line-chart.component';
import { WebSocketService } from 'src/app/services/websocket.service';
import { DockerRoutes } from './docker.routing';
import { ViewContainerComponent } from './containers/view-container/view-container.component';
import { ViewContainersComponent } from './containers/view-containers/view-containers.component';
import { TerminalService } from 'primeng/terminal';
import { NgTerminalModule } from 'ng-terminal';
import { DockerContainerChartsComponent } from './charts/docker-container-charts/docker-container-charts.component';

@NgModule({
  imports: [CommonModule, AppNavigationModule, PrimengStuffModule, ThemeModule, DockerRoutes, NgTerminalModule],
  declarations: [
    DockerComponent,
    DockerCpuLineChartComponent,
    DockerNetworkLineChartComponent,
    DockerProcessesBarChartComponent,
    DockerMemoryLineChartComponent,
    ViewContainerComponent,
    ViewContainersComponent,
    DockerContainerChartsComponent
  ],
  providers: [DockerService, WebSocketService, TerminalService],
})
export class DockerModule {}
