import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  param1;
  data;
  allPosts;
  constructor(private router: ActivatedRoute, private _http: Http) { } 

  ngOnInit() {
    this.data = this.router.snapshot.queryParamMap;
    this.post();
  }
  //getting all blog posts from selected blog
  post()
  {
   var data = this.data.params.blog_id;
   console.log(data);
   this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/posts/search",{

      params: {
      
       metafield_key: 'blog_id',
       metafield_value: data,
       title: data,  
       read_key: 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx',
    }  
  })
  .subscribe(res => {
       this.data = res;
       var jsondata = JSON.parse(this.data._body);
       this.allPosts = jsondata.objects;
       console.log(this.allPosts);
  })
   
   //console.log(this.data);
  }

}
