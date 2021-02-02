import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PostModel } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostServcie {
  postUpdated = new Subject<PostModel[]>();
  private posts: PostModel[]= []; // initally empty array

  getPosts() {
    return [...this.posts]; // not return original array return copy of array
  }

  getPostUpdateLisiner() {
    return this.postUpdated.asObservable()
  }

  addPosts(title:string, content: string) { // add new post
    const post: PostModel = {title: title, content: content};
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
