import {Component, OnInit, ViewChild} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ChatService} from "../ChatService";

@Component({
  selector: 'app-login-guard',
  templateUrl: './login-guard.component.html',
  styleUrls: ['./login-guard.component.css']
})
export class LoginGuardComponent implements OnInit, CanActivate {
  constructor(private chatService: ChatService) { }

  canActivate(ActivatedRouteSnapshot, RouterStateSnapshot): Observable<boolean> | boolean {
    return this.chatService.getLoginFlag();
  };
  ngOnInit() {}

}
