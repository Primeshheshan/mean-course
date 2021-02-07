import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupFrom!: FormGroup;
  isLoading = false;

  constructor(public authService: AuthService) { }

  onSignup() {
    if(this.signupFrom.invalid) {
      return;
    }
    this.authService.createUser(
      this.signupFrom.value.email,
      this.signupFrom.value.password);
  }

  ngOnInit(): void {
    this.signupFrom = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)]})
    });
  }

}
