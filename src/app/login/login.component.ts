import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message = "";
  data;

  constructor(private _http: Http, private fb: FormBuilder, private router: Router) {

    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],

    });

  }
  //login user
  login() {
    const credentials = this.loginForm.value;
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
        //console.log(this.data._body);
        var jsondata = JSON.parse(this.data._body);
        if (jsondata.message == "No objects returned.") {
          return this.message = "username or password is wrong";
        }
        console.log(this.data._body);
        const userPassword = jsondata.objects[0].metadata.password;
        if (userPassword == credentials.password) {
          console.log('login Success');
          localStorage.setItem('user', JSON.stringify({ jsondata }));
          this.router.navigate(["dashboard"]);
        }
        else {
          this.message = "Username or password is wrong";
          console.log('Login Failed');
        }
      })

  }

  registerCall() {
    this.router.navigate(["register"]);
  }

  ngOnInit() {

  }

}
