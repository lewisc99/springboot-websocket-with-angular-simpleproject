import { Component } from '@angular/core';
import * as Stomp from 'stompjs'
import SockJS from "sockjs-client"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private serverUrl = 'http://localhost:8080/socket'
  private stompClient:any;
  public  newMessage:any[];
  public stompConnection:any;
  constructor(){
    this.initializeWebSocketConnection();
    this.readMessage();
    this.newMessage = [];
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompConnection = this;
    this.stompClient.connect({}
    );
  }

  readMessage()
  {
    this.stompClient.connect({}, () =>{
      this.stompConnection.stompClient.subscribe("/chat", (message:any) => {
        if(message.body) {
          
          console.log(message.body);
          this.newMessage.push(message.body);
        }
      });
    });
  }
  sendMessage(message:any){

    console.log(message)
   this.stompClient.send("/app/send/message" , {}, message);




  }
}


