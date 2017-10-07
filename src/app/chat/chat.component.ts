import {Component, DoCheck, OnInit, ViewChild, } from '@angular/core';
import {Socket} from 'ng-socket-io';
import {ChatService} from '../ChatService';
import {ActivatedRoute} from '@angular/router';
import {Popup} from 'ng2-opd-popup';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],

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
  optionsModel1: string;
  optionsModel: number[];
  myOptions: IMultiSelectOption[] = [];

  dropdownList = [];
  selectedItems = [];

  @ViewChild('inputOrder') inputOrder: HTMLElement;
  constructor(private popup: Popup, private chatService: ChatService, private socket: Socket, private route: ActivatedRoute) {
  }


popupShow() {
    this.popup.show();
    console.log('this is user_names', this.user_names);
    for (let i = 0; i < this.user_names.length; i++) {
      this.dropdownList.push({id: this.user_names[i].client_id, itemName: this.user_names[i].name});
    }
    console.log('this is myOptions', this.selectedItems );

}

  sendMessage() {
    this.chatService.sendMessage({name: this.nickname, msg: this.inputOrder.nodeValue.toString()});
    console.log(this.orderMessage);
  }
  sendMessageToRoom () {
    this.chatService.sendMessageToRoom({name: this.nickname, msg: this.orderMessage, room: this.room.room});
  }
  ngOnInit() {
    this.chatService.getMessage().subscribe(message => {this.messages.push(message); console.log(this.messages); });
    this.chatService.getPrivet().subscribe(data => {this.messages.push(data); console.log(this.messages); });
    this.chatService.getUserNames().subscribe((userObj) => { this.user_names = userObj; console.log(this.user_names); });
    this.chatService.getFromRoom().subscribe(message => {this.messages.push(message); console.log(this.messages); });
    this.chatService.getIsInRoom().subscribe(room => this.room = room);

    this.route.params.subscribe(params => this.nickname = params['name']);
    // console.log(this.nickname);

  }
  selectedUser (user) {
    this.chatService.sendUserName(user);
    console.log(user);
    console.log(this.room);
  }
}
