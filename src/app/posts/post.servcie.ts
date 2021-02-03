import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { PostModel } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostServcie {
  private postUpdated = new Subject<PostModel[]>();
  private posts: PostModel[]= []; // initally empty array

  constructor(private http: HttpClient) {}

  getPosts() {
    // return [...this.posts]; not return original array return copy of array
    this.http.get<{message: string, posts: any[]}>("http://localhost:3000/api/posts")
      .pipe(map((postData) => {
        return postData.posts.map(
          post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          }
        );
      }))
      .subscribe((transformedData) => {
        this.posts = transformedData
        ;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateLisiner() {
    return this.postUpdated.asObservable()
  }

  // add new post
  addPosts(title:string, content: string) {
    const post: PostModel = { id: "", title: title, content: content};
    this.http.post<{message: string, postId: string}>("http://localhost:3000/api/posts", post)
      .subscribe( responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });

  }

  //delete post



  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }
}
