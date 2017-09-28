import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {SocketIoModule, SocketIoConfig} from 'ng2-socket-io';
import {ChatService} from './ChatService';
import {Routes, RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ChatComponent } from './chat/chat.component';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} }
const routes: Routes = [
  {path : 'auth', component: AuthComponent},
  {path: 'chat', component: ChatComponent}
  ]
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ChatComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
