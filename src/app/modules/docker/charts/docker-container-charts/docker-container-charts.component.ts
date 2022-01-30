/* eslint-disable prettier/prettier */
import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { DockerCpuLineChartComponent } from './../docker-cpu-line-chart/docker-cpu-line-chart.component';
import { DockerMemoryLineChartComponent } from './../docker-memory-line-chart/docker-memory-line-chart.component';
import { DockerProcessesBarChartComponent } from './../docker-processes-bar-chart/docker-processes-bar-chart.component';
import { DockerNetworkLineChartComponent } from './../docker-network-line-chart/docker-network-line-chart.component';
import { WebSocketService } from 'src/app/services/websocket.service';
import { DockerService } from '../../docker.service';

@Component({
  selector: 'app-docker-container-charts',
  templateUrl: './docker-container-charts.component.html',
  styleUrls: ['./docker-container-charts.component.css'],
})
export class DockerContainerChartsComponent implements OnInit, OnDestroy {
  @Input() containerId!: number;
  @Input() container!: any;

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
  public locale: string;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private dockerService: DockerService,
    private socketService: WebSocketService,
  ) {
    this.locale = locale;
  }

  async ngOnInit() {
    this.isLoading = false;
    this.refresh = true;
    this.startTimer();

    if (!this.container && this.containerId) {
      const c: any = await this.dockerService.getContainerById(this.containerId).toPromise();
      if (c.status === 'success') {
        this.container = c.data;
      }
    }
    this.getContainerStats();
  }

  async getContainerStats() {
    this.isLoading = true;
    this.socketService.sendMessage('stats', {
      limit: 100,
      containerId: this.container.id,
      sortKey: 'createdAt',
      sortType: 'DESC',
      activeFilters: [
        {
          filterOperator: 'eq',
          filterKey: 'containerId',
          filterValue: this.container.id,
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
      const date = formatDate(new Date(a.createdAt), 'short', this.locale);
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

  startTimer() {
    this.stopTimer();
    if (this.refresh) {
      const timerInterval = interval(15 * 1000);
      // console.warn('Subscribing to timer ', timerName);
      this.timerSubscription = timerInterval.subscribe(() => {
        this.socketService.sendMessage('stats', {
          limit: 100,
          containerId: this.container.id,
          sortKey: 'createdAt',
          sortType: 'DESC',
          activeFilters: [
            {
              filterOperator: 'eq',
              filterKey: 'containerId',
              filterValue: this.container.id,
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
