import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PostModel } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostServcie {
  postUpdated = new Subject<PostModel[]>();
  private posts: PostModel[]= []; // initally empty array

  constructor(private http: HttpClient) {}

  getPosts() {
    // return [...this.posts]; not return original array return copy of array
    this.http.get<{message: string, posts: PostModel[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
      });


  }

  getPostUpdateLisiner() {
    return this.postUpdated.asObservable()
  }

  addPosts(title:string, content: string) { // add new post
    const post: PostModel = { id: '', title: title, content: content};
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
