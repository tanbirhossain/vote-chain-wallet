import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Location } from '@angular/common';
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
  previousUrl: string;
  title = "votechainxui-u";
  username = "";
  fullMenu = true;
  historyMenu = true;
  profileMenu = true;
  /**
   *
   */
  // tslint:disable-next-line:variable-name
  constructor(private location: Location,
              private _loadingBar: SlimLoadingBarService,
              private _router: Router) {
    this._router.events.subscribe((event: Event) => {
       this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.username = localStorage.getItem("userName");
      if (this.username === null) {
        this.fullMenu = false;
      }
      else
      {
        this.fullMenu = true;
      }
      let _url = event.url;
      console.log("route:", _url);
      if (_url === "/login/private" || _url === "/")
      {
        this.historyMenu = false;
        this.profileMenu = false;
      }
     else if (_url === "/scanner")
      {
        this.fullMenu = true;
        this.historyMenu = true;
        this.profileMenu = false;
      }
      else if (_url.includes("/elections/detail"))
      {
        this.fullMenu = true;
        this.historyMenu = true;
        this.profileMenu = true;
      }
      else
      {
        this.fullMenu = true;
        this.historyMenu = false;
        this.profileMenu = true;
      }
      this._loadingBar.start();
    }

    if (event instanceof NavigationEnd) {
      this.previousUrl = event.url;
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
  }


  goBackPage() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this._router.navigate(['/']);
    }
  }
}
