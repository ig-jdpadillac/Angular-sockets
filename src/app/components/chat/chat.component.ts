import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public mensaje: string = '';
  public messageSubscription: Subscription;
  public mensajes: any[] = [];
  public elemento: HTMLElement;

  constructor(
    private chat: ChatService,
    private wbsSrv: WebsocketService
  ) { }

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensajes');
    this.setMesagges();
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  public enviar(): void {
    this.mensaje.trim().length > 0 ?  this.chat.sendMessage({de: `${this.wbsSrv.usuario.name}`, body: this.mensaje}) : this.mensaje = '';
    this.mensaje = '';
  }

  private setMesagges(): void {
    this.messageSubscription = this.chat.getMessages().subscribe(resp => {
      console.log(resp);
      this.mensajes.push(resp);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 100);
    });
  }



}
