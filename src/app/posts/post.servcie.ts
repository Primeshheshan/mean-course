import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { PostModel } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostServcie {
  // subject getting back js object with posts, postCount property
  private postUpdated = new Subject<{posts: PostModel[], postCount: number}>();
  private posts: PostModel[]= []; // initally empty array

  constructor(
    private http: HttpClient,
    private router: Router) {}

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
    ("http://localhost:3000/api/posts/" + id);
  }

  // add new post
  addPosts(title:string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.http.post<{message: string, post: PostModel}>("http://localhost:3000/api/posts", postData)
      .subscribe( responseData => {

        this.router.navigate(["/"]);
      });

  }

  //delete post
  deletePost(postId: string) {
    return this.http.delete("http://localhost:3000/api/posts/" + postId);
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
    this.http.put("http://localhost:3000/api/posts/" + postId, postData)
    .subscribe(response => {
      this.router.navigate(["/"]);
    });
  }


}
