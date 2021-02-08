import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data";

@Injectable({providedIn: "root"})
export class AuthService {
  private token!: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>(); // push authentication informations to the components which are intersted
  // boolean for if user authenticated or not
  constructor(
    private http: HttpClient,
    private router: Router) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {email:email, password: password};
    //send post request
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(result => {
        console.log(result);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {email:email, password: password};
    this.http.post<{token: string}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
        this.router.navigate(["/"]);
      });
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(["/"]);

  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuth() {
    return this.isAuthenticated;
  }
}
