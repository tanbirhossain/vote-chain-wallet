import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === "True") {
      return next.handle(req.clone());
    }
    if (localStorage.getItem('userPublicKey') != null) {

      const clonedreq = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set("PublicKey", localStorage.getItem('userPublicKey'))
          .set('PrivateKey', localStorage.getItem('userPrivateKey'))

      });
      return next.handle(clonedreq)
        .do(
          succ => { },
          err => {
            console.log("Auth-inter : ", err);
            if (err.status === 401) {
              this.router.navigateByUrl('/login/private');
            }
          }
        );
    } else {
      this.router.navigateByUrl('/login/private');
    }
  }
}
