import { AccountService } from './../services/account.service';
import { Component } from '@angular/core';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { from } from 'rxjs';
import { NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Route, Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "angularCrud-u";
  username = "";
  isShow = false;
  /**
   *
   */
  // tslint:disable-next-line:variable-name
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private accountService: AccountService) {

    this._router.events.subscribe((event: Event) => {
      this.username = localStorage.getItem("userName");
      if (this.username != null )
      {
        this.isShow = true;
      }else  {
        this.isShow = false;
      }
      // this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  logout() {
    localStorage.clear();

    this._router.navigate(['/login/private']);
    // this.accountService.signoutAccount().subscribe(
    //   (result: any) => {
    //     localStorage.removeItem('userPublicKey');
    //     localStorage.removeItem("userPrivateKey");
    //     this._router.navigate(['/login/private']);
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log(err.error.message);
    //     // this.message = err.error.message;
    //   });
  }

}
