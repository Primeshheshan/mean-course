import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post.model';
import { PostServcie } from '../post.servcie';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  inputTitle ='';
  inputContent ='';

  constructor(
    private postService: PostServcie
  ) { }

  onAddPost() {
    const post: PostModel[] = [{
      title: this.inputTitle,
      content: this.inputContent
    }];

    this.postService.postEmitter.next(post);
  }

  ngOnInit(): void {
  }

}
