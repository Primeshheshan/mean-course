import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginFrom!: FormGroup;
  isLoading = false;

  constructor(public authService: AuthService) { }

  onLogin() {
    if(this.loginFrom.invalid) {
      return;
    }
    this.authService.loginUser(this.loginFrom.value.email, this.loginFrom.value.password);
  }

  ngOnInit(): void {
    this.loginFrom = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(6)]})
    });
  }

}
