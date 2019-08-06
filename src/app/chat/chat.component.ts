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
getCurrent:any;
userid;
cusername;
obj1;
public Imageurl = Config.Imageurleach;
  constructor(public chatIns:ChatServiceService) { }

  ngOnInit() {
    // window.addEventListener("load", OnInit, false);
   
    // console.log('curr:',this.cusername);
    this.getChatUsers();
    this.getPreviousChats();
    }
    
    webSocketFunc(roomid)
    {
      ws=new WebSocket('wss://apis.cramfrenzy.com/chat/'+roomid+'/');
      ws.onopen=function(e)
      {
        console.log('readystate',ws.readyState);
        // console.log('Received Msg:',e.data);
      }
      ws.onclose=function(e)
      {
        console.log('WebSoket Closed due to Some Reason:',e);
      }
      ws.onmessage=function(e)
      {
        console.log('message:',e);
        this.getCurrent=JSON.parse(e.data);
        console.log('c1:',this.getCurrent.username);
        this.cusername=JSON.parse(localStorage.getItem('currentUser')).username;
        console.log('c2:',this.cusername)
        if(this.getCurrent.username==this.cusername)
        {
          console.log('1')
          var ul = document.getElementById("msgUl");
          var li = document.createElement("li");
          // var children = ul.children.length + 1
          // li.setAttribute("id", "element"+children)
          li.appendChild(document.createTextNode(this.getCurrent.message));
          ul.appendChild(li)
          // document.getElementById('li.setAttribute').innerText=this.getCurrent.message;
        }
        else if(this.getCurrent.username!=this.cusername)
        {
          var ul = document.getElementById("msgUl");
          var li = document.createElement("li");
          // var children = ul.children.length + 1
          // li.setAttribute("id", "element"+children)
          li.appendChild(document.createTextNode(this.getCurrent.message));
          ul.appendChild(li)
          // document.getElementById().innerText=this.getCurrent.message;
          // document.getElementById('otherUserMsg').innerText=this.getCurrent.message;
        }
        // rcvMsg=JSON.parse(e.data);
        // this.msgreceive(e)
        // self.previouschats.push()
        // return this.getCurrent;
      }
      // console.log('gah',this.getCurrent);
    }
  //  msgreceive=function(data)
  //   {
  //     console.log('data',data);
  //   }
  getChatUsers()
  {
    // console.log('currentUser:',JSON.parse(localStorage.getItem('currentUser')).username);
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
    // if(ws.readyState==1)
    // {
    // ws.close();
    // }
    this.userid=JSON.parse(localStorage.getItem('currentUser')).user_id
    console.log('CurrentuserId:',this.userid);
    this.chatIns.getChats(id).subscribe(chathis=>
      {
        this.chatHistory=chathis.messages;
        console.log('Chathistory:',this.chatHistory);
        this.webSocketFunc(id);
      });
  }
  assignNewRoom(uname)
  {
    // if(ws.readyState==1)
    // {
    // ws.close();
    // }
    console.log('unameforroom:',uname)
    this.chatIns.assignRoom(uname).subscribe(assignRoom=>
      {
        this.assignedRoom=assignRoom.room;
        console.log('AssignRoom:',this.assignedRoom);
        this.getPreviousChats();
        this.getChats(this.assignedRoom);
        this.webSocketFunc(this.assignedRoom);
      });
  }
  sendMsg(msg)
  {
    this.obj1=
    {
      username:JSON.parse(localStorage.getItem('currentUser')).username,
      message:msg
    };
    ws.send(JSON.stringify(this.obj1));
    // console.log(this.getCurrent);
    this.getPreviousChats();
  }
}
