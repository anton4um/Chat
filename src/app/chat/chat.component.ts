import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
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
export class ChatComponent implements OnInit, OnDestroy {
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

  usersInRoom: any;
  dropdownList = [];
  selectedUsers = [];


  dropdownSettings = {
    singleSelection: false,
    text: 'Select Users',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'myclass custom-class'
  };


  @ViewChild('inputOrder') inputOrder: HTMLElement;
  constructor(private popup: Popup, private chatService: ChatService, private socket: Socket, private route: ActivatedRoute) {
  }


popupShow() {
  this.popup.options = {
    header: 'Your custom header',
    color: '#5cb85c', // red, blue....
    widthProsentage: 40, // The with of the popou measured by browser width
    animationDuration: 1, // in seconds, 0 = no animation
    showButtons: true, // You can hide this in case you want to use custom buttons
    confirmBtnContent: 'OK', // The text on your confirm button
    cancleBtnContent: 'Cancel', // the text on your cancel button
    confirmBtnClass: 'btn btn-default', // your class for styling the confirm button
    cancleBtnClass: 'btn btn-default', // you class for styling the cancel button
    animation: 'fadeInDown' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
  };

    this.dropdownList = [];
 //   if (this.dropdownList.length === 0) {
      for (let i = 0; i < this.user_names.length; i++) {
        this.dropdownList.push({id: this.user_names[i].client_id, itemName: this.user_names[i].name, room: ''});
      }
 //   }
  this.popup.show(this.popup.options);
}
popupConfirmClick () {
    this.chatService.sendUserName(this.selectedUsers);
    this.popup.hide();
}
  sendMessage() {
    this.chatService.sendMessage({name: this.nickname, msg: this.orderMessage});
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
    this.chatService.getUsersInRoom().subscribe(users => {this.usersInRoom = users; console.log('users in room', this.usersInRoom)});

    this.route.params.subscribe(params => this.nickname = params['name']);
    // console.log(this.nickname);

  }

  ngOnDestroy() {
    this.socket.emit('is_in_room', this.room);
  }
}
