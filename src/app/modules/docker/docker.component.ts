/* eslint-disable prettier/prettier */
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DockerService } from './docker.service';
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subject, Subscription } from 'rxjs';
import { DockerCpuLineChartComponent } from './charts/docker-cpu-line-chart/docker-cpu-line-chart.component';
import { DockerMemoryLineChartComponent } from './charts/docker-memory-line-chart/docker-memory-line-chart.component';
import { DockerProcessesBarChartComponent } from './charts/docker-processes-bar-chart/docker-processes-bar-chart.component';
import { DockerNetworkLineChartComponent } from './charts/docker-network-line-chart/docker-network-line-chart.component';
import { WebSocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-docker',
  templateUrl: './docker.component.html',
  styleUrls: ['./docker.component.css'],
})
export class DockerComponent implements OnInit, OnDestroy {
  containers: any = [];
  containersOriginal: any = [];
  selectedContainer: any;
  selectedContainerIndex = 0;
  containerDetails: any = {};
  stats: any = [];
  statsCPU: any = [];
  statsDates: any = [];
  statsProcesses: any = [];
  statsMemoryPercent: any = [];
  statsMemory: any = [];
  statsNetworkIn: any = [];
  statsNetworkOut: any = [];
  queryParams: any;
  destroy$: Subject<void> = new Subject();
  lastStats: any = {};
  refresh = false;
  timerSubscription: Subscription = new Subscription();
  messages: string[] = [];

  @ViewChild('cpuChart') cpuChartViewChild: DockerCpuLineChartComponent = {} as DockerCpuLineChartComponent;
  @ViewChild('memoryChart')
  memoryChartViewChild: DockerMemoryLineChartComponent = {} as DockerMemoryLineChartComponent;
  @ViewChild('processesChart')
  processesChartViewChild: DockerProcessesBarChartComponent = {} as DockerProcessesBarChartComponent;
  @ViewChild('networkChart')
  networkChartViewChild: DockerNetworkLineChartComponent = {} as DockerNetworkLineChartComponent;

  isLoading = true;
  public localID: string;

  constructor(
    @Inject(LOCALE_ID) localID: string,
    private dockerService: DockerService,
    private router: Router,
    private route: ActivatedRoute,
    private socketService: WebSocketService,
  ) {
    this.localID = localID;
  }

  async ngOnInit() {
    // HTTP Method
    const r = await this.dockerService.getContainersPaginated({ running: true }).toPromise();
    let containers: any = [];
    if (r.status === 'success') {
      this.containersOriginal = r.data;
      containers = r.data.map((a: any) => {
        return {
          id: a.id,
          name: a.name,
          containerId: a.containerId,
          running: a.running,
        };
      });
    }

    this.route.queryParams.subscribe((queryParams) => {
      this.queryParams = queryParams;
      if (queryParams.containerId) {
        // console.log('queryPAramChanged', queryParams);
        const c = containers.filter((a: any) => Number(a.id) === Number(queryParams.containerId));
        if (c && c.length > 0) {
          this.selectedContainer = c[0];
          this.containers = containers;
          // console.log('SelectedContainer', this.selectedContainer);
          const c1 = this.containersOriginal.filter((a: any) => Number(a.id) === Number(queryParams.containerId));
          if (c1 && c1.length > 0) {
            this.containerDetails = c1[0].details;
          }
        }
      } else {
        this.containers = containers;
        this.selectedContainer = containers[0];
        this.containerDetails = containers[0].details || {};
      }
      this.getContainerStats();
    });

    this.isLoading = false;
    this.refresh = true;
    this.startTimer();
  }

  async getContainerStats() {
    this.isLoading = true;
    this.socketService.sendMessage('stats', {
      limit: 100,
      containerId: this.selectedContainer.id,
      sortKey: 'createdAt',
      sortType: 'DESC',
      activeFilters: [
        {
          filterOperator: 'eq',
          filterKey: 'containerId',
          filterValue: this.selectedContainer.id,
        },
      ],
    });

    this.socketService.socket1.fromEvent<any>('stats').subscribe((data: any) => {
      if (data) {
        if (data.data) {
          this.stats = data.data;
          this.processStats();
        }
      }
    });
  }

  processStats() {
    if (this.stats.length > 0) {
      this.lastStats = this.stats[this.stats.length - 1];
    }
    this.statsCPU = [];
    this.statsProcesses = [];
    this.statsMemory = [];
    this.statsMemoryPercent = [];
    this.statsNetworkIn = [];
    this.statsNetworkOut = [];
    this.statsDates = [];

    this.stats.map((a: any) => {
      const date = formatDate(new Date(a.createdAt), 'short', this.localID);
      this.statsCPU.push({ x: date, y: a.cpu });
      this.statsProcesses.push({ x: date, y: a.pids });
      this.statsMemory.push({ x: date, y: a.memory / 10000 });
      this.statsMemoryPercent.push({ x: date, y: a.memoryPercent });
      this.statsNetworkIn.push({ x: date, y: a.networkIn / 10000 });
      this.statsNetworkOut.push({ x: date, y: a.networiOut / 10000 });
      this.statsDates.push(date);
    });

    this.isLoading = false;

    setTimeout(() => {
      this.cpuChartViewChild.updateChart();
      this.memoryChartViewChild.updateChart();
      this.processesChartViewChild.updateChart();
      this.networkChartViewChild.updateChart();
    });
  }

  selectContainer(event: any) {
    if (!this.isLoading) {
      // console.log('selectContainer Event', event);
      this.stopTimer();
      this.selectedContainer = event.value;
      this.router.navigate(['/'], {
        queryParams: { containerId: this.selectedContainer.id },
      });
    }
  }

  startTimer() {
    this.stopTimer();
    if (this.refresh) {
      const timerInterval = interval(15 * 1000);
      // console.warn('Subscribing to timer ', timerName);
      this.timerSubscription = timerInterval.subscribe(() => {
        if (!this.selectedContainer?.id) {
          return
        }
        this.socketService.sendMessage('stats', {
          limit: 1000,
          containerId: this.selectedContainer.id,
          sortKey: 'createdAt',
          sortType: 'DESC',
          activeFilters: [
            {
              filterOperator: 'eq',
              filterKey: 'containerId',
              filterValue: this.selectedContainer.id,
            },
          ],
        });
      });
    }
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopTimer();
  }
}
