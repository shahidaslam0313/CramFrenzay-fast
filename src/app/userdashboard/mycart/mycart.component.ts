import { Component, OnInit } from '@angular/core';
import { headerservice } from '../../includes/header/header.service';
import { Config } from '../../Config';
import { MycartService } from './mycart.service';

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
  record:any =[];
  public Imageurl = Config.Imageurlget;
  constructor(public header: MycartService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.showCartItems();
  }
  openNav() {
    document.getElementById("mySidenav").style.display = "block";
  }
  
  closeNav() {
    document.getElementById("mySidenav").style.display = "none";
  }
  showCartItems() {
    this.header.showCartItem().subscribe(Data => {
      this.itemscount = Data.counts;
      this.totalprice = Data.sum
      this.record = Data;
     
 
    })
  }
}
