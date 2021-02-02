import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostModel } from '../post.model';
import { PostServcie } from '../post.servcie';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  postFrom!: FormGroup;

  constructor(
    private postService: PostServcie
  ) { }

  onAddPost() {
    const post: PostModel[] = [{
      title: this.postFrom.value.title,
      content: this.postFrom.value.content
    }];

    this.postService.postEmitter.next(post);
  }

  ngOnInit(): void {
    this.postFrom = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
    });
  }

}
