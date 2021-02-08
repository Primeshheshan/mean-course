import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate( // return true - can navigate
    route: ActivatedRouteSnapshot, // route trying to load
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.authService.getIsAuth();
    if(!isAuth) { //  not authenticated 
      this.router.navigate(["/login"]);
    }
    return isAuth;
  }

}
