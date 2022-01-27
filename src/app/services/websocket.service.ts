import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable()
export class WebSocketService {
  public data: any;
  // activeListener$ = this.socket.fromEvent<any>('containers');

  constructor(private socket: Socket) {
    console.log('Socket Connecting...');
  }

  private messageSource = new BehaviorSubject('');

  sendMessage(event: any, msg: any) {
    this.socket.emit(event, msg);
    console.log('SendMessage');
  }

  closeSocket() {
    this.socket.disconnect();
  }

  public listener(): Observable<any> {
    this.socket.on('containers', (data: any) => {
      // console.log('listener', data);
      if (data) {
        this.messageSource.next(data);
      }
    });
    return this.messageSource.asObservable();
  }

  ngOnDestroy() {
    this.closeSocket();
  }
}
