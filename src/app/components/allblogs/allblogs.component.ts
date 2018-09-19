import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { CosmicService } from '../../services/cosmic.service'

@Component({
  selector: 'app-allblogs',
  templateUrl: './allblogs.component.html',
  styleUrls: ['./allblogs.component.css']
})
export class AllblogsComponent implements OnInit {
  data;
  allBlogs;
  allPosts;
  author;
  jdata;
  constructor(private _http: Http, private route: Router, private cosmicService: CosmicService) { }
  
  //fetching all blogs from server
  showAllBlogs() {
    this.cosmicService.showAllBlogs()
   .subscribe(res => {
        this.data = res;
        var jsondata = JSON.parse(this.data._body);
        this.allBlogs = jsondata.objects;
        console.log(this.allBlogs);
      })
  }

  loginCall() {
    this.route.navigate(['login']);
  }

  ngOnInit() {

    this.showAllBlogs()
  }

}
