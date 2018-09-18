import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data;
  allBlogs;
  allPosts;
  blogForm: FormGroup;
  count = false;
  show = false;
  message;
  menu : boolean = false;
  constructor(private router: Router, private _http: Http, private fb: FormBuilder,

  ) {
    this.blogForm = this.fb.group({
      'blogTitle': ['', [Validators.required]],
      'blogDescription': ['', [Validators.required]],
      'blogBody': ['', Validators.required],
      'imageUrl': ['', [Validators.required]],

    });

  }

  //to add new blog
  addNewBlog() {
    this.show = false;
    this.count = true;

  }

  toggleMenu()
  {
    this.menu = !this.menu;
  }
  //getting all blogs' data

  viewAllBlogs() {
    this.count = false;
    this.show = true;
    this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/blogs", {

      params: {

        read_key: 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx',
      }
    })
      .subscribe(res => {

        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        this.allBlogs = jsondata.objects;
      })
  }
  //view all Blogs from logged in user
  viewBlogs() {
    this.count = false;
    this.show = true;
    var jsondata = JSON.parse(localStorage.getItem('user'));
    const userName = jsondata.jsondata.objects[0].metadata.username;
    this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/blogs/search", {

      params: {

        metafield_key: 'author',
        metafield_value: userName,
        read_key: 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx',
      }
    })
      .subscribe(res => {
        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        this.allBlogs = jsondata.objects;

      })
  }
  //logging user out
  logout() {
    localStorage.removeItem('user');

    this.router.navigate(['']);
  }

  submitForm() {


    var jsondata = JSON.parse(localStorage.getItem('user'));
    const userName = jsondata.jsondata.objects[0].metadata.username;  
    const credentials = this.blogForm.value;
    credentials.write_key = 'hApI9OnPr4ebLZwZTkIPjsId8lgGC4V5LWjkxw5Fwo3q4JKtwT';

    this._http.post("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/add-object/", {
      title: credentials.blogTitle, content: credentials.blogBody, slug: credentials.title, type_slug: 'blogs', write_key: credentials.write_key,
      metafields: [
        {
          key: "author",
          type: "text",
          value: userName
        },
        {
          key: "description",
          type: "text",
          value: credentials.blogDescription
        },
        {
          key: "blogImage",
          type: "text",
          value: credentials.imageUrl
        },
      ]
    })
      .subscribe(res => {
        console.log(res);
        this.message = "Blog added successfully";
      })

  }


  ngOnInit() {

  }

}
