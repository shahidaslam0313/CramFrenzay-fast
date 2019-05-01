import { Component, OnInit } from '@angular/core';
import { PartnersService } from './partners.service';
import { DataSource} from '@angular/cdk/typings/esm5/collections';
import {Observable} from 'rxjs/Observable';
// export interface Getingtable {
//   name: string;
//   position: number;
//   Email: string;
//   Company: string;
// }
// const ELEMENT_DATA: Getingtable[] = [  {position: 1, name: 'aqsa', Email: 'aqsa.ch@hotmail.com', Company: 'brainplow'}];
//
//
// export class TableBasicExample {
//   displayedColumns: string[] = ['position', 'name', 'Email', 'Comapny'];
//   DataSource = ELEMENT_DATA;
// }
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  element;
  result;
  DataSource ;

  constructor(private serrvice: PartnersService) { }

  ngOnInit() {
    this.bidcourse();
  }
  bidcourse() {
    this.serrvice.gettutor().subscribe(data => {
        this.result = data;
      }
    );
  }

}
