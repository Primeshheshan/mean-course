import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PostServcie } from '../post.servcie';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  public postFrom!: FormGroup;
  public mode = 'create';
  private postId!: string;
  post!: PostModel;
  isLoading = false;

  constructor(
    private postService: PostServcie,
    private activatedRoute: ActivatedRoute) { }

  onSavePost() {
    if(this.postFrom.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
    this.postService.addPosts(this.postFrom.value.title, this.postFrom.value.content);
    }else {
      this.postService.updatePost(this.postId, this.postFrom.value.title, this.postFrom.value.content);
    }
    this.postFrom.reset();
  }

  ngOnInit(): void {
    this.postFrom = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title:postData.title, content: postData.content};
          this.postFrom.patchValue({ // when get vales set that in form
            title: this.post?.title,
            content: this.post?.content
          });
        });

      }else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }


}
