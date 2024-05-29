import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public connection : signalR.HubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7010/chat")
  .configureLogging(signalR.LogLevel.Information)
  .build();

  public messages$ = new BehaviorSubject<any>([]);
  public connectedUser$ = new BehaviorSubject<string[]>([])
  public messages : any[] = []
  public users: string[]= []


  constructor() {
    this.connection.on("ReceiveMessage", (user: string, message: string, messageTime: string) =>{
      this.messages = [...this.messages, {user,message, messageTime}]
      this.messages$.next(this.messages);
    })
    this.connection.on("ConnectedUser", (users: any)=>{
      this.connectedUser$.next(users);
    })
    this.startChat();
   }

  // start Connectino
  public async startChat()
  {
    try {
      await this.connection.start();
      console.log("Connection is established!");
    } catch (error) {
      console.log(error);
    }
  }

  // join room
  public async joinRoom(user:string,room:string)
  {
    return await this.connection.invoke("JoinRoom", {user,room});
  }

  // send message 
  public async sendMessage(message: string)
  {
    return await this.connection.invoke("SendMessage", message);
  }

  // leave room
  public async leaveChat()
  {
    return this.connection.stop();
  }

}


