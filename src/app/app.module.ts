import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {SocketIoModule, SocketIoConfig} from 'ng-socket-io';
import {ChatService} from './ChatService';
import {Routes, RouterModule} from '@angular/router';
import {PopupModule} from 'E:\\ProgramFiles\\Chat\\node_modules\\ng2-opd-popup';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ChatComponent } from './chat/chat.component';
import { LoginGuardComponent } from './login-guard/login-guard.component';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} }
const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {path : 'auth', component: AuthComponent},
  {path: 'chat', component: ChatComponent, canActivate: [LoginGuardComponent]},
  {path: 'chat/:name', component: ChatComponent, canActivate: [LoginGuardComponent]}
  ]
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ChatComponent,
    LoginGuardComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    SocketIoModule.forRoot(config),
    PopupModule.forRoot(),
    AngularMultiSelectModule,
  ],
  providers: [ChatService, LoginGuardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
