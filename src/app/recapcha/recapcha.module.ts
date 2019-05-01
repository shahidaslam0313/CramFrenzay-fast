import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule,MatCardModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { RecapchaComponent } from './recapcha.component';
import {Routes, RouterModule} from '@angular/router';
import { RecapchaService } from '../recapcha/recapcha.service';
// const reRoutes: Routes = [
//   { path: '', component: RecapchaComponent }
// ];
@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,MatIconModule,MatCardModule,MatInputModule,
    FormsModule,
  ],
  declarations: [RecapchaComponent
  ],
  exports: [RecapchaComponent
  ],
  providers: [
    RecapchaService
  ]
})
export class RecapchaModule { }
