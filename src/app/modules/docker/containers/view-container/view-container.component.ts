/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/services/websocket.service';
import { DockerService } from '../../docker.service';

@Component({
  selector: 'app-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.css'],
})
export class ViewContainerComponent implements OnInit {
  containerId = 0;
  container: any;
  isLoading = true;
  containerInspectSocket!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dockerService: DockerService,
    private socketService: WebSocketService,
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.isLoading = true;
      this.containerId = Number(paramMap.get('id'));
      const c: any = await this.dockerService.getContainerById(this.containerId).toPromise();
      if (c.status === 'success') {
        this.container = c.data;
        console.log(this.container);
        this.isLoading = false;
        this.containerStatus();
      }
    });
  }

  containerStatus() {
    if (!this.containerInspectSocket) {
      this.containerInspectSocket = this.socketService.socket1.fromEvent<any>('dockerResuls').subscribe((data: any) => {
        this.isLoading = true;
        if (data) {
          if (data.status === 'success') {
            // this.stats = data.data;
            // this.processStats();
            console.log('Details', data.data);
            this.container.details = data.data;
            this.isLoading = false;
          }
        }
      });
    }
    this.inspectContainer();
  }

  inspectContainer() {
    this.isLoading = true;
    this.socketService.sendMessage('docker', {
      command: 'inspect',
      containerId: this.container.containerId,
    });
  }

  pauseContainer() {
    this.isLoading = true;
    this.socketService.sendMessage('docker', {
      command: 'pause',
      containerId: this.container.containerId,
    });
  }

  unpauseContainer() {
    this.isLoading = true;
    this.socketService.sendMessage('docker', {
      command: 'unpause',
      containerId: this.container.containerId,
    });
  }

  startContainer() {
    this.isLoading = true;
    this.socketService.sendMessage('docker', {
      command: 'start',
      containerId: this.container.containerId,
    });
  }

  stopContainer() {
    this.isLoading = true;
    this.socketService.sendMessage('docker', {
      command: 'stop',
      containerId: this.container.containerId,
    });
  }

  restartContainer() {
    this.isLoading = true;
    this.socketService.sendMessage('docker', {
      command: 'restart',
      containerId: this.container.containerId,
    });
  }
}
