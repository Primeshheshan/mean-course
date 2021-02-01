import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  inputValue ='';
  newPost!: string;
  constructor() { }

  onAddPost() {
    this.newPost = this.inputValue;
  }
  ngOnInit(): void {
  }

}
