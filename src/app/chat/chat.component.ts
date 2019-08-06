import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import {ChatServiceService} from './chat-service.service';
import { Config } from "./../Config";
// import { config } from '../../../protractor.conf';
// import { WSAEACCES } from 'constants';

var ws;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
allChatTutors:any;
previouschats:any;
chatHistory:any;
assignedRoom:any;
userid;
obj1;
public Imageurl = Config.Imageurlget;
  constructor(public chatIns:ChatServiceService) { }

  ngOnInit() {
    // window.addEventListener("load", OnInit, false);
    this.getChatUsers();
    this.getPreviousChats();
  

    }
    getCurrent:any;
    webSocketFunc()
    {
      ws=new WebSocket('wss://apis.cramfrenzy.com/chat/29/');
      ws.onopen=function(e)
      {
        console.log('readystate',ws.readyState);
        // console.log('Received Msg:',e.data);
      }
      ws.onclose=function(e)
      {
        console.log('closed:',e);
      }
      ws.onmessage=function(e)
      {
        console.log('message:',e);
        this.getCurrent=JSON.parse(e.data);
        console.log(this.getCurrent);
        this.msgreceive(e)
        // self.previouschats.push()
        // return this.getCurrent;
      }
      // console.log('gah',this.getCurrent);
    }
   msgreceive=function(data)
    {
      console.log('data',data);
    }
  getChatUsers()
  {
    this.chatIns.getAllChatUsers().subscribe(chatUsers=>
      {
       
        this.allChatTutors=chatUsers;
        console.log('chatUsers:',this.allChatTutors);
      })
  }
  getPreviousChats()
  {
    this.chatIns. getPreviousChats().subscribe(prevChats=>
      {
        this.previouschats=prevChats.detail;
        console.log('Previous:',this.previouschats);
      });
  }
  getChats(id)
  {
    this.userid=JSON.parse(localStorage.getItem('currentUser')).user_id
    console.log('CurrentuserId:',this.userid);
    this.chatIns.getChats(id).subscribe(chathis=>
      {
        this.chatHistory=chathis.messages;
        console.log('Chathistory:',this.chatHistory);
      });
  }
  assignNewRoom(uname)
  {
    console.log('unameforroom:',uname)
    this.chatIns.assignRoom(uname).subscribe(assignRoom=>
      {
        this.assignedRoom=assignRoom.room;
        console.log('AssignRoom:',this.assignedRoom);

        this.getPreviousChats();
        this.getChats(this.assignedRoom);
      });
  }
  sendMsg(msg)
  {
this.obj1={
  username:"David",
  message:msg
    };
    ws.send(JSON.stringify(this.obj1));
    console.log(this.getCurrent);
  }
}
