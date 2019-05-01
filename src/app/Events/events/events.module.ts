import { NgModule } from '@angular/core';

import { EventsComponent }   from './events.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';
import { CommonModule} from "@angular/common";
import {LoaderModule} from '../../loader/loader.module';

const eventsRoutes: Routes = [
  { path: '', component: EventsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(eventsRoutes),
    CommonModule,
    LoaderModule,

    MaterialModule
  ],
  declarations: [
    EventsComponent,
  ]
})
export class EventsModule {}
