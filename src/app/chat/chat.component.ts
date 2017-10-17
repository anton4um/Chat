import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Socket} from 'ng-socket-io';
import {ChatService} from '../ChatService';
import {ActivatedRoute} from '@angular/router';
import {Popup} from 'ng2-opd-popup';
// import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';




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
  invitation: any;

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
  @ViewChild('popup_select_user') popup_select_user: Popup;
  @ViewChild('popup_invitation') popup_invitation: Popup;
  constructor( private chatService: ChatService, private socket: Socket, private route: ActivatedRoute) {
  }

leavingTheRoom(data){

    this.socket.emit('is_in_room',{inRoom: false, room: data.room});
  console.log('room to leave',data.room);
  this.invitation.inRoom = false;
  this.usersInRoom = [];
}

popupShow() {
  this.popup_select_user.options = {
    header: 'Select Users to add to Room',
    color: '#5cb85c', // red, blue....
    widthProsentage: 40, // The with of the popup measured by browser width
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
  this.popup_select_user.show(this.popup_select_user.options);
}

popupConfirmClick () {
    this.chatService.sendUserName(this.selectedUsers);
    this.popup_select_user.hide();
}
popupInvitationConfirmClick(){

  this.popup_invitation.hide();
}



  sendMessage() {
    this.chatService.sendMessage({name: this.nickname, msg: this.orderMessage});
    console.log(this.orderMessage);

  }
  sendMessageToRoom () {
    this.chatService.sendMessageToRoom({name: this.nickname, msg: this.orderMessage, room: this.invitation.room});
    console.log('sanded to room');
  }
  ngOnInit() {
    this.chatService.getMessage().subscribe(message => {this.messages.push(message); console.log(this.messages); });
    this.chatService.getPrivet().subscribe(data => {this.messages.push(data); console.log(this.messages); });
    this.chatService.getUserNames().subscribe((userObj) => { this.user_names = userObj; console.log(this.user_names); });
    this.chatService.getFromRoom().subscribe(message => {this.messages.push(message); console.log(this.messages); });
    this.chatService.getInvitation().subscribe((invitation) => {this.invitation = invitation;
                                                                    this.popup_invitation.show()});
    this.chatService.getUsersInRoom().subscribe(users => {this.usersInRoom = users; console.log('users in room', this.usersInRoom)});

    this.route.params.subscribe(params => this.nickname = params['name']);
    // console.log(this.nickname);

  }

  ngOnDestroy() {
    this.socket.emit('is_in_room', this.invitation);
  }
}
