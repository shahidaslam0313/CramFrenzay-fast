import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { TutorinterviewService } from './tutorinterview.service';

@Component({
  selector: 'app-tutorinterview',
  templateUrl: './tutorinterview.component.html',
  styleUrls: ['./tutorinterview.component.scss']
})
export class TutorinterviewComponent implements OnInit {
  model: any = {};

  constructor(private newService: TutorinterviewService, private router: Router, private route: ActivatedRoute,
    private sg: SimpleGlobal, private data: DataService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  onSubmit(f) {
    this.newService.interview(this.model.Experience, this.model.Interests, )
      .subscribe(Res => {
      });
    f.resetForm();
  }
}
