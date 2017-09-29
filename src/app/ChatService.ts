/**
 * Created by ant on 10.09.2017.
 */
import {Socket} from 'ng2-socket-io';
import {Injectable} from '@angular/core';
let source;
@Injectable()

export class ChatService {
   name: string;
  constructor(private socket: Socket) {}
  sendMessage(message) {
    this.socket.emit('message', message);
  }
  sendMessageToRoom(message) {
    this.socket.emit('from_room', message);
  }
  getMessage() {
    return this.socket.fromEvent<any>('message');
  }

  login(login) {
   this.socket.emit('login', login);
  }
  getUserNames () {
   source = this.socket.fromEvent('user_names_ids');
   return source;
  }
  sendUserName(username: any) {
    this.socket.emit('user_names_ids', username);
  }
  getPrivet () {
    return this.socket.fromEvent<any>('test_event');
  }
  getFromRoom () {
    return this.socket.fromEvent('from_room');
  }
  getIsInRoom () {
    return this.socket.fromEvent('is_in_room');
  }

}
