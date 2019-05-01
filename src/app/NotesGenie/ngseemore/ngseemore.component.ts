import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgseemoreService } from "./ngseemore.service";
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { MatDialog } from '@angular/material';
import { GlobalService } from 'app/global.service';
@Component({
  selector: 'app-ngseemore',
  templateUrl: './ngseemore.component.html',
  styleUrls: ['./ngseemore.component.scss']
})
export class NgseemoreComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  bidnotes;
  trendingnotes;
  toprated;
  recent;
  watch;
  name;
  pager: any = {};
  bidonnotes;
  model: any = {};
  newid;
  message;
  private sub: Subscription;
  constructor(private pagerService: PagerService, private seemore: NgseemoreService, private router: Router, private route: ActivatedRoute,  @Inject(PLATFORM_ID) private platformId: Object, public dialogRef: MatDialog, private global:GlobalService) {
      this.global.currentMessage.subscribe(message => this.message = message);
      this.route.params.subscribe(params => {
      });
      window.scroll(0,0);

      this.sub = this.route.params.subscribe(params => {
          this.name = +params['name'];
          if (params['name'] == "Bid&BuyNotes") {
              this.setPagenotes(1);
          }
          else if (params['name'] == "NotesTrendingNow") {
              this.setTrending(1);
          }
          else if (params['name'] == "TopRatedNotes") {
              this.setToprated(1);
          }
          else if (params['name'] == "RecentlyVisitedNotes") {
              this.recentnote();
          }

      });
  }

  ngOnInit() {}
  checkmainpage(id) {
    // alert(id)
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {notesid : id}});
      // localStorage.setItem('notesid', id);
      // localStorage.setItem('price' , price)
    }
    else if (this.check_login() == false) {
      this.sweetalertnotes();
      this.router.navigate(['/login']);
    }
  }
  checknotes() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    }
    else if (this.check_login() == false) {
      this.sweetalertnotes();
      this.router.navigate(['/login']);
    }
  }
  check_login() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser')) {
        let local = localStorage.getItem('currentUser');
        return true;
      }
      else {
        return false;
      }
    }
  }
  sweetalertnotes() {
    swal({
      text: 'Please Login First',
      title: 'CramFrenzy!',
      type: 'error',
      showConfirmButton: false,
      confirmButtonColor: '#cc0000', timer: 2000,
      confirmButtonText: 'OK',
    });
  }

  bididget(id) {
    this.newid = id;
    this.addwishlist(this.newid);
  }
  nullvalue = null;
  addwishlist(newid) {
    let book = "";
    let flashcard = "";
    let course = "";

    this.seemore.addwishlist(book, course, flashcard, this.newid, ).subscribe(Res => {
      this.global = Res;
      swal({
        type: 'success',
        title: 'Added to watchlist',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      if (error.status == 404)
        swal({
          type: 'warning',
          title: 'This item is already in your watchlist',
          showConfirmButton: false,
          timer: 1500
        })
    });

  }
  setPagenotes(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.BidbuyNotes(page).subscribe(data => {
      this.bidnotes = data;
      console.log(this.bidnotes);
      this.pager = this.pagerService.getPager(this.bidnotes['totalItems'], page, 10);

    });
  };
  setTrending(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.TrendingNotes(page).subscribe(data => {
      this.trendingnotes = data;
      console.log(this.trendingnotes);
      this.pager = this.pagerService.getPager(this.trendingnotes['totalItems'], page, 10);

    });
  };
  setToprated(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.TopratedNotes(page).subscribe(data => {
      this.toprated = data;
      this.pager = this.pagerService.getPager(this.toprated['totalItems'], page, 10);

    });
  };

  recentnote() {
    this.seemore.Recentnotes().subscribe(data => {
      this.recent = data;
    });
  }

  sweetalertlogin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy!",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  bidnotesid(id) {

      this.bidonnotes = id;

  }
  bidamount;
  biding() {
    this.seemore.bidnotes( this.bidonnotes, this.model.bidamount)
      .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Your bid is listed',
            showConfirmButton: false,
            timer: 5500
          });
        },
        error => {
          if(error.status == 403 && error.status == 500 )
            swal({
              type: 'error',
              title: 'Bid higher amount',
              showConfirmButton: false,
              timer: 5500
            });
        },

      );
  }
  notesss(id) {
    console.log(this.bidonnotes);
    this.seemore.getnotesid(id).subscribe(notes => {
      this.bidonnotes = notes;
      console.log(this.bidnotes)

    });
  }
  openDialog3(notes): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          notes: notes,
        }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }
}
