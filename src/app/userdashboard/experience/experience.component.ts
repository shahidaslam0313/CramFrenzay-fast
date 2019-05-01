import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  sub_category_name;
  public firstname;
  public lastname;
  profilePhoto;
  constructor() { }

  ngOnInit() {
  }

}
