import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularSockets';

  constructor(
    public wbsocketSrv: WebsocketService,
    private chatSrv: ChatService
  ) { }

  ngOnInit() {
    this.chatSrv.getPrivateMessages().subscribe(resp => {
      console.log(resp);
    });
  }


}
