import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SnackBarComponent } from "../auth/snack-bar/snack-bar.component";
import { PostModel } from "./post.model";

const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({providedIn: 'root'})
export class PostServcie {
  private postUpdated = new Subject<{posts: PostModel[], postCount: number}>(); // subject getting back js object with posts, postCount property
  private posts: PostModel[]= []; // initally empty array

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) {}

  // add new post
  addPosts(title:string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{message: string, post: PostModel}>(BACKEND_URL , postData)
      .subscribe( responseData => {
        this.router.navigate(["/"]);
        this.openSnackBar("Post created successfully", "snackbar-success");
      });
  }

  //delete post
  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }

  // update post
  updatePost(postId: string, title: string, content: string, image: File | string) {
    let postData: PostModel | FormData;
    if(typeof(image) === 'object') {
       postData = new FormData();
      postData.append("id", postId); // FormData objects
      postData.append("title", title); // FormData objects
      postData.append("content", content); // FormData objects
      postData.append("image", image, title); // FormData objects
    } else {
       postData = {
        id: postId,
        title: title,
        content: content,
        imagePath: image,
        creator: ""
      }
    }
    // this is updated post element
    this.http.put(BACKEND_URL + postId, postData)
    .subscribe(response => {
      this.router.navigate(["/"]);
      this.openSnackBar("Post updated successfully", "snackbar-success");
    });
  }

  openSnackBar(data: string, style: string) {
    const styleClass = style;
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 4000,
      data: data,
      panelClass: [styleClass]
    });
  }

  getPosts(postsPerPage: number, currentPage: number) {
    // return [...this.posts]; not return original array return copy of array
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, posts: any[], maxPosts:number}>("http://localhost:3000/api/posts" + queryParams)
      .pipe(map((postData) => {
        return {posts: postData.posts.map(
          post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
              creator: post.creator
            };
          }
        ), maxPosts: postData.maxPosts};
      }))
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateLisiner() {
    return this.postUpdated.asObservable()
  }

  getPost(id:string) {
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      imagePath: string,
      creator: string}>
    (BACKEND_URL + id);
  }




}
