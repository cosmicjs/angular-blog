import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import {blogModel} from '../../models/cosmic.model';
import { CosmicService } from '../../services/cosmic.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
})
export class SinglepostComponent implements OnInit {
  data: any;
  allPosts: any;
  singlePost: any;
  blogModel = new blogModel();
  slug: any;
  commentForm: FormGroup;
  message;
  constructor(private router: ActivatedRoute, private route: Router, private _http: Http, private cosmicService: CosmicService,private fb: FormBuilder) 
  {
    this.commentForm = this.fb.group({
      'name': ['', Validators.required],
      'comment': ['', Validators.required],     

    });
   }

  ngOnInit() {

    this.data = this.router.snapshot.queryParamMap;
    this.post();
  }

  /** to show single blog */
  post() {  
    var data = this.data.params.slug;
    
    this.cosmicService.showSinglePostDashboard()
    
      .subscribe(res => {
        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        this.allPosts = jsondata.objects;

        this.singlePost = this.allPosts.filter(
          post => post.slug === data);
        var da = this.singlePost[0];
        console.log(da)
        })

  }

  /**  add comment*/

  // comment()
  // {
  //   const data = this.commentForm.value;
  //   var jdata = JSON.parse(this.data._body);
  //   this.slug = jdata.objects[0].slug;
  //   data.slug = this.slug;    
  //   this.cosmicService.saveComment(data)
  //   .subscribe(res => {
  //     console.log(res);
  //     this.message = "Comment Added";
  //   })
  // }

  /**  navigate to login page*/
  loginCall() {
    this.route.navigate(['login']);
  }

  /**  navigate to dashboard */

  dashboardCall()
  {
    this.route.navigate(['']);
  }


}
