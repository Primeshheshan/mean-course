import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginFrom!: FormGroup;
  isLoading = false;
  private authStatusSub!: Subscription;

  constructor(public authService: AuthService) { }

  onLogin() {
    if(this.loginFrom.invalid) {
      return;
    }
    this.authService.loginUser(this.loginFrom.value.email, this.loginFrom.value.password);
    this.isLoading = true;

  }

  ngOnInit(): void {
    this.loginFrom = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)]})
    });

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = authStatus;
      this.loginFrom.reset()
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }



}
