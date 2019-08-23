import { NgModule } from '@angular/core';
// import { MaterialModule } from './../app.module';
import { ChatComponent }   from './chat.component';
import {RouterModule, Routes} from "@angular/router";
import { CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: ChatComponent }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes),
    //   MaterialModule,
      CommonModule,
      FormsModule, ReactiveFormsModule
    ],
    declarations: [
        ChatComponent
    ]
  })
  export class ChatModule {}