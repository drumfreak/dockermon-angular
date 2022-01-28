/* eslint-disable prettier/prettier */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TerminalService } from 'primeng/terminal';
import { Subscription, Subject } from 'rxjs';
import { WebSocketService } from 'src/app/services/websocket.service';
import { DockerService } from '../../docker.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FunctionsUsingCSI, NgTerminal } from 'ng-terminal';

@Component({
  selector: 'app-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.scss'],
  providers: [TerminalService, MessageService, ConfirmationService]
})
export class ViewContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  containerId = 0;
  container: any;
  isLoading = true;
  containerInspectSocket!: Subscription;
  containerTerminalSocket!: Subscription;
  responseData = '';
  terminalPrompt = 'docker #>';
  isWriting = false;
  lastStats: any;

  @ViewChild('term', { static: true }) terminal!: NgTerminal;
  destroy$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private dockerService: DockerService,
    private socketService: WebSocketService,
    public terminalService: TerminalService,
  ) {
    this.terminalService.commandHandler.subscribe((command) => {
      // const response = command === 'date' ? new Date().toDateString() : 'Unknown command: ' + command;
      this.terminalService.sendResponse(command);
    });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      if (this.containerTerminalSocket) {
        this.ngOnDestroy();
      }
      this.isLoading = true;
      this.containerId = Number(paramMap.get('id'));
      const c: any = await this.dockerService.getContainerById(this.containerId).toPromise();
      if (c.status === 'success') {
        this.container = c.data;
        this.terminalPrompt = 'docker:' + this.container.name + '$  ';
        // console.log(this.container);
        this.isLoading = false;
        this.containerStatus();
        this.terminalAttach();
      }
    });
  }

  ngAfterViewInit() {
  }

  terminalAttach() {
    let currentCommand = '';
    this.terminal.keyEventInput.subscribe(e => {
      // console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);
      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
      currentCommand += e.key;

      if (ev.keyCode === 13) {
        this.terminalSend(currentCommand);
        currentCommand = '';
        this.terminal.write('\n' + FunctionsUsingCSI.cursorColumn(1) + this.terminalPrompt ); // \r\n
      } else if (ev.keyCode === 8) {
        if (this.terminal.underlying.buffer.active.cursorX > 2) {
          this.terminal.write('\b \b');
        }
      } else if (printable) {
        this.terminal.write(e.key);
      }
    })
    this.terminal.write(this.terminalPrompt);
    if (!this.containerTerminalSocket) {
      this.containerTerminalSocket = this.socketService.socket1.fromEvent<any>('dockerReceiver').subscribe((data: any) => {
        if (data) {
          this.terminal.write(this.terminalPrompt + ' ' + data);
        }
      });
    }
    this.socketService.sendMessage('dockerAttach', {
      action: 'attach',
      containerId: this.container.containerId,
    });
  }

  terminalSend(command: string) {
    this.socketService.sendMessage('dockerAttach', {
      action: 'command',
      command: command,
      containerId: this.container.containerId,
    });
  }

  containerStatus() {
    if (!this.containerInspectSocket) {
      this.containerInspectSocket = this.socketService.socket1.fromEvent<any>('dockerReceiver').subscribe((data: any) => {
        this.isLoading = false;
        if (data) {
          if (data.status === 'success') {
            // this.stats = data.data;
            // this.processStats();
            console.log('Details', data.data);
            this.container.details = data.data;
          }
        }
        this.isLoading = false;
      });
    }
    this.isLoading = false;
    this.inspectContainer();
  }

  inspectContainer() {
    this.isLoading = false;
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

  ngOnDestroy() {
    console.log('Destroying');
    this.socketService.sendMessage('dockerAttach', {
      action: 'close',
      containerId: this.container.containerId,
    });
    this.destroy$.next();
    this.destroy$.complete();
  }
}
