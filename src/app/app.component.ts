import {Component, OnInit} from '@angular/core';
import {Socket} from 'ng2-socket-io';
import {ChatService} from './ChatService';


@Component({
  selector: 'app-root',
  template: ` <a routerLink="auth">Login</a>
              <router-outlet></router-outlet>
              `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

constructor() {    }

ngOnInit() {
     // this.chatService.getMessage().subscribe(message => this.messages.push(message));
   // this.socket.fromEvent<any>('message').subscribe(message => this.messages.push(message));
    // console.log(this.messages[0][0][0]);
    /*if (this.messages !== undefined) {
      this.messages0.push(this.messages[0][1]);
      console.log(this.messages0);
    }*/
}


}
