import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  public signupFrom!: FormGroup;
  private authStatusSub!: Subscription;
  isLoading = false;

  constructor(public authService: AuthService) { }

  onSignup() {
    if(this.signupFrom.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      this.signupFrom.value.email,
      this.signupFrom.value.password
    );
  }

  ngOnInit(): void {
    this.signupFrom = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)]})
    });

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = authStatus;
      this.signupFrom.reset()
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
