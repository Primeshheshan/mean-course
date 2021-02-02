import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostServcie } from '../post.servcie';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  public postFrom!: FormGroup;

  constructor(private postService: PostServcie) { }

  onAddPost() {
    if(this.postFrom.invalid) {
      return;
    }
    this.postService.addPosts(this.postFrom.value.title, this.postFrom.value.content);
    this.postFrom.reset();
  }

  ngOnInit(): void {
    this.postFrom = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
    });
  }

}
