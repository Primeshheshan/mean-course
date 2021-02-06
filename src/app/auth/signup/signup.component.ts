import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupFrom!: FormGroup;
  isLoading = false;
  constructor() { }

  onSignup() {
    console.log(this.signupFrom.value);
  }

  ngOnInit(): void {
    this.signupFrom = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, Validators.required)
    });
  }

}
