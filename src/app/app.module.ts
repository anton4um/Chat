import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {SocketIoModule, SocketIoConfig} from 'ng-socket-io';
import {ChatService} from './ChatService';
import {Routes, RouterModule} from '@angular/router';
import {PopupModule} from 'ng2-opd-popup';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ChatComponent } from './chat/chat.component';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} }
const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {path : 'auth', component: AuthComponent},
  {path: 'chat/:name', component: ChatComponent}
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
    PopupModule.forRoot(),
    MultiselectDropdownModule,
    AngularMultiSelectModule,
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
