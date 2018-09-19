import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {config} from '../../config/cosmo.config'

@Injectable()

export class CosmicService {
    data;
    message;
    URL = config.URL;
    bucket_slug = config.bucket_slug;
    constructor(private _http: Http,  private router: Router)
    {}

    /**  getting details of user */
    getUser(credentials) {     
        console.log(URL+this.bucket_slug)   ;
       return this._http.get(this.URL+this.bucket_slug+"/object-type/registerusers/search", {
       params: {
            metafield_key: 'username',
            metafield_value: credentials.username,
            limit: 1,
            read_key: config.read_key
          }
        })
          .map(res => {
            return res;
          })
      }

      /**  register new user */
      addUser(credentials)
      {
        return this._http.post(this.URL+this.bucket_slug+"/add-object/", {
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
          .map(res => {
            return res;
          })
      }
      /**  add blog to backend */
      addBlog(credentials)
      {
        var jsondata = JSON.parse(localStorage.getItem('user'));
        const userName = jsondata.jsondata.objects[0].metadata.username; 

        return this._http.post(this.URL+this.bucket_slug+"/add-object/", {
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
  .map(res => {
    return res;
  })

}

//showing all blogs

showAllBlogs()
{
    return this._http.get(this.URL+this.bucket_slug+"/object-type/blogs", {

      params: {

        read_key: config.read_key,
      }
    })
    .map(res => {
        return res;
      })
}

 //show blogs of logged in user
showBlogs()
{
    var jsondata = JSON.parse(localStorage.getItem('user'));
    const userName = jsondata.jsondata.objects[0].metadata.username;
   return this._http.get(this.URL+this.bucket_slug+"/object-type/blogs/search", {

      params: {

        metafield_key: 'author',
        metafield_value: userName,
        read_key: config.read_key,
      }
    })
}

/**  showing single post on dashboard */
showSinglePostDashboard(data)
{
   return this._http.get(this.URL+this.bucket_slug+"/object-type/blogs/", {
      params: {

        read_key: config.read_key,
      }
    })
    .map(res => {
        return res;
      })
}

/**  showing single post on home page */
singlePostHome(data)
{
    return this._http.get(this.URL+this.bucket_slug+"/object-type/blogs/", {

      params: {
        read_key: config.read_key
      }
    })
}

/**  loggin user in */
login(credentials)
{
  return this._http.get(this.URL+this.bucket_slug+"/object-type/registerusers/search", {

    params: {
      metafield_key: 'username',
      metafield_value: credentials.username,
      limit: 1,
      read_key: config.read_key
    }
  })
}

}