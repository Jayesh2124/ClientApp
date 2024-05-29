import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked  {
  inputMessage = "";
  chatService = inject(ChatService)
  router = inject(Router)
  loggedInUserName = sessionStorage.getItem("User") ;
  roomName = sessionStorage.getItem("Room") ;
  @ViewChild('scrollMe') private msgHistoryContainer !: ElementRef

  message : string[] = [];
  ngOnInit(): void {
      this.chatService.messages$.subscribe(res =>{
        this.message = res;
        console.log(res);
      })
  }

  ngAfterViewChecked(): void {
      this.msgHistoryContainer.nativeElement.scrollTop = this.msgHistoryContainer.nativeElement.scrollHeight;
  }

  sendMessage()
  {
    this.chatService.sendMessage(this.inputMessage).
    then((res)=>{
      this.inputMessage = ""
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  leaveChat()
  {
    this.chatService.leaveChat()
    .then(()=>{
      this.router.navigate(['/welcome']);
    })
    .then((err)=>{
      console.log(err);
    })
  }
}
