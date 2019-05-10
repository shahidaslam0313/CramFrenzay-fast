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
  constructor(public header: headerservice, ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.showCartItems();
  }
  showCartItems() {
    this.header.showCartItem().subscribe(Data => {
      this.itemscount = Data.counts;
      this.totalprice = Data.sum
      this.record = Data;
      // console.log(this.record, 'Record')

    })
  }
}
