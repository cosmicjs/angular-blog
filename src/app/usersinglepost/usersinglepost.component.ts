

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-usersinglepost',
  templateUrl: './usersinglepost.component.html',
  styleUrls: ['./usersinglepost.component.css']
})
export class UsersinglepostComponent implements OnInit {
  data;
  allPosts;
  singlePost: any;
  constructor(private router: ActivatedRoute, private route: Router, private _http: Http) { }

  ngOnInit() {

    this.data = this.router.snapshot.queryParamMap;
    this.post();
  }

  post() {
    var data = this.data.params.post_id;
    console.log(data);
    this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/blogs/", {
      params: {

        read_key: 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx'
      }
    })
      .subscribe(res => {
        this.data = res;
        //debugger;
        var jsondata = JSON.parse(this.data._body);
        this.allPosts = jsondata.objects;

        this.singlePost = this.allPosts.filter(
          post => post._id === data);
        var da = this.singlePost[0];
        console.log(da)
      })
  }


}
