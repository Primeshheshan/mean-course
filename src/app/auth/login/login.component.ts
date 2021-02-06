import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginFrom!: FormGroup;
  isLoading = false;
  constructor() { }

  onLogin() {
    console.log(this.loginFrom.value);
  }

  ngOnInit(): void {
    this.loginFrom = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, Validators.required)
    });
  }

}
