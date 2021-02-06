import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  totalPosts: number = 0;
  postPerPage: number = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10]; // items per page

  constructor( private postService: PostServcie) { }

  onDelete(postId: string ) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPage);
    });
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex +1; // pageIndex start from 0
    this.postPerPage = pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPage);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.postSubscribe =  this.postService.getPostUpdateLisiner()
      .subscribe((postsData: {posts: PostModel[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postsData.postCount;
        this.posts = postsData.posts;
      }
    );
  }

  ngOnDestroy() {
    this.postSubscribe.unsubscribe();
  }

}
