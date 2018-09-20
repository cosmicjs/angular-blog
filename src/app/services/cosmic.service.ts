import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {config} from '../../config/cosmo.config'
import {blogModel} from '../models/cosmic.model';
import {registerModel} from '../models/cosmic.model';


@Injectable()

export class CosmicService {
    data;
    message;
    URL = config.URL;
    bucket_slug = config.bucket_slug;
    constructor(private _http: Http,  private router: Router)
    {}

    /**  getting details of user */
    getUser(registerModel: registerModel) {     
       return this._http.get(this.URL+this.bucket_slug+"/object-type/registerusers/search", {
       params: {
            metafield_key: 'username',
            metafield_value: registerModel.username,
            limit: 1,
            read_key: config.read_key
          }
        })
          .map(res => {
            return res;
          })
      }

      /**  register new user */
      addUser(registerModel : registerModel)
      {
        return this._http.post(this.URL+this.bucket_slug+"/add-object/", {
            title: registerModel.username, slug: registerModel.username, type_slug: 'registerusers', write_key: config.write_key,

            metafields: [
              {
                key: "username",
                type: "text",
                value: registerModel.username
              },

              {
                key: "email",
                type: "text",
                value: registerModel.email
              },

              {
                key: "fullName",
                type: "text",
                value: registerModel.fullName
              },

              {
                key: "password",
                type: "text",
                value: registerModel.password
              },
              {
                key: "imageUrl",
                type: "text",
                value: registerModel.imageUrl
              }
            ],
          })
          .map(res => {
            return res;
          })
      }
      /**  add blog to backend */
      addBlog(blogModel: blogModel)
      {
        var jsondata = JSON.parse(localStorage.getItem('user'));
        const userName = jsondata.jsondata.objects[0].metadata.username; 

        return this._http.post(this.URL+this.bucket_slug+"/add-object/", {
            title: blogModel.title, content: blogModel.content, slug: blogModel.title, type_slug: 'blogs', write_key: config.write_key,
            metafields: [
              {
                key: "author",
                type: "text",
                value: userName
              },
              {
                key: "description",
                type: "text",
                value: blogModel.description
              },
              {
                key: "blogImage",
                type: "text",
                value: blogModel.blogImage
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
showSinglePostDashboard()
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
singlePostHome()
{
    return this._http.get(this.URL+this.bucket_slug+"/object-type/blogs/", {

      params: {
        read_key: config.read_key
      }
    })
}

/**  loggin user in */
login(registerModel: registerModel)
{
  return this._http.get(this.URL+this.bucket_slug+"/object-type/registerusers/search", {

    params: {
      metafield_key: 'username',
      metafield_value: registerModel.username,
      limit: 1,
      read_key: config.read_key
    }
  })
}

// saveComment(commentModel: commentModel )
// {
//   return this._http.post(this.URL+this.bucket_slug+"/add-object/", {
//     title: commentModel.name, content: commentModel.comment, slug: commentModel.name, type_slug: 'comments', write_key: config.write_key,
//     metafields: [
//       {
//         key: "name",
//         type: "text",
//         value: commentModel.name
//       },
//       {
//         key: "slug",
//         type: "text",
//         value: commentModel.slug
//       },
//     ]
//   })
//   .map(res => {
//     return res;
//   })
  
// }
}