/**
 * Created by ant on 10.09.2017.
 */
import {Socket} from 'ng-socket-io';
import {Injectable} from '@angular/core';
import get = Reflect.get;
import set = Reflect.set;
import {any} from "codelyzer/util/function";

let source;
@Injectable()

export class ChatService {
   name: string;
   flag: any = false;
  constructor(private socket: Socket) {}


  sendMessage(message) {
    this.socket.emit('message', message);
  }
  sendMessageToRoom(message) {
    this.socket.emit('from_room', message);
  }
  sendUserName(username: any) {
    this.socket.emit('user_names_ids', username);
  }
  sendUsersToDisconnect(data){
    this.socket.emit('users_to_disconnect',data);
  }

  getUsersInRoom(){
    return this.socket.fromEvent('users_in_room');
  }
  getMessage() {
    return this.socket.fromEvent('message');
  }

  login(login) {
   this.socket.emit('login', login);
  }
  getUserNames () {
   source = this.socket.fromEvent('user_names_ids');
   return source;
  }
  getPrivet () {
    return this.socket.fromEvent<any>('test_event');
  }
  getFromRoom () {
    return this.socket.fromEvent('from_room');
  }
  getInvitation () {
    return this.socket.fromEvent('is_in_room');
  }
  getSocketsToRemove(){
    return this.socket.fromEvent('users_to_remove');
  }

usersToDisconnect = {
  users: any,
  get ToDisconnect(){
      return this.usersToDisconnect.users;
  },
  set ToDisconnect(data){
      this.usersToDisconnect.users = data;
  }
}

  setLoginFlag(value) {
    this.flag = value;
  }
  getLoginFlag() {
    return this.flag;
  }

}
