import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostModel } from '../post.model';
import { PostServcie } from '../post.servcie';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts!: PostModel[];
  private postSubscribe!: Subscription

  constructor(
    private postService: PostServcie
  ) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.postSubscribe =  this.postService.postEmitter.subscribe(
      (posts: PostModel[]) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy() {
    this.postSubscribe.unsubscribe();
  }

}
