import { Component, OnInit } from '@angular/core';
import { headerservice } from '../../includes/header/header.service';
import { Config } from '../../Config';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  itemscount;
  totalprice;
  FlashCard;
  Courses;
  Notes;
  Book;
  record;
  public Imageurl = Config.Imageurlget;
  constructor(public header: headerservice,) { }

  ngOnInit() {
    window.scroll(0,0);
    this.showCartItems();
  }
  showCartItems() {
    this.header.showCartItem().subscribe(Data => {
      this.itemscount = Data.counts;
      this.totalprice = Data.sum
this.record = Data.Cart;
console.log(this.record)
      for (let vall in Data.Cart) {
        if (Data.Cart[vall].course) {
          this.Courses(Data.Cart[vall]);
          console.log(this.Courses);
        }
        else if (Data.Cart[vall].notes) {
          this.Notes(Data.Cart[vall]);
          console.log(this.Notes);
        }
        // else if (Data.Cart[vall].book) {
        //   this.Book(Data.Cart[vall]);
        // }
        // else if (Data.Cart[vall].flashcard) {
        //   this.FlashCard(Data.Cart[vall]);
        // }
      }
    })
  }
}
