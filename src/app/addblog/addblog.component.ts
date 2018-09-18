import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {
  blogForm: FormGroup;
  message;
  blog_id;  
  constructor(private fb: FormBuilder,
    private _http: Http) {
      this.blogForm = this.fb.group({
        'blogTitle': ['', [Validators.required]],
        'image': ['', [Validators.required]],        
        'blogDescription': ['', [Validators.required]],
      });
     }
     //submitting blog data to cosmic server
     submitForm()
  {
    const credentials = this.blogForm.value;
    var jsondata = JSON.parse(localStorage.getItem('user'));
    
    const userName =jsondata.jsondata.objects[0].metadata.username;
    //console.log(userName);
    
    credentials.write_key = 'hApI9OnPr4ebLZwZTkIPjsId8lgGC4V5LWjkxw5Fwo3q4JKtwT';
    this._http.post("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/add-object/",{title: credentials.blogTitle, content:credentials.blogDescription, slug: credentials.blogTitle,type_slug:'blogs', write_key:credentials.write_key,
    metafields: [
              {
                   key: "author",
                   type: "text",
                   value: userName
              },
              {
                key: "blogImage",
                type: "file",
                value: credentials.image
              },
            ]
  })
  .subscribe(res => {
    this.message = "Blog added successfully";
    console.log(res);
})
  }

  ngOnInit() {
  }

}
