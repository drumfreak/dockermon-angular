import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class WebSocketService {
  public data: any;
  public socket1: Socket = this.socket;

  constructor(private socket: Socket) {}

  sendMessage(event: any, msg: any) {
    this.socket.emit(event, msg);
  }

  closeSocket() {
    this.socket.disconnect();
  }

  ngOnDestroy() {
    this.closeSocket();
  }
}
