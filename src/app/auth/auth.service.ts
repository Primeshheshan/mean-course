import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data";
import { SnackBarComponent } from "./snack-bar/snack-bar.component";

@Injectable({providedIn: "root"})
export class AuthService {
  private token!: string;
  private userId!: string;
  private isAuthenticated = false;
  private tokenTimer!: any;
  private authStatusListener = new Subject<boolean>(); // push authentication informations to the components which are intersted
  // boolean for if user authenticated or not
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {email:email, password: password};
    //send post request
    return this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(result => {
        this.router.navigate(["/"]);
      }, error => {
        this.openSnackBar("This email address is already being used.!", "snackbar-error");
        this.authStatusListener.next(false);
      }); // handaling errors
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {email:email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000); // <-- current time + expired time
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(["/"]);
        }
      }, error => {
        this.openSnackBar("The email address or password is incorrect. Please retry.!", "snackbar-error");
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation =  this.getAuthData();
    const now  = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime(); //<-- expireIn time - current time
    if(!authInformation) {
      return;
    }
    if(expiresIn > 0) {
      this.token = authInformation!.token;
      this.userId = authInformation!.userId;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000); //auth timer works with seconds
      this.authStatusListener.next(true);
    }
  }

  logoutUser() {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expirationDate", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expirationDate = localStorage.getItem("expirationDate");
    if(!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  openSnackBar(data: string, style: string) {
    const styleClass = style;
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      data: data,
      panelClass: [styleClass]
    });
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }
}
