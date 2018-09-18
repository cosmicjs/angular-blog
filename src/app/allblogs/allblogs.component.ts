import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-allblogs',
  templateUrl: './allblogs.component.html',
  styleUrls: ['./allblogs.component.css']
})
export class AllblogsComponent implements OnInit {
  data;
  allBlogs;
  allPosts;
  author;
  jdata;
  constructor(private _http: Http, private route: Router) { }
  //fetching all blogs from server
  showAllBlogs()  
  {
    this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/blogs",{

      params: {        
        read_key: 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx',
    } 

    })
    .subscribe(res => {
      this.data = res;
      var jsondata = JSON.parse(this.data._body);
      this.allBlogs = jsondata.objects;
      console.log(this.allBlogs);
          
    })
  }
  loginCall()
  {
    this.route.navigate(['login']);
  }

  
  ngOnInit() {  
    
    this.showAllBlogs()
  }

}
