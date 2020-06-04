import { Injectable } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsSrv: WebsocketService
  ) { }
  public sendMessage(mensaje: string) {
    const payload = {
      de: 'Jonathan',
      body: mensaje
    };

    this.wsSrv.emit('message', payload);
  }
}
