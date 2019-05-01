import { Component, OnInit } from '@angular/core';
import { UpcomingscholarshipService } from './upcomingscholarship.service';

@Component({
  selector: 'app-upcomingscholarship',
  templateUrl: './upcomingscholarship.component.html',
  styleUrls: ['./upcomingscholarship.component.scss']
})
export class UpcomingscholarshipComponent implements OnInit {

  result: any[];
  January = '';
  Febrary = '';
  March = '';
  April = '';
  May = '';
  June = '';
  July = '';
  August = '';
  September = '';
  October = '';
  November = '';
  Decembere = '';
  selectedvalue;
  show: boolean = false;
  constructor(private serv: UpcomingscholarshipService) { }

  ngOnInit() {
  }
  check(event) {
    this.show = false;
    this.serv.Scholarshipbymonth(event.value).subscribe(data => {
      this.result = data;
      if (data.length !== 0) {
        this.show = true;
      }
    });
  }
}
