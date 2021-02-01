import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  inputTitle ='';
  inputContent ='';

  constructor() { }

  onAddPost() {
    const post = {
      title: this.inputTitle,
      content: this.inputContent
    };
  }

  ngOnInit(): void {
  }

}
