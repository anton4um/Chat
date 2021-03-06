import { Component, OnInit } from '@angular/core';
import {ChatService} from '../ChatService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
name: string;

  constructor(private chatService: ChatService, private router: Router) { }
Submit(name: string) {
    this.chatService.login(name);
    // console.log(name);
    this.router.navigate(['chat/', name]);
    this.chatService.setLoginFlag(true);
}

  ngOnInit() {
  }

}
