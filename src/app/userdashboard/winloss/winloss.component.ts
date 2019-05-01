import swal from 'sweetalert2';
import { WinlossService } from './winloss.service';
import { Component, OnInit } from '@angular/core';
import { Config } from './../../Config';
import {  MatDialog } from '@angular/material';
import {WinbidDialogComponent} from '../winbid-dialog/winbid-dialog.component';
@Component({
  selector: 'app-winloss',
  templateUrl: './winloss.component.html',
  styleUrls: ['./winloss.component.scss']
})
export class WinlossComponent implements OnInit {
  winlost;
  WinList;
  Wins;
  id;
  WinArray: any = [];
  Loss;
  Imageurl = Config.Imageurlget;
  constructor(private serv: WinlossService , public dialog: MatDialog,) { }

  ngOnInit() {
    this.getwin();
  }
  openDialog3(id , card_id, course_id, book_id): void {


    const dialogRef = this.dialog.open(WinbidDialogComponent, {
      width: '500px',
      data: {
        notes_id: id,
        card_id: card_id,
        course_id: course_id,
        book_id:book_id
      }
      });
  }

  getwin() {
    this.serv.getWins().subscribe(Res => {
      this.Wins = Res;
      this.WinList = this.Wins['Win List'];
      this.winlost = this.Wins['Lose List'];
    },
      error => {
        if (error.status == 500) {
          swal(
            'Sorry',
            'Server is under maintenance!',
            'error'
          )
        }
      });
  }
}
