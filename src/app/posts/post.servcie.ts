import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PostModel } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostServcie {
  postEmitter = new Subject<PostModel[]>();
  private posts: PostModel[]= [];

 getPosts() {
   return this.posts.slice();
 }

 addPosts(posts: PostModel) {
  this.posts.push(posts);
  this.postEmitter.next(this.posts.slice());
}
}
