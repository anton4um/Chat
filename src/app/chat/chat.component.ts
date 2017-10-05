import {Component, DoCheck, OnInit} from '@angular/core';
import {Socket} from 'ng2-socket-io';
import {ChatService} from '../ChatService';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  data: any;
  messages0: any;
  messages = [];
  // private_msg = []
  nickname: any;
  orderMessage: any;
  message: any;
  user_names = [];
  obj: any;
  sockets: any;
  room: any;
  constructor(private chatService: ChatService, private socket: Socket, private route: ActivatedRoute) {
  }


  sendMessage() {
    this.chatService.sendMessage({name: this.nickname, msg: this.orderMessage.toString('UTF-8')});
  }
  sendMessageToRoom () {
    this.chatService.sendMessageToRoom({name: this.nickname, msg: this.orderMessage, room: this.room.room});
  }
  ngOnInit() {
    this.chatService.getMessage().subscribe(message => this.messages.push(message));
    this.chatService.getPrivet().subscribe(data => {this.messages.push(data); console.log(this.messages); });
    this.chatService.getUserNames().subscribe((userObj) => { this.user_names = userObj; console.log(this.user_names); });
    this.chatService.getFromRoom().subscribe(message => {this.messages.push(message); console.log(this.messages); });
    this.chatService.getIsInRoom().subscribe(room => this.room = room);

    this.route.params.subscribe(params => this.nickname = params['name']);
    console.log(this.nickname);
  }
  selectedUser (user) {
    this.chatService.sendUserName(user);
    console.log(user);
    console.log(this.room);
  }
}
