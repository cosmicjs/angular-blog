import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CosmicService } from '../../services/cosmic.service';
import {config} from '../../../config/cosmo.config'
import {blogModel} from '../../models/cosmic.model'

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
  blogModel = new blogModel();
  constructor(private router: Router, private _http: Http, private fb: FormBuilder,private cosmicService: CosmicService,

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
    this.cosmicService.showAllBlogs()
    
      .subscribe(res => {

        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        this.blogModel = jsondata.objects;
      })
  }
  //view all Blogs from logged in user
  viewBlogs() {
    this.count = false;
    this.show = true;
    
    this.cosmicService.showBlogs()
    
      .subscribe(res => {
        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        this.blogModel = jsondata.objects;

      })
  }
  //logging user out
  logout() {
    localStorage.removeItem('user');

    this.router.navigate(['']);
  }

  submitForm() {
    
    const credentials = this.blogForm.value;
    credentials.write_key = config.write_key;

    this.cosmicService.addBlog(credentials)
    
      .subscribe(res => {
        console.log(res);
        this.message = "Blog added successfully";
      })
  }


  ngOnInit() {

  }

}
