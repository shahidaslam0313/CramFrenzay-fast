import { NgModule } from '@angular/core';

import { WishlistComponent } from './wishlist.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../app.module';
import { CommonModule } from "@angular/common";
import { LoaderModule } from '../loader/loader.module';

const wishlistRoutes: Routes = [
  { path: '', component: WishlistComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(wishlistRoutes),
    CommonModule,
    LoaderModule,
    MaterialModule
  ],
  declarations: [
    WishlistComponent
  ]
})
export class WishlistModule { }
