import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message = "";
  data;
  img;

  constructor(private _http: Http, private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'fullName': ['', Validators.required],
      'password': ['', Validators.required],
      'imageURL': ['', Validators.required],

    });

  }

  imagesave(e: Event) {
    //debugger;
    const target: HTMLInputElement = e.target as HTMLInputElement;
    let file = target.files[0];
    this.img = file;
    console.log(this.img);
  }
  //registering the user
  register() {
    const credentials = this.registerForm.value;
    console.log(credentials.image);
    credentials.write_key = 'hApI9OnPr4ebLZwZTkIPjsId8lgGC4V5LWjkxw5Fwo3q4JKtwT';
    credentials.read_key = 'TguIxeWUofjfL6bWOS6uzd1zJllY1AQwFqOrfd83Fq2LWe65cx';

    this._http.get("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/object-type/registerusers/search", {

      params: {
        metafield_key: 'username',
        metafield_value: credentials.username,
        limit: 1,
        read_key: credentials.read_key
      }
    })
      .subscribe(res => {
        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        if (jsondata.message == "No objects returned.") {
          this._http.post("https://api.cosmicjs.com/v1/fc12db90-b5c1-11e8-a352-25ca4a173972/add-object/", {
            title: credentials.username, slug: credentials.username, type_slug: 'registerusers', write_key: credentials.write_key,

            metafields: [
              {
                key: "username",
                type: "text",
                value: credentials.username
              },

              {
                key: "email",
                type: "text",
                value: credentials.email
              },

              {
                key: "fullName",
                type: "text",
                value: credentials.fullName
              },

              {
                key: "password",
                type: "text",
                value: credentials.password
              },
              {
                key: "image",
                type: "text",
                value: credentials.imageURL
              }
            ],
          })
            .subscribe(res => {
              console.log(res);
              if (res) {
                this.router.navigate(['login']);
              }
            })

        }

        else {
          return this.message = "Username already exists";

        }
      }

      )
  }

  loginCall() {
    this.router.navigate(['login']);
  }

  ngOnInit() {

  }

}
