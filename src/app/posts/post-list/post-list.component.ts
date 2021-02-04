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
  posts: PostModel[]=[];
  private postSubscribe!: Subscription;
  isLoading = false;

  constructor( private postService: PostServcie) { }

  onDelete(postId: string ) {
    this.postService.deletePost(postId);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSubscribe =  this.postService.getPostUpdateLisiner()
      .subscribe((posts: PostModel[]) => {
        this.isLoading = false;
        this.posts = posts;
      }
    );
  }

  ngOnDestroy() {
    this.postSubscribe.unsubscribe();
  }

}
