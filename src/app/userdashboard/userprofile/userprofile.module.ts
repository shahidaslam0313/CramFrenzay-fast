import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { UserprofileComponent }   from './userprofile.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {UsersidebarComponent} from '../../usersidebar/usersidebar.component';
const userprofileRoutes: Routes = [
  { path: '', component: UserprofileComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(userprofileRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  // exports : [UsersidebarComponent],
  declarations: [
    UserprofileComponent,
    // UsersidebarComponent
  ],
  // entryComponents: [UsersidebarComponent]
})
export class UserprofileModule {}
