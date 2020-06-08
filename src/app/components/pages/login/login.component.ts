import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public nombre: string = '';

  constructor(
    private wbSrv: WebsocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public ingresar(): void {
    this.wbSrv.loginWebSocket(this.nombre)
    .then(resp => {
      this.router.navigate(['/chat']);
    });
  }

}
