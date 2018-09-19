import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CosmicService } from '../../services/cosmic.service'
import {config} from '../../../config/cosmo.config'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message = "";
  data; 
  
  constructor(private _http: Http, private fb: FormBuilder, private router: Router, private cosmicService: CosmicService) {

    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],

    });

  }
  /**  logging user in */
  login() {
    const credentials = this.loginForm.value;

    credentials.read_key = config.read_key
    this.cosmicService.login(credentials)
   
      .subscribe(res => {
        this.data = res;
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
  
 /**  navigate to register page */
  registerCall() {
    this.router.navigate(["register"]);
  }

  ngOnInit() {

  }

}
