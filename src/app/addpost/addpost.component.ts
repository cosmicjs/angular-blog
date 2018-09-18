import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  postForm: FormGroup;
  data;
  allBlogs;
  userName;
  message;
  constructor(private fb: FormBuilder,
    private _http: Http) { 
    this.postForm = this.fb.group({
      'title': ['', [Validators.required]],
      'blog_id': ['', [Validators.required]],
      'image': ['', [Validators.required]],
      'body': ['', Validators.required],
      'description': ['', [Validators.required]],
    });
  }

  submitForm()
  {
    //const userData = localStorage.getItem('user');
    var jsondata = JSON.parse(localStorage.getItem('user'));
    const userName =jsondata.jsondata.objects[0].metadata.username;
    // console.log(userName.blogTitle);
    const credentials = this.postForm.value;
    //console.log(credentials.blogTitle);
    credentials.write_key = 'hApI9OnPr4ebLZwZTkIPjsId8lgGC4V5LWjkxw5Fwo3q4JKtwT';
    //console.log(credentials);
    this._http.post("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/add-object/",{title: credentials.title, content:credentials.body, slug: credentials.title,type_slug:'posts', write_key:credentials.write_key,
    metafields: [
      {
                   key: "author",
                   type: "text",
                   value: userName
              },
               {
                key: "description",
                type: "text",
                value: credentials.description
           },
           {
            key: "postImage",
            type: "file",
            value: credentials.image
       },
            ]
  })
    .subscribe(res => {
          console.log(res);
          this.message = "Post added successfully";
    })
  }
  //getting all blogs of logged in user

  showAllBlogs()
  {
    var jsondata = JSON.parse(localStorage.getItem('user'));
      //console.log(jsondata);
      const userName =jsondata.jsondata.objects[0].metadata.username;

    this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/blogs/search",{

      params: {
      
        metafield_key: 'author',
        metafield_value_has: userName,
        //limit: 10,
        read_key: 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx',
    }
    })
    .subscribe(res => {
      //console.log(res);
      this.data = res;
      //console.log(this.data._body);
      var jsondata = JSON.parse(this.data._body);
      //console.log(jsondata.objects.metadata.author);
      this.allBlogs = jsondata.objects;
      //console.log( this.allBlogs)
    
    })
  }

  ngOnInit() {
    this.showAllBlogs();
  }

}
