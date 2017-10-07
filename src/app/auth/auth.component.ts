import { Component, OnInit } from '@angular/core';
import {Socket} from 'ng-socket-io';
import {ChatService} from '../ChatService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  template: `<p>
    Enter the name
    <input [(ngModel)]="name"  /><button (click)="Submit(name)">Submit</button>
  </p>`,
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
name: string;
  constructor(private chatService: ChatService, private router: Router) { }
Submit(name: string) {
    this.chatService.login(name);
    // console.log(name);
    this.router.navigate(['chat/', name]);
}
  ngOnInit() {
  }

}
