/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { DockerService } from '../modules/docker/docker.service';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any = [];
  containers: any = [];
  containerIndex: any = [];
  socketContainers: any = [];
  containerListSocket!: Subscription;
  destroy$: Subject<void> = new Subject();
  isLoading = true;
  timerSubscription: Subscription = new Subscription();

  constructor(
    public app: AppComponent,
    private dockerService: DockerService,
    private socketService: WebSocketService,
  ) {}

  async ngOnInit() {
    await this.getContainers();
    this.containerStatus();
  }

  async getContainers() {
    const c: any = await this.dockerService.getContainersPaginated({ limit: 100 }).toPromise();
    if (c.status === 'success') {
      this.containers = c.data;
      this.processContainers();
    }
  }

  async buildMenu() {
    this.model = [
      {
        label: 'MAIN',
        icon: 'fa fa-fw fa-briefcase',
        items: [
          {
            label: 'Home',
            icon: 'fa fa-fw fa-home',
            routerLink: ['/'],
          },
        ],
      },
    ];
    return true;
  }

  async processContainers() {
    this.buildMenu();
    const projects: any = [];
    if (this.containers.length > 0) {
      this.containers.filter((item: any) => {
        const i = projects.findIndex((x: any) => x.projects == item.projects);
        if (i <= -1) {
          const p: any = { name: item.project };
          p.containers = this.containers.filter((a: any) => a.project === item.project);
          projects.push(p);
        }
        return null;
      });
    }

    projects.forEach((p: any) => {
      const project: any = {
        label: p.name,
        icon: 'fa fa-fw fa-briefcase',
        items: [],
      };
      p.containers.forEach((c: any) => {
        console.log('container', c.containerId);
        const c1: any = this.socketContainers.filter((a: any) => {
           return a.Id.slice(0, 12) === c.containerId
        });

        let running = false;
        if (c1 && c1.length > 0) {
          const details = c1[0];
          console.log('c1', c1[0]);
          if (details.State === 'running') {
            running = true;
          }
        }

        const item = {
          label: c.name,
          badge: running ? ' ' : '',
          badgeClass: running ? 'p-badge-success' : '',
          icon: 'fa fa-fw fa-briefcase',
          routerLink: ['/docker/containers', c.id],
        };
        project.items.push(item);
      });
      this.model.push(project);
    });
  }

  containerStatus() {
    if (!this.containerListSocket) {
      this.containerListSocket = this.socketService.socket1.fromEvent<any>('dockerResuls').subscribe(async (results: any) => {
        if (results.data) {
          this.socketContainers = results.data;
          // console.log('Socket Containers', this.socketContainers);
          // this.container.details = data.data;
          this.processContainers();
        }
      });
    }
    this.listContainers();
    this.startTimer();
  }

  listContainers() {
    setTimeout(() => {
      this.socketService.sendMessage('docker', {
        command: 'listContainers',
      });
    });
  }

  startTimer() {
    this.stopTimer();
    const timerInterval = interval(1 * 1000);
    // console.warn('Subscribing to timer ', timerName);
    this.timerSubscription = timerInterval.subscribe(() => {
      this.listContainers();
    });
    
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  onDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopTimer();
  }
}
