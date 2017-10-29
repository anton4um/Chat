import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../ChatService";
import {Popup} from "ng2-opd-popup";
import {Socket} from 'ng-socket-io';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

constructor(public chatService: ChatService, public socket: Socket) { }

  dropdownSettings = {
    singleSelection: false,
    text: 'Select Users',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'myclass custom-class'
  };

user_names = [];
dropdownList = [];
socketList = [];
socketListToRemove=[];

@ViewChild('sockets_to_remove') socketsToRemove: Popup;
  ngOnInit() {
    this.chatService.getUserNames().subscribe(users=>{this.user_names = users; console.log('users: ',users)});




    //this.chatService.getSocketsToRemove().subscribe(socket => this.socketList.push(socket))
  }
popupConfirmClick(){
  console.log('sockets to remove',this.socketListToRemove);
    this.chatService.sendUsersToDisconnect(this.socketListToRemove);
  //this.socket.emit('users_to_disconnect', this.socketListToRemove);
    this.socketsToRemove.hide();

};
showPopup() {
  this.socketsToRemove.options = {
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
  this.socketsToRemove.show(this.socketsToRemove.options);

  for (let i = 0; i < this.user_names.length; i++) {
    this.dropdownList.push({id: this.user_names[i].client_id, itemName: this.user_names[i].name, room: ''});
    console.log('user names in for', this.user_names[i]);
  }

  console.log('user names',this.user_names);
  console.log('dromdownList',this.dropdownList);
}
}
