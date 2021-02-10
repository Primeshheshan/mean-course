import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostModel } from '../post.model';
import { PostServcie } from '../post.servcie';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  private authListenerSub!: Subscription;
  private postSubscribe!: Subscription;
  posts: PostModel[]=[];
  isLoading = false;
  totalPosts: number = 0;
  postPerPage: number = 5;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10]; // items per page
  userIsAuthenticated = false;
  userId!: string;

  constructor(
    private postService: PostServcie,
    private authService: AuthService,
    ) { }

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
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.postSubscribe =  this.postService.getPostUpdateLisiner()
      .subscribe((postsData: {posts: PostModel[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postsData.postCount;
        this.posts = postsData.posts;
      }
    );

    this.authListenerSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  ngOnDestroy() {
    this.postSubscribe.unsubscribe();
  }

}
