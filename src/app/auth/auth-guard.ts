import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { SnackBarComponent } from "./snack-bar/snack-bar.component";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) {}

  canActivate( // return true - can navigate
    route: ActivatedRouteSnapshot, // route trying to load
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.authService.getIsAuth();
    if(!isAuth) { //  not authenticated
      this.router.navigate(["/login"]);
      this.authService.openSnackBar("Not logged in, Please login or signup to continue.!","snackbar-error");
    }
    return isAuth;
  }
}
