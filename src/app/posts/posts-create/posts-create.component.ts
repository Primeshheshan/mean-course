import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PostServcie } from '../post.servcie';
import { PostModel } from '../post.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit, OnDestroy {
  public postFrom!: FormGroup;
  public mode = 'create';
  private postId!: string;
  private authStatusSub!: Subscription
  post!: PostModel;
  isLoading = false;
  imagePreview!: string;

  constructor(
    private postService: PostServcie,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  onSavePost() {
    if(this.postFrom.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
    this.postService.addPosts(
      this.postFrom.value.title,
      this.postFrom.value.content,
      this.postFrom.value.image
    );
    }else {
      this.postService.updatePost(
        this.postId,
        this.postFrom.value.title,
        this.postFrom.value.content,
        this.postFrom.value.image
        );
    }
    this.postFrom.reset();
  }

  onImgPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]; // file object
    this.postFrom.patchValue({image: file}); // can patch one element in the form
    this.postFrom.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(file);
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.postFrom = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      image: new FormControl(null, {validators:[Validators.required], asyncValidators: [mimeType]}),
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;

        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title:postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator
          };
          this.postFrom.setValue({ // when get all vales set that all in form
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
        });

      }else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
