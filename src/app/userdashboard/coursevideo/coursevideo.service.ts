import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { Headers, Http, Response  } from '@angular/http';

import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
@Injectable()
export class CoursevideoService {
  public username;
  user_id;
  private productsSource;
  currentProducts;
  currentuser;
  current;
  token;
  model: any = {};
  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object, private _nav: Router ) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.current && this.current.token;
  }
  upload_chapter(chapterName, courses_id) {
    // console.log('Chapter Name is ' + Name);
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json', );
    return this.http.post(Config.api + 'course/chapters_post/',
      {
        'chapter_name': chapterName,
        'course': courses_id,
      }, {headers : headers}).map((res: Response) => res.json());
  }
  getchaptername(id){
    if(this.token){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json', );
    return this.http.get(Config.api + 'course/ChaptersWithVideosList/' + id , {headers : headers}).map((res: Response) => res.json());
  }
}
  getchaptervideo(id){
      let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
      headers.append('Content-Type', 'application/json', );
      return this.http.get(Config.api + 'course/Video_detail/' + id + '/', {headers : headers}).map((res: Response) => res.json());
  }
  getcoursevideo(id){
      let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
      headers.append('Content-Type', 'application/json', );
      return this.http.get(Config.api + 'course/introvideo/' + id , {headers : headers}).map((res: Response) => res.json());
  }
  upload_video(title, video_url, video_minutes , video_size , id) {
    console.log('Chapter Name is ' + title, video_url, video_minutes , video_size , id);
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json', );
    return this.http.post(Config.api + 'course/video_post/' ,
      {
        'video_title': title,
        'video_url': video_url,
        'video_minutes' : video_minutes,
        'video_size': video_size,
        'chapter': id
      }, {headers : headers}).map((res: Response) => res.json());
  }
  intro_video(title, video_url, video_minutes , video_size , id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json', );
    return this.http.post(Config.api + 'course/introvideo/' + id ,
      {
        'video_title': title,
        'video_url': video_url,
        'video_minutes' : video_minutes,
        'video_size': video_size,
        'course': id
      }, {headers : headers}).map((res: Response) => res.json());
  }
  delete_Video(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    return this.http.delete(Config.api + 'course/Video_detail/' + id +'/', { headers: headers }).map((response: Response) => response.json());
  }
  delete_intro_Video(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    return this.http.delete(Config.api + 'course/introvideo/' + id , { headers: headers }).map((response: Response) => response.json());
  }
  requirment(language, learn, requirements, description, id){
    if(localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json')
      return this.http.post(Config.api + 'course/postdetail', {
        'language': language,
        'learning_objectives': learn,
        'requirement': requirements,
        'description': description,
        'course': id,
      },    {headers : headers}).map((res: Response) => res.json())
    }
  }

    getdetailservice(id){
        let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
        headers.append('Content-Type', 'application/json', );
        return this.http.get(Config.api + 'course/coursedetail/' + id , {headers : headers}).map((res: Response) => res.json());
    }
}
