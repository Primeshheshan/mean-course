import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html'
})
export class LogoutDialogComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.authService.logoutUser();
  }

}
