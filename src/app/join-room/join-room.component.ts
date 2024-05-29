import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent implements OnInit {

  joinRoomForm !:FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router)
  chatService = inject(ChatService)

  ngOnInit(): void {
    this.chatService.startChat();
      this.joinRoomForm = this.fb.group({
        user: ['',Validators.required],
        room: ['',Validators.required]
      })
  }

  joinRoom()
  {
    debugger;
    const {user , room } = this.joinRoomForm.value
    this.chatService.joinRoom(user, room).then(()=>{
      sessionStorage.setItem("User",user);
      sessionStorage.setItem("Room",room);
      this.router.navigate(['chat']);
     })
     .catch((err)=>{
      console.log(err);
     })
  }
}
