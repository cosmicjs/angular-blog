import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import {blogModel} from '../../models/cosmic.model';
import { CosmicService } from '../../services/cosmic.service';


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
  constructor(private router: ActivatedRoute, private route: Router, private _http: Http, private cosmicService: CosmicService,) { }

  ngOnInit() {

    this.data = this.router.snapshot.queryParamMap;
    this.post();
  }

  /** to show single blog */
  post() {  
    var data = this.data.params.post_id;
    this.cosmicService.showSinglePostDashboard(data)
    
      .subscribe(res => {
        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        this.allPosts = jsondata.objects;

        this.singlePost = this.allPosts.filter(
          post => post._id === data);
        var da = this.singlePost[0];
        console.log(da)
        })

  }

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
