import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  // this runs in outgoing request
  // this will take a requset allow it continue without change
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequset = req.clone({
      headers: req.headers.set('Authorization',"Bearer" + authToken)
    });
    return next.handle(authRequset); // adding aour token and return
  }
}
