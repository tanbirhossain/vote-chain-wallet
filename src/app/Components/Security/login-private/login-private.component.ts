import { LoginPrivate } from './../../../models/login-private';
import { PrivateAccountService } from './../../../services/private-account.service';
import { User } from './../../../models/user';
import { Validators } from '@angular/forms';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-private',
  templateUrl: './login-private.component.html',
  styleUrls: ['./login-private.component.css']
})

export class LoginPrivateComponent implements OnInit {

  angForm: any;
  message: string;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: PrivateAccountService) { }

  ngOnInit() {
    this.createFrom();
  }

  createFrom() {
    this.angForm = this.fb.group({
      privateKey: ["", Validators.required]
    });
  }
  onFormSubmit() {
     this.LoginUserAccount(this.angForm.value);
  }

  LoginUserAccount(user: LoginPrivate) {
    this.accountService.signInAccount(user).subscribe(
      (result: any) => {
          console.log("loginResult: ", result);
          localStorage.setItem('userPublicKey', result.publicKey);
          localStorage.setItem('userPrivateKey', user.privateKey);
          localStorage.setItem('userName', result.name);
          this.router.navigate(['/elections']);
      },
      (err: HttpErrorResponse ) => {
        console.log(err);
        this.message = err.error.Message;
      });
  }

}
