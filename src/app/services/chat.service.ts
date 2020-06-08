import { Injectable } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsSrv: WebsocketService
  ) { }

  public sendMessage(payload: {de: string, body: string}) {
    this.wsSrv.emit('message', payload, null);
  }

  public getMessages(): Observable<any> {
    return this.wsSrv.listenServerEvetns('newMessage');
  }

}
