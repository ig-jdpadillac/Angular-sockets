import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean;
  public usuario: Usuario;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
    this.cargarStorage();
  }



  private checkStatus() {
    this.socket.on('connect', () => {
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
    });

  }

  public emit(evento: string, payload?: any, callbakc?: Function) {
    if (callbakc) {
      this.socket.emit(evento, payload, callbakc);
    } else {
      this.socket.emit(evento, payload);
    }
  }

  public listenServerEvetns(evento: string): Observable<any> {
    return this.socket.fromEvent(evento);
  }

  public loginWebSocket(nombreUsuario: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre: nombreUsuario }, resp => {
        this.usuario = new Usuario(nombreUsuario);
        this.guardarStorage();
        resolve();
      });
    });
  }

  public getUsuario(): Usuario {
    return this.usuario;
  }

  private guardarStorage(): void {
    localStorage.setItem('usuarioSocket', JSON.stringify(this.usuario))
  }

  private cargarStorage(): void {
    if (localStorage.getItem('usuarioSocket')) {
      this.usuario = JSON.parse(localStorage.getItem('usuarioSocket'));
      this.loginWebSocket(this.usuario.name);
    }
  }
}
