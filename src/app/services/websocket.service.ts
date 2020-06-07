import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
  }



  private checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });

  }

  public emit(evento: string, payload?: any, callbakc?: Function) {
    console.log('Emitiendo mensaje');
    this.socket.emit(evento, payload);
  }

  public listenServerEvetns(evento: string): Observable<any> {
    return this.socket.fromEvent(evento);
  }
}
